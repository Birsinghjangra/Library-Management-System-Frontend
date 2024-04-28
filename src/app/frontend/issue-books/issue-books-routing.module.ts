import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { IssueBooksComponent } from "./issue-books.component";

const routes: Routes = [
    {
        path: '',component: IssueBooksComponent
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class IssueBooksRoutingModule {}