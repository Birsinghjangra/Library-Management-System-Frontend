import { NgModule } from "@angular/core";
import { UserManagementRoutingModule } from "./user-management-routing.module";
import { CommonModule } from "@angular/common";
import { MaterialModule } from "../../material-module";
import { ReactiveFormsModule } from '@angular/forms';
import { UserManagementComponent } from "./user-management.component";
import { MatTableModule } from "@angular/material/table";
import { MatCheckboxModule } from "@angular/material/checkbox";

@NgModule({
    declarations: [UserManagementComponent
    ],
    imports: [
        UserManagementRoutingModule,
        CommonModule,
        MaterialModule,
        ReactiveFormsModule,
        MatTableModule,
        MatCheckboxModule
    ],
})
export class UserManagementModule { }