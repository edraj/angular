import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { Observable } from 'rxjs';
import { IResource } from '../../models/resource.model';
import { SpaceService } from '../../services/space.service';
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

  constructor(private spaceService: SpaceService, private router: Router) {
    //
  }
  ngOnInit(): void {
    this.space$ = this.spaceService.GetSpace(this.space);
  }

  openContent(resource: IResource) {
    // if content open

    this.router.navigateByUrl(`/spaces/${resource.path}`);
    // need to emit a signal  for the sourrinding component to handle this

  }

}
