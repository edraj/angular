import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { Observable } from 'rxjs';
import { IList } from '../../models/list.model';
import { EnumResourceType, IResource } from '../../models/resource.model';
import { ResourceService } from '../../services/resource.service';
@Component({
  templateUrl: './details.html'
  , changeDetection: ChangeDetectionStrategy.OnPush
  , standalone: true
  , imports: [CommonModule, RouterModule]
})
export class ResourceDetailsComponent implements OnInit {

  @Input() space: string;
  @Input() type: EnumResourceType; // resource type, for now its folder or content
  @Input() set path(value: string) {
    if (value ) {
      this.resources$ = this.resourceService.GetResources({
        space: this.space,
        subpath: value,
        resourceType: this.type
      });

    }
  };

  resources$: Observable<IList<IResource>>;

  constructor(private resourceService: ResourceService) {
    //
  }
  ngOnInit(): void {
    //

  }

}
