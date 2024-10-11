import { Injectable } from '@angular/core';
import { IResource } from '../../models/resource.model';
import { ListStateService } from '../../utils/state.abstract';

export interface IResourceNode extends IResource {
  expanded?: boolean;
}

@Injectable()
export class ResourceListState extends ListStateService<IResourceNode> {
  constructor() {
    super('DEBUG');
  }
}
