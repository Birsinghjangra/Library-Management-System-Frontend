import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { FrontendComponent } from "./frontend.component";
import { DashboardComponent } from "./dashboard/dashboard.component";

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
          import('../frontend/user-management/user-management.module').then(
            (m) => m.UserManagementModule
          ),
      },
      {
        path: 'user_management/add_user',
        loadChildren: () =>
          import('../frontend/user-management/add-user/add-user.module').then(
            (m) => m.AddUserModule
          ),
      },
      {
        path: 'user_management/add_user/:id',
        loadChildren: () =>
          import('../frontend/user-management/add-user/add-user.module').then(
            (m) => m.AddUserModule
          ),
      },
      {
        path: 'role_permission',
        loadChildren: () =>
          import('../frontend/role-permission/role-permission.module').then(
            (m) => m.RolePermissionModule
          ),
      },
      {
        path: 'add_books',
        loadChildren: () =>
          import('./add-books/add-books.module').then(
            (m) => m.AddBooksModule
          ),
      },
      {
        path: 'manage_books',
        loadChildren: () =>
          import('./manage-books/manage-books.module').then(
            (m) => m.ManageBooksModule
          ),
      },
      {
        path: 'issue_books',
        loadChildren: () =>
          import('./issue-books/issue-books.module').then(
            (m) => m.IssueBooksModule
          ),
      },
      {
        path: 'issued_books',
        loadChildren: () =>
          import('./issued-books/issued-books.module').then(
            (m) => m.IssuedBooksModule
          ),
      },
      
    ],
  },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class FrontendRoutingModule { }