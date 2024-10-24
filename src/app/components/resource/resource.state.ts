import { Injectable } from '@angular/core';
import { Observable, switchMap } from 'rxjs';
import { IResource } from '../../models/resource.model';
import { ResourceService } from '../../services/resource.service';
import { ListStateService } from '../../utils/state.abstract';

export interface IResourceNode extends IResource {
  expanded?: boolean;
}
export interface ITree {
  id: string;
  listState?: ResourceListState;
  populated?: boolean;
}

@Injectable()
export class ResourceListState extends ListStateService<IResourceNode> {
  constructor() {
    super('DEBUG');
  }
}

@Injectable()
export class TreeListState extends ListStateService<ITree> {
  constructor(private resourceService: ResourceService) {
    super('DEBUG');
  }


  GetState(space: string, id: string): ResourceListState {

    const _id = id || space;
    const _locallist = this.currentList.find(r => r.id === _id);
    // if substate exist, return
    if (_locallist?.populated) {
      return _locallist.listState;
    }
    // create a new one and add
    const rsubstate = new ResourceListState();
    // first time there is no id
    super.addItem({ id: _id, listState: rsubstate, populated: false });
    return rsubstate;
  }

  GetResources(space: string, resource: IResourceNode, state: ResourceListState): Observable<IResourceNode[]> {

    const _id = resource?.id || space;
    const _locallist = this.currentList.find(r => r.id === _id);

    if (_locallist?.populated) {
      return state.stateList$;
    }

    // get from server and populate state
    return this.resourceService.GetResources({
      space: space,
      resourceType: resource?.type,
      subpath: resource?.subpath
    }).pipe(
      switchMap(d => {
        // something wrong here, clone!
        _locallist.populated = true;
        // super.editItem({ id: _id, populated: true, listState: state });
        return state.SetList(d.matches);
      })
    );
  }

  // might need this
  // private edit(item: ITree): void {
  //   const currentList = [...this.currentList];
  //   const index = currentList.findIndex(n => n.id === item.id);
  //   if (index > -1) {

  //     item.populated = true;
  //     currentList[index] = item; // use a proper cloner
  //     this.stateList.next(currentList);
  //   }
  // }

}
