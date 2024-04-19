import { NgModule } from "@angular/core";
import { RouterModule,Routes } from "@angular/router";
import { AdddetailsComponent } from "./adddetails.component";

const routes: Routes = [
    {
        path: '',
        component: AdddetailsComponent,
    }
]
@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
  })

  export class AddDetailsRouting{}