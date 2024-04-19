import { NgModule } from '@angular/core';
// import { AddproductRouting } from './addproduct-routing.module';
// import { AddproductComponent } from './addproduct.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule, DatePipe } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { AdddetailsComponent } from './adddetails.component';
import { AddDetailsRouting } from './adddetails-routing.module';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatDialogModule } from '@angular/material/dialog';
import { AddCategoryModule } from '../addcategoryDialogue/add-category.module';
// import { ProductDialogueComponent } from '../addProductDialogue/productdialogue.component';
import { ProductDialogueDialogueModule } from '../addProductDialogue/productdialogue.module';

@NgModule({
  declarations: [AdddetailsComponent],
  providers: [DatePipe],
  imports: [
    ReactiveFormsModule,
    CommonModule,
    HttpClientModule,
    FormsModule,
    AddDetailsRouting,
    MatSnackBarModule,
    MatDialogModule,
    AddCategoryModule,
    ProductDialogueDialogueModule,
  ],
})
export class AddDetailsModule {}