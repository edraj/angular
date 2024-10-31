import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { filter, Observable, switchMap } from 'rxjs';
import { IList } from '../../models/list.model';
import { EnumResourceType, IResource } from '../../models/resource.model';
import { ResourceService } from '../../services/resource.service';
import { ResourcePathPartial } from './path.partial';
import { PathState } from './path.state';
@Component({
  templateUrl: './details.html'
  , changeDetection: ChangeDetectionStrategy.OnPush
  , standalone: true
  , imports: [CommonModule, RouterModule, ResourcePathPartial]
})
export class ResourceDetailsComponent implements OnInit {

  @Input() space: string;
  @Input() type: EnumResourceType; // resource type, for now its folder or content
  @Input() set path(value: string) {
    if (value !== null) {
      this.pathState.SetState({ path: value, type: this.type, space: this.space, source: 'route' });
    }
  };

  resources$: Observable<IList<IResource>>;

  constructor(private resourceService: ResourceService, private pathState: PathState) {
    //
  }
  ngOnInit(): void {
    this.resources$ = this.pathState.stateItem$.pipe(
      filter(p => p?.source === 'route'),
      switchMap(p => this.resourceService.GetResources({
        space: this.space,
        subpath: p.path,
        resourceType: this.type
      }))
    );

  }
  goto(r: any) {

  }


}
