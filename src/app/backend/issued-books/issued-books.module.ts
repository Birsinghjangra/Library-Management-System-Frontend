import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { IssuedBooksRoutingModule } from "../issued-books/issued-books-routing.module";
import { MatTableModule } from '@angular/material/table';
import { IssuedBooksComponent } from "./issued-books.component";
import { MatTooltipModule } from "@angular/material/tooltip";
import { MaterialModule } from "src/app/material-module";


@NgModule({
        declarations: [IssuedBooksComponent
        ],
        imports: [
            CommonModule,
            IssuedBooksRoutingModule,
            MatTableModule,
            MatTooltipModule,
            MaterialModule        
        ]
})
export class IssuedBooksModule { }