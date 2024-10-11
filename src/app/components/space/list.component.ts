import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { Observable } from 'rxjs';
import { IList } from '../../models/list.model';
import { IResource } from '../../models/resource.model';
import { SpaceService } from '../../services/space.service';
@Component({

  templateUrl: './list.html'
  , changeDetection: ChangeDetectionStrategy.OnPush
  , standalone: true
  , imports: [CommonModule, RouterModule]
})
export class SpaceListComponent implements OnInit {

  spaces$: Observable<IList<IResource>>;

  constructor(private spaceService: SpaceService) {
    //
  }
  ngOnInit(): void {

    this.spaces$ = this.spaceService.GetSpaces();
  }
}
