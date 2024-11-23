import { NgModule } from "@angular/core";
import { SchoolInformationComponent } from "./school-information.component";
import { RouterModule, Routes } from "@angular/router";

const routes : Routes= [
    {
        path: '',component: SchoolInformationComponent
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class SchoolInformationRoutingModule {}