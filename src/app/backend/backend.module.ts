import { NgModule } from "@angular/core";
import { BackendComponent } from "./backend.component";
import { BackendRoutingModule } from "./backend-routing.module";
import { CommonModule } from "@angular/common";
import { HeaderComponent } from "../backend/common/header/header.component";
import { FooterComponent } from "../backend/common/footer/footer.component";
import { SidebarComponent } from "../backend/common/sidebar/sidebar.component";
import { ReportComponent } from './report/report.component';

@NgModule({
    imports: [BackendRoutingModule, CommonModule],
    exports: [],
    declarations: [BackendComponent, HeaderComponent, FooterComponent, SidebarComponent, ReportComponent],
})
export class BackendModule {}