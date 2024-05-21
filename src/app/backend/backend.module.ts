import { NgModule } from "@angular/core";
import { BackendComponent } from "./backend.component";
import { BackendRoutingModule } from "./backend-routing.module";
import { CommonModule } from "@angular/common";
import { HeaderComponent } from "../common/header/header.component";
import { FooterComponent } from "../common/footer/footer.component";
import { SidebarComponent } from "../common/sidebar/sidebar.component";

@NgModule({
    imports: [BackendRoutingModule, CommonModule],
    exports: [],
    declarations: [BackendComponent, HeaderComponent, FooterComponent, SidebarComponent],
})
export class BackendModule {}