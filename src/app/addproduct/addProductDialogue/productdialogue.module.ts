import { NgModule } from "@angular/core";
import { ReactiveFormsModule } from "@angular/forms";
// import { ProductDialogueComponent } from "New folder/src/app/addproduct/addProductDialogue/productdialogue.component";
import { ProductDialogueComponent} from '../addProductDialogue/productdialogue.component'
import { CommonModule } from "@angular/common";
@NgModule({
    declarations:[ProductDialogueComponent],
    imports:[ReactiveFormsModule,CommonModule],
    exports:[]

})
export class ProductDialogueDialogueModule{}