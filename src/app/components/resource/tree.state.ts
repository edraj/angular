import { Injectable } from '@angular/core';
import { map, Observable, of, switchMap } from 'rxjs';
import { EnumResourceType, IResource } from '../../models/resource.model';
import { ResourceService } from '../../services/resource.service';
import { ListStateService, StateService } from '../../utils/state.abstract';

export interface IResourceNode extends IResource {
  expanded?: boolean;
  parentId?: string;
  populated?: boolean;
}


export interface IPath {
  path: string;
  type: EnumResourceType;
}
@Injectable()
export class PathState extends StateService<IPath> {
  constructor() {
    super();
  }
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
    // const _l = this.currentList.filter(r => r.parentId === _id);
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
  _GetChildren(id?: string): Observable<IResourceNode[]> {
    return this.stateList$.pipe(
      map(n => n.filter(f => f.parentId === id))
    );



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
}
