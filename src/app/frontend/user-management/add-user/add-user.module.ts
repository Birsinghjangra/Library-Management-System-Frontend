import { NgModule } from "@angular/core";
import { AddUserRoutingModule } from "./add-user-routing.module";
import { CommonModule } from "@angular/common";
import { MaterialModule } from "../../../material-module";
import { HttpClientModule } from '@angular/common/http';

@NgModule({
    declarations: [],
    imports: [
        AddUserRoutingModule,
        CommonModule,
        MaterialModule,
        HttpClientModule
    ],
})
export class AddUserModule {}