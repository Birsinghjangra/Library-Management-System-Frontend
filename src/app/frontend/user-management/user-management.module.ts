import { NgModule } from "@angular/core";
import { UserManagementRoutingModule } from "./user-management-routing.module";
import { CommonModule } from "@angular/common";
import { MaterialModule } from "../../material-module";
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
    declarations: [
    ],
    imports: [
        UserManagementRoutingModule,
        CommonModule,
        MaterialModule,
        ReactiveFormsModule
    ],
})
export class UserManagementModule { }