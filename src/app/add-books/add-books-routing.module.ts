import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { AddBooksComponent } from "./add-books.component";

const routes : Routes = [
    {
        path: '',
        component: AddBooksComponent
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class AddBooksRoutingModule {}