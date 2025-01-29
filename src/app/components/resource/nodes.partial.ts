import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { Observable, tap } from 'rxjs';
import { EnumResourceType } from '../../models/resource.model';
import { ResourceCardPartial } from './card.partial';
import { PathState } from './path.state';
import { IResourceNode, ResourceListState } from './tree.state';
@Component({
    selector: 'dm-resource-nodes',
    template: `
      <ul class="alist lbreath breath" *ngIf="nodes?.length">
        <li *ngFor="let item of nodes">
        <dm-resource-card [resource]="item" (onSelect)="select(item)" (onToggle)="toggle(item)"></dm-resource-card>
          @if(item.expanded) {
            @let children = GetChildren(item) | async;
            <dm-resource-nodes [space]="space" [nodes]="children" ></dm-resource-nodes>
          }
        </li>
      </ul>
    `,
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [CommonModule, RouterModule, ResourceCardPartial]
})
export class ResourceNodesPartial implements OnInit {

  @Input() nodes: IResourceNode[];
  @Input() space: string;

  constructor(private treeState: ResourceListState, private router: Router, private pathState: PathState) {
    //
  }
  ngOnInit(): void {


  }
  GetChildren(resource: IResourceNode): Observable<IResourceNode[]> {
    return this.treeState.GetResources(this.space, resource).pipe(
      tap(_ => this.treeState.Sync(this.pathState.currentItem))
    );
  }
  select(resource: IResourceNode) {
    // route
    this.router.navigateByUrl(`/spaces/${resource.path}`);
  }
  toggle(resource: IResourceNode) {
    // nothing to toggle if not folder
    if (resource.type === EnumResourceType.FOLDER) {
      // first reset path state so that it doesnt trigger a sycn
      this.pathState.UpdateState({source: 'toggle'});
      this.treeState.Toggle(resource);
    }
  }

}
