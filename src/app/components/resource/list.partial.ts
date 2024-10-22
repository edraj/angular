import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { Observable, switchMap, tap } from 'rxjs';
import { DialogService } from '../../lib/dialog/service';
import { EnumResourceType, IResource } from '../../models/resource.model';
import { ResourceService } from '../../services/resource.service';
import { ResourceCardPartial } from "./card.partial";
import { ResourceFormDialog } from './form.dialog';
import { IResourceNode, ResourceListState } from './resource.state';
@Component({
  selector: 'dm-resource-list',
  templateUrl: './list.partial.html'
  , changeDetection: ChangeDetectionStrategy.OnPush
  , standalone: true
  , imports: [CommonModule, RouterModule, ResourceCardPartial]
  , providers: [ResourceListState]
})
export class ResourceListPartial implements OnInit {

  @Input() space: string;

  @Input() resource: IResourceNode;
  @Output() onSelect: EventEmitter<IResource> = new EventEmitter();

  resources$: Observable<IResourceNode[]>; // all content and folders of first level

  constructor(private resourceService: ResourceService,
    private router: ActivatedRoute,
    private dialog: DialogService,
    private resourceListState: ResourceListState) {
    //
  }
  ngOnInit(): void {

    // this has path, find it in list and expend it
    // should be in reverse, the route creates and this only listens, right?
    this.resources$ = this.resourceService.GetResources({ space: this.space,  resourceType: this.resource?.type, subpath: this.resource?.subpath }).pipe(
      switchMap(d =>  this.resourceListState.SetList(d.matches)),
      tap(l => {
        const path = this.router.snapshot?.firstChild?.paramMap.get('path');
        if (path) {
          // break it up and find and expend
          const parts = path.split('/');
          l.forEach(r => {
            if (parts.includes(r.shortname) && r.type === EnumResourceType.FOLDER) {
              r.expanded = true;
            }
          }
          );

        }
      })
    );
  }
  select(resource: IResourceNode) {
    this.onSelect.emit(resource);
  }
  toggle(resource: IResourceNode) {
    // nothing to toggle if not folder
    if(resource.type === EnumResourceType.FOLDER){

      this.resourceListState.editItem({...resource, expanded: !resource.expanded});
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
          this.resourceService.CreateResource({...resource, subpath: this.resource?.subpath, space: this.space}).subscribe({
            next:(r) => {
              this.resourceListState.addItem({...r, expanded: false});
            }
          })
        }
      }
    })

  }
}
