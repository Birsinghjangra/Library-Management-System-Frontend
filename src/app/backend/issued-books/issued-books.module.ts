import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { IssuedBooksRoutingModule } from "../issued-books/issued-books-routing.module";
import { MatTableModule } from '@angular/material/table';

@NgModule({
        declarations: [
        ],
        imports: [
            CommonModule,
            IssuedBooksRoutingModule,
            MatTableModule,
        ]
})
export class IssuedBooksModule { }