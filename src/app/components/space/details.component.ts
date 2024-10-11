import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { Observable } from 'rxjs';
import { IResource } from '../../models/resource.model';
import { SpaceService } from '../../services/space.service';
import { ResourceListPartial } from '../resource/list.partial';
@Component({

  templateUrl: './details.html'
  , changeDetection: ChangeDetectionStrategy.OnPush
  , standalone: true
  , imports: [CommonModule, RouterModule, ResourceListPartial]
  // , providers: [NodeListState]
})
export class SpaceDetailsComponent implements OnInit {

  @Input() shortname: string;

  space$: Observable<IResource>;


  constructor(private spaceService: SpaceService) {
    //
  }
  ngOnInit(): void {
    this.space$ = this.spaceService.GetSpace(this.shortname);
  }

  openContent(resource: IResource) {
    _attn(resource, 'move');
  }

}
