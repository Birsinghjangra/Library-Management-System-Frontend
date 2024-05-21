import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { IssueBooksRoutingModule } from "./issue-books-routing.module";
import { MaterialModule } from "../../material-module";


@NgModule({
    declarations: [],
    imports: [
        CommonModule,
        IssueBooksRoutingModule,
        MaterialModule
    ],
})
export class IssueBooksModule {}