import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { IResource } from '../models/resource.model';
import { ListStateService } from '../utils/state.abstract';
import { SpaceService } from './space.service';

@Injectable({providedIn: 'root'})
export class SpaceListState extends ListStateService<IResource> {
  constructor(private spaceService: SpaceService) {
    super('DEBUG');
    this.spaceService.GetSpaces().subscribe({
      next: (list) => {
        this.SetList(list.matches);
      }
    })
  }

  GetSpace(space: string): Observable<IResource> {
    return this.stateList$.pipe(map(list => list.find(item => item.shortname === space)));
  }
}
