import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { Observable, tap } from 'rxjs';
import { ResourceNodesPartial } from './nodes.partial';
import { PathState } from './path.state';
import { IResourceNode, ResourceListState } from './tree.state';
@Component({
    selector: 'dm-resource-list',
    templateUrl: './list.partial.html'
    , changeDetection: ChangeDetectionStrategy.OnPush
    , standalone: true
    , imports: [CommonModule, RouterModule, ResourceNodesPartial]
    })
export class ResourceListPartial implements OnInit {

    @Input() id: string;
    @Input() space: string;

    nodes$: Observable<IResourceNode[]>;

    constructor(private treeState: ResourceListState, private pathState: PathState) {
        //
    }
    ngOnInit(): void {
        // create a ul tree from a state tree that can be updated
        this.nodes$ = this.treeState.GetResources(this.space, null).pipe(
          tap(_ => this.treeState.Sync(this.pathState.currentItem))
        )

    }
}
