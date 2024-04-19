import { NgModule } from "@angular/core";
import { SellingComponent } from "./selling.component";
import { CommonModule } from "@angular/common";
import { sellingRoutingModule } from "./selling.routing.module";
import { MatPaginatorModule } from "@angular/material/paginator";
import { MatTableModule } from "@angular/material/table";
import { MatSortModule } from "@angular/material/sort";
import { MatInputModule } from "@angular/material/input";
import { MatIconModule } from "@angular/material/icon";

@NgModule({
  declarations: [SellingComponent],
  imports: [sellingRoutingModule,CommonModule,MatPaginatorModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatInputModule,
    MatIconModule],
})
export class sellingModule {}