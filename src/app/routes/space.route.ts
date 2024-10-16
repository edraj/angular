import { Routes, UrlSegment } from '@angular/router';
import { ResourceDetailsComponent } from '../components/resource/details.component';
import { SpaceDetailsComponent } from '../components/space/details.component';
import { SpaceListComponent } from '../components/space/list.component';
// **gulpimport**

export const SpaceRoutes: Routes = [
  {
    path: '',
    component: SpaceListComponent,

  },
  {
    component: SpaceDetailsComponent,
    path: ':space',
    children: [
      {
        component: ResourceDetailsComponent,
        matcher: (url) => {
          if (url.length > 0) {
            //  pass the rest as one param
            // the first is the resource type, content or folder

            return {
              consumed: url,
              posParams: {
                type: url[0],
                path: new UrlSegment(url.slice(1).join('/'), {})
              }
            };
          }
          return null;
        }
      }
    ]
  }
  // {
  //   component: SpaceDetailsComponent,
  //   matcher: (url) => {
  //     // catch all urls after 0
  //     if (url.length > 0) {

  //       // first is shortname, pass the rest as one param
  //       return {
  //         consumed: url,
  //         posParams: {
  //           shortname: url[0],
  //           contentpath: new UrlSegment(url.slice(1).join('/'), {})
  //         }
  //       };
  //     }
  //     return null;
  //   }
  // }
  // **gulproute**
];
