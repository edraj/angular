import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { IResource } from '../../models/resource.model';
import { SpaceService } from '../../services/space.service';
import { EntryDetailsPartial } from '../entry/details.partial';
import { ResourceListPartial } from '../resource/list.partial';
@Component({

  templateUrl: './details.html'
  , changeDetection: ChangeDetectionStrategy.OnPush
  , standalone: true
  , imports: [CommonModule, RouterModule, ResourceListPartial, EntryDetailsPartial]
})
export class SpaceDetailsComponent implements OnInit {

  @Input() shortname: string;
  content$: BehaviorSubject<IResource> = new BehaviorSubject(null);

  space$: Observable<IResource>;


  constructor(private spaceService: SpaceService) {
    //
  }
  ngOnInit(): void {
    this.space$ = this.spaceService.GetSpace(this.shortname);
  }

  openContent(resource: IResource) {
    this.content$.next(resource);
  }

}
