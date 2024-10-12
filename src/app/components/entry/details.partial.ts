import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { Observable } from 'rxjs';
import { IResource } from '../../models/resource.model';
import { ResourceService } from '../../services/resource.service';
@Component({
  selector: 'dm-entry-details',
  templateUrl: './details.partial.html'
  , changeDetection: ChangeDetectionStrategy.OnPush
  , standalone: true
  , imports: [CommonModule, RouterModule]
})
export class EntryDetailsPartial implements OnInit {

  get _shortname(): string {
    return this.route.snapshot.paramMap.get('shortname');
  }

  @Input() set resource(value: IResource) {

    this.content$ = this.resourceService.GetResource({
      space: this._shortname,
      subpath: value?.contentPath,
    });

  };
  content$: Observable<IResource>;

  constructor(private resourceService: ResourceService, private route: ActivatedRoute) {
    //
  }
  ngOnInit(): void {

  }
}
