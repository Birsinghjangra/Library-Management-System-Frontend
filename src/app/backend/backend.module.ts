import { NgModule } from "@angular/core";
import { BackendComponent } from "./backend.component";
import { BackendRoutingModule } from "./backend-routing.module";
import { CommonModule } from "@angular/common";
import { HeaderComponent } from "../backend/common/header/header.component";
import { FooterComponent } from "../backend/common/footer/footer.component";
import { SidebarComponent } from "../backend/common/sidebar/sidebar.component";
import { ReportComponent } from './report/report.component';
import { MaterialModule } from "../material-module";
import { SchoolInformationComponent } from "./school-information/school-information.component";



@NgModule({
    imports: [BackendRoutingModule, CommonModule,MaterialModule],
    exports: [],
    declarations: [BackendComponent, HeaderComponent, FooterComponent, SidebarComponent, ReportComponent,SchoolInformationComponent],
})
export class BackendModule {}