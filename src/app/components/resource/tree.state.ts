import { Injectable } from '@angular/core';
import { Observable, of, switchMap } from 'rxjs';
import { EnumResourceType, IResource } from '../../models/resource.model';
import { ResourceService } from '../../services/resource.service';
import { ListStateService } from '../../utils/state.abstract';
import { IPath } from './path.state';

export interface IResourceNode extends IResource {
  expanded?: boolean;
  parentId?: string;
  populated?: boolean;
}


@Injectable()
export class ResourceListState extends ListStateService<IResourceNode> {
  constructor(private resourceService: ResourceService) {

    super('DEBUG');
    super.SetList([]);
  }

  GetResources(space: string, resource: IResourceNode): Observable<IResourceNode[]> {

    const _id = resource?.id || space;

    // first find this element to see if it has already been populated
    const _current = this.currentList.find(r => r.id === _id);
    if (_current?.populated) {
      return this.GetChildren(_id);
    }
    // get from server and populate state
    return this.resourceService.GetResources({
      space: space,
      resourceType: resource?.type,
      subpath: resource?.subpath
    }).pipe(
      switchMap(d => {
        // set, TODO: empty list
        if (_current) _current.populated = true;
        return this.appendList(d.matches.map(n => ({ ...n, parentId: _id, expanded: false, populated: false })));
      }),
      switchMap(l => this.GetChildren(_id))
    );
  }

  GetChildren(id?: string): Observable<IResourceNode[]> {
    return of(this.currentList.filter(f => f.parentId === id));
  }

  Sync(path: IPath) {
    if (path?.path && path?.source === 'route') {
      // break it up and find and expend
      // if destroying, dont do this
      const parts = path.path.split('/');
      this.currentList.filter(r => r.type === EnumResourceType.FOLDER).forEach(r => {
        if (parts.includes(r.shortname)) {
          r.expanded = true;
        }
      });
    }
  }

  Toggle(resource: IResourceNode) {
    // nothing to toggle if not folder
    if (resource.type === EnumResourceType.FOLDER) {
      this.editItem({ ...resource, expanded: !resource.expanded });
    }
  }
  AddFolder(resource: IResourceNode, path: string) {
    // find the parentId from path
    // space + type + path, the type is always a folder, space is in resource
    const _parent = this.currentList.find(r => r.path === `${resource.space}/folder/${path}`);
    if (_parent && _parent.populated) {
      // if not poulated, let server do this
      this.addItem({ ...resource, parentId: _parent.id, expanded: false, populated: false });
    }
  }
  DeleteFolder(resource: IResourceNode) {
    this.removeItem(resource);
    // now what happens to children?
  }

}
