import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { BehaviorSubject, map, Observable, tap, withLatestFrom } from 'rxjs';
import { DialogService } from '../../lib/dialog/service';
import { EnumResourceType, IResource } from '../../models/resource.model';
import { ResourceService } from '../../services/resource.service';
import { ResourceCardPartial } from "./card.partial";
import { ResourceFormDialog } from './form.dialog';
import { IResourceNode, PathState, ResourceListState, TreeListState } from './resource.state';
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


  constructor(private resourceService: ResourceService,
    private router: ActivatedRoute,
    private dialog: DialogService,
    private pathState: PathState,
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

  createFolder() {
    // need to know where im current at, from the state or from url
    this.dialog.open(ResourceFormDialog, {
      title: 'create folder',
      css: 'modal-half-screen animate fromend',
      onclose: (resource) => {
        if (resource) {
          // need to find a way to add to resources
          this.resourceService.CreateResource({ ...resource, subpath: this.resource?.subpath, space: this.space }).subscribe({
            next: (r) => {
              this.resourceListState.addItem({ ...r, expanded: false });
            }
          });
        }
      }
    });

  }
}
