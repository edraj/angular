import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { RouterModule } from '@angular/router';
import { Observable, switchMap } from 'rxjs';
import { IResource } from '../../models/resource.model';
import { ResourceService } from '../../services/resource.service';
import { ResourceCardPartial } from "./card.partial";
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

  constructor(private resourceService: ResourceService, private resourceListState: ResourceListState) {
    //
  }
  ngOnInit(): void {

    this.resources$ = this.resourceService.GetResources({ space: this.space, subpath: this.resource?.subpath }).pipe(
      switchMap(d =>  this.resourceListState.SetList(d.matches))
    );
  }
  select(resource: IResourceNode) {
    this.onSelect.emit(resource);
  }
  toggle(resource: IResourceNode) {
    this.resourceListState.editItem({...resource, expanded: !resource.expanded});
  }
}
