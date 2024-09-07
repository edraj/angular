import { Routes } from '@angular/router';
import { PublicHomeComponent } from '../components/public/home.component';
// **gulpimport**


export const PublicRoutes: Routes = [
    {
        path: '',
        component: PublicHomeComponent,
        title: 'SITE_NAME'
    }
    // **gulproute**
];


