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
import { UserManagementComponent } from '../app/backend/user-management/user-management.component';
import { RolePermissionComponent } from '../app/backend/role-permission/role-permission.component';
import { ManageBooksComponent } from './backend/manage-books/manage-books.component';
import { AddBooksComponent } from './backend/manage-books/add-books/add-books.component';
import { IssueBooksComponent } from './backend/issue-books/issue-books.component';
import { AddUserComponent } from '../app/backend/user-management/add-user/add-user.component';
import { MatTableModule } from '@angular/material/table';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { FormsModule } from '@angular/forms'; 
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { NgSelectModule } from '@ng-select/ng-select';
import { IssuedBooksComponent } from './backend/issued-books/issued-books.component';
import { MatDialogModule } from '@angular/material/dialog';
import { DeleteDialogComponent } from './dialog/delete-dialog/delete-dialog.component';

@NgModule({
  declarations: [
    AppComponent,
    // UserManagementComponent,
    RolePermissionComponent,
    ManageBooksComponent,
    AddBooksComponent,
    IssueBooksComponent,
    IssuedBooksComponent,
    AddUserComponent,
    DeleteDialogComponent,
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
    MatCheckboxModule,
    FormsModule,
    MatAutocompleteModule,
    NgSelectModule,
    MatDialogModule
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
