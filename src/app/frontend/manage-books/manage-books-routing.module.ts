import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { ManageBooksComponent } from "./manage-books.component";

const routes : Routes = [
    {
        path: '',
        component: ManageBooksComponent
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class ManageBooksRoutingModule {}