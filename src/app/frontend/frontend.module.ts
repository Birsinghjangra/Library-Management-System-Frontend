import { NgModule } from "@angular/core";
import { FrontendComponent } from "./frontend.component";
import { FrontendRoutingModule } from "./frontend-routing.module";
import { CommonModule } from "@angular/common";
import { HeaderComponent } from "../common/header/header.component";
import { FooterComponent } from "../common/footer/footer.component";
import { SidebarComponent } from "../common/sidebar/sidebar.component";
import { IssuedBooksComponent } from './issued-books/issued-books.component';

@NgModule({
    imports: [FrontendRoutingModule, CommonModule],
    exports: [],
    declarations: [FrontendComponent, HeaderComponent, FooterComponent, SidebarComponent, IssuedBooksComponent],
})
export class FrontendModule {}