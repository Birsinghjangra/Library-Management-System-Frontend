import { NgModule } from '@angular/core';
import { loginRoutemodule } from './login-routing.module';
import { LoginComponent } from './login.component';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [LoginComponent],
  imports: [loginRoutemodule, CommonModule, ReactiveFormsModule,FormsModule],
})
export class loginModule {}