import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './common/header/header.component';
import { SidebarComponent } from './common/sidebar/sidebar.component';
import { FooterComponent } from './common/footer/footer.component';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import {MatInputModule} from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { ReactiveFormsModule } from '@angular/forms';
import { loginModule } from './common/login/login.module';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { UserManagementComponent } from '../app/frontend/user-management/user-management.component';
import { RolePermissionComponent } from '../app/frontend/role-permission/role-permission.component';
import { ManageBooksComponent } from './frontend/manage-books/manage-books.component';
import { AddBooksComponent } from './frontend/add-books/add-books.component';
import { IssueBooksComponent } from './frontend/issue-books/issue-books.component';
import { AddUserComponent } from '../app/frontend/user-management/add-user/add-user.component';
import { MatTableModule } from '@angular/material/table';
import { MatCheckboxModule } from '@angular/material/checkbox';


@NgModule({
  declarations: [
    AppComponent,
    // UserManagementComponent,
    RolePermissionComponent,
    ManageBooksComponent,
    AddBooksComponent,
    IssueBooksComponent,
    AddUserComponent,
    // HeaderComponent,
    // SidebarComponent,
    // FooterComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatPaginatorModule,
    MatSortModule,
    MatInputModule,
    MatIconModule,
    ReactiveFormsModule,
    loginModule,
    MatSnackBarModule,
    MatTableModule,
    MatCheckboxModule
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
