// TODO: merge into one large state, bass for now, every route has its own state

import { Injectable } from '@angular/core';
import { IResource } from '../../models/resource.model';
import { ListStateService } from '../../utils/state.abstract';

@Injectable()
export class PageResourecListState extends ListStateService<IResource> {
  constructor() {
    //
    super();
  }
}
