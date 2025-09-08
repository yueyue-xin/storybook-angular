import { Route } from '@angular/router';
import { HelloComponent } from './hello/hello.component';
import { NewDataComponent } from './new-data/new-data.component';

export const appRoutes: Route[] = [
  { path: '', redirectTo: '/hello', pathMatch: 'full' },
  { path: 'hello', component: HelloComponent },
  { path: 'new-data', component: NewDataComponent }
];
