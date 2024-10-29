import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { DialogService } from '../../lib/dialog/service';
import { ResourceService } from '../../services/resource.service';
import { ResourceFormDialog } from './form.dialog';
import { IPath, PathState, ResourceListState } from './tree.state';
@Component({
  selector: 'dm-resource-path',
  templateUrl: './path.partial.html'
  , changeDetection: ChangeDetectionStrategy.OnPush
  , standalone: true
  , imports: [CommonModule, RouterModule]

})
export class ResourcePathPartial implements OnInit {

  @Input() space: string;
  @Output() onCreate: EventEmitter<any> = new EventEmitter();

  constructor(public pathState: PathState, private dialog: DialogService,
    private router: Router,
    private resourceListState: ResourceListState,
    private resourceService: ResourceService) {
    //
  }
  ngOnInit(): void {
    //
  }

  createFolder(path: IPath) {
    // need to know where im current at, from the state or from url
    this.dialog.open(ResourceFormDialog, {
      title: 'create folder',
      css: 'modal-half-screen animate fromend',
      onclose: (resource) => {
        if (resource) {
          // need to find a way to add to resources
          this.resourceService.CreateResource({ ...resource, subpath: path.path, space: this.space }).subscribe({
            next: (r) => {
              this.onCreate.emit(r);
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
