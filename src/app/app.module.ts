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
import { UserManagementComponent } from './user-management/user-management.component';


@NgModule({
  declarations: [
    AppComponent,
    UserManagementComponent,
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
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
