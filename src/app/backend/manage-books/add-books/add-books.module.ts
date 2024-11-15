import { NgModule } from "@angular/core";
import { AddBooksRoutingModule } from "./add-books-routing.module";
import { CommonModule } from "@angular/common";
import { AddBooksComponent } from "./add-books.component";
import { MaterialModule } from "src/app/material-module";

@NgModule({
    declarations: [AddBooksComponent],
    imports: [
        AddBooksRoutingModule,
        CommonModule,
        MaterialModule
    ],
})
export class AddBooksModule {}