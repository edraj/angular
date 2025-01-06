import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { filter, Observable, switchMap } from 'rxjs';
import { Toast } from '../../lib/toast/toast.state';
import { EnumResourceType, IResource } from '../../models/resource.model';
import { ResourceService } from '../../services/resource.service';
import { ResourceCardPartial } from './card.partial';
import { PathState } from './path.state';
import { PageResourecListState } from './resources.state';
import { ResourceListState } from './tree.state';
@Component({
    templateUrl: './details.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [CommonModule, RouterModule, ResourceCardPartial],
    providers: [PageResourecListState]
})
export class ResourceDetailsComponent implements OnInit {

  @Input() space: string;
  @Input() type: EnumResourceType; // resource type, for now its folder or content
  @Input() set path(value: string) {
    if (value !== null) {
      this.pathState.SetState({ path: value, type: this.type, space: this.space, source: 'route' });
    }
  };

  resources$: Observable<IResource[]>;

  constructor(private resourceService: ResourceService,
    private pathState: PathState,
    private treeState: ResourceListState,
    private resourecState: PageResourecListState,
    private toast: Toast,
    private router: Router) {
    //
  }
  ngOnInit(): void {
    this.resources$ = this.pathState.stateItem$.pipe(
      filter(p => p?.source === 'route'),
      switchMap(p => this.resourceService.GetResources({
        space: this.space,
        subpath: p.path,
        resourceType: this.type
      })),
      switchMap(d => this.resourecState.SetList(d.matches))
    );

  }
  goto(r: IResource) {
    this.router.navigateByUrl(`/spaces/${r.path}`);
  }

  delete(r: IResource) {
    this.resourceService.DeleteResource(r).subscribe({
      next: () => {
        // toast then redirect to parent? or update list?
        this.treeState.DeleteFolder(r);
        this.resourecState.removeItem(r);
        this.toast.ShowSuccess('DONE');
      }
    });
  }


}
