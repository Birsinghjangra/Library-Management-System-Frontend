import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './backend/common/header/header.component';
import { SidebarComponent } from './backend/common/sidebar/sidebar.component';
import { FooterComponent } from './backend/common/footer/footer.component';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import {MatInputModule} from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { ReactiveFormsModule } from '@angular/forms';
import { LoginModule } from './backend/common/login/login.module';
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
import { DeleteDialogComponent } from './backend/common/dialog-box/delete-dialog/delete-dialog.component';
import { FrontendComponent } from './frontend/frontend.component';
import { MatTooltipModule } from '@angular/material/tooltip';
import { BarcodeDialogComponent } from './backend/common/dialog-box/barcode-dialog/barcode-dialog.component';
import { LoaderComponent } from './backend/common/loader/loader.component';
import { AuthInterceptor } from './auth.interceptor';
import { LoaderService } from './services/loader.service';



@NgModule({
  declarations: [
    AppComponent,
    LoaderComponent,
    // UserManagementComponent,
    // RolePermissionComponent,
    // ManageBooksComponent,
    // AddBooksComponent,
    // IssueBooksComponent,
    // IssuedBooksComponent,
    // AddUserComponent,
    // DeleteDialogComponent,
    // FrontendComponent,
    BarcodeDialogComponent,
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
    LoginModule,
    MatSnackBarModule,
    MatTableModule,
    MatCheckboxModule,
    FormsModule,
    MatAutocompleteModule,
    NgSelectModule,
    MatDialogModule,
    MatTooltipModule,
  ],
  providers: [{ provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },LoaderService],

  bootstrap: [AppComponent],
  exports: [
    BarcodeDialogComponent // If you need to use it in other modules
  ]
})
export class AppModule {}
