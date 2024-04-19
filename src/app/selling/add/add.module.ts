import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { AddComponent } from "./add.component";
import { AddSellerRouting } from './app.routing.module';
import { ReactiveFormsModule } from "@angular/forms";


@NgModule({
  declarations: [AddComponent],
  imports: [ CommonModule,AddSellerRouting,ReactiveFormsModule],
})
export class AddsellerModule {}
