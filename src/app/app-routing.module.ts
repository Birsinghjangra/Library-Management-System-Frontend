import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './backend/dashboard/dashboard.component';
import { LoginComponent } from './backend/common/login/login.component';
import { FrontendComponent } from './frontend/frontend.component';
// import { CommonsModule } from './common/commons.module';
// import { AuthGuard } from '../app/auth.service/./auth.guard';

const routes: Routes = [
  { path: '', component: FrontendComponent },
  { path: 'frontend', component: FrontendComponent},
  // {path: 'login', component: LoginComponent},
  // { path: '', redirectTo: '/dashboard', pathMatch: 'full' }, // Redirect to dashboard by default
  {
    path: 'admin',
    loadChildren: () =>
      import('./backend/backend.module').then((m) => m.BackendModule),
  }  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
