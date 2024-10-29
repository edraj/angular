import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { Observable } from 'rxjs';
import { EnumResourceType } from '../../models/resource.model';
import { ResourceCardPartial } from './card.partial';
import { IResourceNode, ResourceListState } from './tree.state';
@Component({
  selector: 'dm-resource-nodes',
  template: `
      <ul class="alist lbreath breath">
        <li *ngFor="let item of nodes">
        <dm-resource-card [resource]="item" (onSelect)="select(item)" (onToggle)="toggle(item)"></dm-resource-card>
          @if(item.expanded) {
            @let children = GetChildren(item) | async;
            <dm-resource-nodes [space]="space" [nodes]="children" ></dm-resource-nodes>
          }
        </li>
      </ul>
    `
  , changeDetection: ChangeDetectionStrategy.OnPush
  , standalone: true
  , imports: [CommonModule, RouterModule, ResourceCardPartial]
})
export class ResourceNodesPartial implements OnInit {



  @Input() nodes: IResourceNode[];
  @Input() space: string;

  constructor(private treeState: ResourceListState, private router: Router) {
    //
  }
  ngOnInit(): void {
    //
  }
  GetChildren(resource: IResourceNode): Observable<IResourceNode[]> {
    return this.treeState.GetResources(this.space, resource);
  }
  select(resource: IResourceNode) {
    // route
    this.router.navigateByUrl(`/spaces/${resource.path}`);
  }
  toggle(resource: IResourceNode) {
    // nothing to toggle if not folder
    if (resource.type === EnumResourceType.FOLDER) {
      this.treeState.Toggle(resource);
    }
  }

}
