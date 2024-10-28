import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { Observable } from 'rxjs';
import { IResource } from '../../models/resource.model';
import { SpaceListState } from '../../services/space.state';
import { ResourceListPartial } from '../resource/list.partial';
import { ResourcePathPartial } from '../resource/path.partial';
import { PathState, TreeListState } from '../resource/resource.state';
@Component({

  templateUrl: './details.html'
  , changeDetection: ChangeDetectionStrategy.OnPush
  , standalone: true
  , imports: [CommonModule, RouterModule, ResourceListPartial, ResourcePathPartial]
  , providers: [TreeListState, PathState]
})
export class SpaceDetailsComponent implements OnInit {

  @Input() space: string;
  space$: Observable<IResource>;

  constructor(
    private spaceListState: SpaceListState,
    private router: Router) {
    //
  }
  ngOnInit(): void {

    this.space$ = this.spaceListState.GetSpace(this.space);
  }

  openContent(resource: IResource) {
    // if content open
    this.router.navigateByUrl(`/spaces/${resource.path}`);

  }

  goto(resource: IResource) {
    this.openContent(resource);
  }

}
