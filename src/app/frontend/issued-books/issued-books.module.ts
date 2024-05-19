import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { IssuedBooksRoutingModule } from "../issued-books/issued-books-routing.module";
import { MaterialModule } from "../../material-module";
import { ReactiveFormsModule } from '@angular/forms';
import { MatTableModule } from "@angular/material/table";

@NgModule({
        declarations: [],
        imports: [
            CommonModule,
            IssuedBooksRoutingModule,
            MaterialModule,
            MatTableModule,
            ReactiveFormsModule
        ]
})
export class IssuedBooksModule { }