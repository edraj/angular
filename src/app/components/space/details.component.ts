import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { Observable } from 'rxjs';
import { DialogService } from '../../lib/dialog/service';
import { IResource } from '../../models/resource.model';
import { SpaceListState } from '../../services/space.state';
import { ResourceListPartial } from '../resource/list.partial';
@Component({

  templateUrl: './details.html'
  , changeDetection: ChangeDetectionStrategy.OnPush
  , standalone: true
  , imports: [CommonModule, RouterModule, ResourceListPartial]
})
export class SpaceDetailsComponent implements OnInit {

  @Input() space: string;
  space$: Observable<IResource>;

  constructor(
    private dialog: DialogService,
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
    // need to emit a signal  for the sourrinding component to handle this

  }

}
