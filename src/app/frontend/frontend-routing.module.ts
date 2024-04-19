import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { FrontendComponent } from "./frontend.component";
import { DashboardComponent } from "../dashboard/dashboard.component";

const routes: Routes = [
  {
    path: '',
    component: FrontendComponent,
    children: [
      {
        path: '',
        component: DashboardComponent,
        // canActivate: [AuthGuard]
      },
      {
        path: 'dashboard',
        component: DashboardComponent,
        // canActivate: [AuthGuard]
      },
      {
        path: 'user_management',
        loadChildren: () =>
          import('../user-management/user-management.module').then(
            (m) => m.UserManagementModule
          ),
      },
      {
        path: 'addproduct',
        loadChildren: () =>
          import('../addproduct/addproduct.module').then(
            (m) => m.AddproductModule
          ),
      },
      {
        path: 'addproduct/add/:id',
        loadChildren: () =>
          import('../addproduct/adddetails/adddetails.module').then(
            (m) => m.AddDetailsModule
          ),
      },
      {
        path: 'addproduct/add',
        loadChildren: () =>
          import('../addproduct/adddetails/adddetails.module').then(
            (m) => m.AddDetailsModule
          ),
      },
      {
        path: 'selling',
        loadChildren: () =>
          import('../selling/selling.module').then((m) => m.sellingModule),
      },
      {
        path:'selling/add',
        loadChildren: () =>
          import('../selling/add/add.module').then((m) => m.AddsellerModule),
      },
      
    ],
  },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class FrontendRoutingModule { }