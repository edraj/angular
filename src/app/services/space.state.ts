import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { IResource } from '../models/resource.model';
import { ListStateService } from '../utils/state.abstract';
import { SpaceService } from './space.service';

@Injectable({ providedIn: 'root' })
export class SpaceListState extends ListStateService<IResource> {
  constructor(private spaceService: SpaceService) {
    super('DEBUG');
    this.spaceService.GetSpaces().subscribe({
      next: (list) => {
        super.SetList(list.matches);
      }
    });
  }

  GetSpace(space: string): Observable<IResource> {
    return this.stateList$.pipe(map(list => list.find(item => item.shortname === space)));
  }

  Create(space: IResource): Observable<boolean> {
    return this.spaceService.CreateSpace(space).pipe(
      map((res) => {
        if (res) {
          super.addItem(res);
          return true;
        }
        return false;
      })
    );
  }

  Delete(space: IResource): Observable<boolean> {
    return this.spaceService.DeleteSpace(space).pipe(
      map((res) => {
        if (res) {
          super.removeItem(space);
          return true;
        }
        return false;
      })
    );

  }
  Update(space: IResource): Observable<boolean> {
    return this.spaceService.UpdateSpace(space).pipe(
      map((res) => {
        if (res) {
          super.editItem(res);
          return true;
        }
        return false;
      })
    );
  }
}
