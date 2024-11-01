import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { Observable } from 'rxjs';
import { IResource } from '../../models/resource.model';
import { SpaceListState } from '../../services/space.state';
import { ResourceListPartial } from '../resource/list.partial';
import { ResourcePathPartial } from '../resource/path.partial';
import { PathState } from '../resource/path.state';
import { ResourceListState } from '../resource/tree.state';
@Component({

  templateUrl: './details.html'
  , changeDetection: ChangeDetectionStrategy.OnPush
  , standalone: true
  , imports: [CommonModule, RouterModule, ResourceListPartial, ResourcePathPartial]
  , providers: [ ResourceListState, PathState]
})
export class SpaceDetailsComponent implements OnInit {

  @Input() space: string;
  space$: Observable<IResource>;

  constructor(
    private spaceListState: SpaceListState) {
    //
  }
  ngOnInit(): void {

    this.space$ = this.spaceListState.GetSpace(this.space);
  }

}
