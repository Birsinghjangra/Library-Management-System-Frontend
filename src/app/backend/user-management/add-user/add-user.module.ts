import { NgModule } from "@angular/core";
import { AddUserRoutingModule } from "./add-user-routing.module";
import { CommonModule } from "@angular/common";
import { MaterialModule } from "../../../material-module";
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from "@angular/forms";
import { AddUserComponent } from "./add-user.component";

@NgModule({
    declarations: [AddUserComponent],
    imports: [
        AddUserRoutingModule,
        CommonModule,
        ReactiveFormsModule,
        MaterialModule,

    ],
})
export class AddUserModule {}