import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { Observable } from 'rxjs';
import { DialogService } from '../../lib/dialog/service';
import { IResource } from '../../models/resource.model';
import { SpaceService } from '../../services/space.service';
import { SpaceListState } from '../../services/space.state';
import { SpaceFormDialog } from './form.dialog';
@Component({

  templateUrl: './list.html'
  , changeDetection: ChangeDetectionStrategy.OnPush
  , standalone: true
  , imports: [CommonModule, RouterModule]
})
export class SpaceListComponent implements OnInit {

  spaces$: Observable<IResource[]>;

  constructor(private spaceService: SpaceService,
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
      title: 'New space',
      data: {},
      onclose: (res) => {
        if (res) {
          this.spaceService.CreateSpace(res).subscribe({
            next: (val) => {
              // update spaces
              this.spaceListState.addItem(val);
            }
          })
        }
      }
    })

  }
}
