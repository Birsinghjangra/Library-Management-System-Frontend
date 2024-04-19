import { NgModule } from "@angular/core";
import { RouterModule,Routes } from "@angular/router";

import { SellingComponent } from "./selling.component";

const routes: Routes = [
    {
  path: '',
  component: SellingComponent,
}]

@NgModule({
    imports:[RouterModule.forChild(routes)],
    exports:[RouterModule]
})

export class sellingRoutingModule{}
