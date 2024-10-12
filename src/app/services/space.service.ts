import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Config } from '../config';
import { EnumQueryType, IList } from '../models/list.model';
import { EnumResourceType, IResource } from '../models/resource.model';
import { ResourceService } from './resource.service';


@Injectable({ providedIn: 'root' })
export class SpaceService {


  constructor(private resourceService: ResourceService) {

  }

  GetSpace(space: string): Observable<IResource> {

    // space/Ayyash/__root__/Ayyash
    return this.resourceService.GetResource({
      space,
      resource: EnumResourceType.SPACE,
      subpath: `${Config.API.rootPath}/${space}`,
      withPayload: true,
      withAttachments: true
    });

  }

  // get root spaces
  GetSpaces(): Observable<IList<IResource>> {
    return this.resourceService.GetResources({ type: EnumQueryType.SPACES });
  }


}
