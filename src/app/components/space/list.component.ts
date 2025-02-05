import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { Observable } from 'rxjs';
import { DialogService } from '../../lib/dialog/service';
import { TranslatePipe } from '../../lib/pipes/translate.pipe';
import { IResource } from '../../models/resource.model';
import { SpaceListState } from '../../services/space.state';
import { Res } from '../../utils/resources';
import { SpaceFormDialog } from './form.dialog';
@Component({
    templateUrl: './list.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [CommonModule, RouterModule, TranslatePipe]
})
export class SpaceListComponent implements OnInit {

  spaces$: Observable<IResource[]>;

  constructor(
    private spaceListState: SpaceListState,
    private dialog: DialogService) {
    //
  }
  ngOnInit(): void {

    this.spaces$ = this.spaceListState.stateList$;
  }

  create() {
    // create space dialog open
    this.dialog.open(SpaceFormDialog, {
      title: Res.Get('NewSpace'),
      data: { mode: { forNew: true } },
      onclose: (res) => {
        if (res) {
          this.spaceListState.Create(res).subscribe({
            next: () => {
              // update spaces
              //toast me?
            }
          });
        }
      }
    });

  }
}
