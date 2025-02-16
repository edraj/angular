import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { Observable } from 'rxjs';
import { DialogService } from '../../lib/dialog/service';
import { TranslatePipe } from '../../lib/pipes/translate.pipe';
import { IResource } from '../../models/resource.model';
import { SpaceListState } from '../../services/space.state';
import { Res } from '../../utils/resources';
import { ResourceListPartial } from '../resource/list.partial';
import { ResourcePathPartial } from '../resource/path.partial';
import { PathState } from '../resource/path.state';
import { ResourceListState } from '../resource/tree.state';
import { SpaceFormDialog } from './form.dialog';
@Component({
    templateUrl: './details.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [CommonModule, RouterModule, ResourceListPartial, ResourcePathPartial, TranslatePipe],
    providers: [ResourceListState, PathState]
})
export class SpaceDetailsComponent implements OnInit {

  @Input() space: string;
  space$: Observable<IResource>;

  expanded: boolean = false;

  constructor(
    private router: Router,
    private dialog: DialogService,
    private spaceListState: SpaceListState) {
    //
  }
  ngOnInit(): void {
    this.space$ = this.spaceListState.GetSpace(this.space);
  }

  delete(space: IResource): void {
    // make a confirmation dialog here
    this.spaceListState.Delete(space).subscribe({
      next: (res) => {
        if (res) {
          this.router.navigateByUrl('/spaces');
        }
      }
    });

  }
  edit(space: IResource): void {
    // open dialog here
    this.dialog.open(SpaceFormDialog, {
      title: Res.Get('NewSpace'),
      data: {mode: {forNew: false}, space},
      onclose: (res) => {
        if (res) {
          this.spaceListState.Update(res).subscribe({
            next: (res) => {
              // toast?may be
              // if moving,
            }
          })
        }
      }
    })
  }
}
