import { Routes } from '@angular/router';
import { JobListComponent } from './components/job-list/job-list.component';
import { FavoriteListComponent } from './components/favorite-list/favorite-list.component';
import { JobDetailsComponent } from './components/job-details/job-details.component';


export const routes: Routes = [
    { path: 'jobs', component: JobListComponent },
    { path: 'favorites', component: FavoriteListComponent },
    { path: 'jobs/:id', component: JobDetailsComponent },
    { path: '', redirectTo: '/jobs', pathMatch: 'full' }, 
  ];