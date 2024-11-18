import { NgModule } from "@angular/core";
import { HeaderComponent } from "./header/header.component";
import { FooterComponent } from "./footer/footer.component";
import { SidebarComponent } from "./sidebar/sidebar.component";
import { CommonModule } from "@angular/common";
import { MatIconModule } from "@angular/material/icon";
import { MaterialModule } from "src/app/material-module";

@NgModule({
    declarations: [HeaderComponent, FooterComponent, SidebarComponent],
    imports: [ CommonModule, MatIconModule, MaterialModule ],
    exports: [  HeaderComponent, FooterComponent, SidebarComponent],
})
export class CommonsModule {}