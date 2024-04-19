import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { UserManagementComponent } from "./user-management.component";

const route : Routes = [
    {
        path: '',component: UserManagementComponent}
]

@NgModule({
    imports: [RouterModule.forChild(route)],
    exports: [RouterModule],
})
export class UserManagementRoutingModule {}