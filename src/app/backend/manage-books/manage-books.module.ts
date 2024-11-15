import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { ManageBooksRoutingModule } from "./manage-books-routing.module";
import { ManageBooksComponent } from "./manage-books.component";
import { MaterialModule } from "src/app/material-module";


@NgModule({
    declarations: [ManageBooksComponent],
    imports: [
        CommonModule,
        ManageBooksRoutingModule,
        MaterialModule
    ],
    
})
export class ManageBooksModule { }