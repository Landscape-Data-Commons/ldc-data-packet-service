import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { DownloadRequestComponent } from './download-request/download-request.component';

export const ROUTES: Routes = [
  { path: '', component: HomeComponent },
  { path: 'timesheets', component: DownloadRequestComponent},
  { path: '**', redirectTo: '' }
];
