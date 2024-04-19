import { NgModule } from "@angular/core";
import { ReactiveFormsModule } from '@angular/forms';
import { AddCategoryDialogueComponent } from "./add-category.component";

@NgModule({
  declarations: [AddCategoryDialogueComponent],
  imports: [ReactiveFormsModule],
  exports: [],
})
export class AddCategoryModule {}