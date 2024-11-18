import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './backend/dashboard/dashboard.component';
import { LoginComponent } from './backend/common/login/login.component';
import { PageNotFoundComponenet } from './backend/common/404 page not found/404.component';
import { UnauthorizedAccessComponent } from './backend/common/unauthorized-access/unauthorized-access.component';
// import { CommonsModule } from './common/commons.module';
// import { AuthGuard } from '../app/auth.service/./auth.guard';

const routes: Routes = [
  { path: '', component: LoginComponent },
  {path: 'login', component: LoginComponent},
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' }, // Redirect to dashboard by default
  {
    path: 'admin',
    loadChildren: () =>
      import('./backend/backend.module').then((m) => m.BackendModule),
  },
  { path: '', component: PageNotFoundComponenet },
  { path: 'unauthorized-access', component: UnauthorizedAccessComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }