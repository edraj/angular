import { Routes } from '@angular/router';
import { LoginResolveFn } from '../auth/login.resolve';
import { PublicLoginComponent } from '../components/public/login.component';
// **gulpimport**


export const PublicRoutes: Routes = [
  {
    path: '',
    redirectTo: '/spaces',
    pathMatch: 'full'
    // component: PublicHomeComponent,
    // title: 'SITE_NAME'
  }
  , {
    path: 'login',
    component: PublicLoginComponent,
    resolve: {
      login: LoginResolveFn
    }
  }

  // **gulproute**
];


