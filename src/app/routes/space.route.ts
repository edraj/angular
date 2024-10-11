import { Routes } from '@angular/router';
import { SpaceDetailsComponent } from '../components/space/details.component';
import { SpaceListComponent } from '../components/space/list.component';
// **gulpimport**

export const SpaceRoutes: Routes = [
  {
    path: '',
    component: SpaceListComponent,

  },
  {
    path: ':shortname',
    component: SpaceDetailsComponent
  }


  // **gulproute**
];
