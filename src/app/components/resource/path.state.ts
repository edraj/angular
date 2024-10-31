import { Injectable } from '@angular/core';
import { EnumResourceType } from '../../models/resource.model';
import { StateService } from '../../utils/state.abstract';

export interface IPath {
  path: string;
  type: EnumResourceType;
  space: string;
  source: 'toggle' | 'route';
}
@Injectable()
export class PathState extends StateService<IPath> {
  constructor() {
    super();
  }
}
