import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { DialogService } from '../../lib/dialog/service';
import { TranslatePipe } from '../../lib/pipes/translate.pipe';
import { EnumResourceType } from '../../models/resource.model';
import { ResourceService } from '../../services/resource.service';
import { Res } from '../../utils/resources';
import { ResourceFormDialog } from './form.dialog';
import { IPath, PathState } from './path.state';
import { ResourceListState } from './tree.state';
@Component({
    selector: 'dm-resource-path',
    templateUrl: './path.partial.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [CommonModule, RouterModule, TranslatePipe]
})
export class ResourcePathPartial implements OnInit {

  @Input() space: string;
  enumResourceType = EnumResourceType;

  constructor(public pathState: PathState, private dialog: DialogService,
    private router: Router,
    private resourceListState: ResourceListState,
    private resourceService: ResourceService) {
    //
  }
  ngOnInit(): void {
    //
  }

  create(path: IPath, type: EnumResourceType) {
    // need to know where im current at, from the state or from url
    this.dialog.open(ResourceFormDialog, {
      title: Res.Get('Create_' + type),
      css: 'modal-half-screen animate fromend',
      data: { type, mode: {forNew: true} },
      onclose: (resource) => {
        if (resource) {
          // need to find a way to add to resources
          this.resourceService.CreateResource({ ...resource, subpath: path.path, space: this.space }).subscribe({
            next: (r) => {
              // try getting the match for parent id from path
              this.resourceListState.AddFolder(r, path.path);
              // try reroute also
              this.router.navigateByUrl(`/spaces/${r.path}`);
            }
          });
        }
      }
    });

  }


}
