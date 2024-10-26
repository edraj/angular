import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { BehaviorSubject, map, Observable, tap, withLatestFrom } from 'rxjs';
import { EnumResourceType, IResource } from '../../models/resource.model';
import { ResourceCardPartial } from "./card.partial";
import { IResourceNode, ResourceListState, TreeListState } from './resource.state';
@Component({
  selector: 'dm-resource-list',
  templateUrl: './list.partial.html'
  , changeDetection: ChangeDetectionStrategy.OnPush
  , standalone: true
  , imports: [CommonModule, RouterModule, ResourceCardPartial]
})
export class ResourceListPartial implements OnInit {

  @Input() space: string;

  @Input() resource: IResourceNode;
  @Output() onSelect: EventEmitter<IResource> = new EventEmitter();

  resources$: Observable<IResourceNode[]>; // all content and folders of first level
  resourceListState: ResourceListState;
  // patch, don't attempt to sync path when destroying (clicking in list to close)
  syncPath: BehaviorSubject<boolean> = new BehaviorSubject(true);


  constructor(
    private router: ActivatedRoute,
    private treeState: TreeListState) {
    //
  }

  ngOnInit(): void {
    this.resourceListState = this.treeState.GetState(this.space, this.resource?.id);

    this.resources$ = this.treeState.GetResources(this.space, this.resource, this.resourceListState)
      .pipe(
        withLatestFrom(this.syncPath),
        tap(([matches, syncpath]) => {
          const path = this.router.snapshot?.firstChild?.paramMap.get('path');

          if (path && syncpath) {
            // break it up and find and expend
            // if destroying, dont do this
            const parts = path.split('/');
            matches.filter(r => r.type === EnumResourceType.FOLDER).forEach(r => {
              if (parts.includes(r.shortname)) {
                r.expanded = true;
                this.syncPath.next(true);
              }
            });
          }
        }),
        map(l => l[0])
      );


  }
  select(resource: IResourceNode) {
    this.onSelect.emit(resource);
  }
  toggle(resource: IResourceNode) {
    // nothing to toggle if not folder
    if (resource.type === EnumResourceType.FOLDER) {
      this.syncPath.next(false);
      this.resourceListState.editItem({ ...resource, expanded: !resource.expanded });

    }
  }

}
