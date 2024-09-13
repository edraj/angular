import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { Observable } from 'rxjs';
import { IList } from '../../services/list.model';
import { ISpace } from '../../services/space.model';
import { SpaceService } from '../../services/space.service';
@Component({

  templateUrl: './list.html'
  , changeDetection: ChangeDetectionStrategy.OnPush
  , standalone: true
  , imports: [CommonModule, RouterModule]
})
export class SpaceListComponent implements OnInit {

  spaces$: Observable<IList<ISpace>>;

  constructor(private spaceService: SpaceService) {
    //
  }
  ngOnInit(): void {

    this.spaces$ = this.spaceService.RealGetSpaces();
  }
}
