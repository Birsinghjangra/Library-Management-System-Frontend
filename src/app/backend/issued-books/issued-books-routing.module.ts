import { NgModule } from "@angular/core";
import { IssuedBooksComponent } from "./issued-books.component";
import { RouterModule, Routes } from "@angular/router";

const routes: Routes = [
    {
    path: '', component: IssuedBooksComponent
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class IssuedBooksRoutingModule { }