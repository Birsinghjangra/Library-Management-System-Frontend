import { Component, Inject } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { AddProductService } from "src/app/services/add-product.service";
import { SnackBarService } from "src/app/services/snackbar.service";

@Component({
  selector: 'app-add-category',
  templateUrl: './add-category.component.html',
  styleUrls: ['./add-category.component.css'],
})
export class AddCategoryDialogueComponent {
  categoryForm!: FormGroup;
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<AddCategoryDialogueComponent>,
    private AddProductService:AddProductService,
    private snackBar: SnackBarService,

  ) {
    this.categoryForm = this.fb.group({
      category: ['', Validators.required],
    });
  }

  closeDialog(): void {
    this.dialogRef.close();
  }
  onSubmit(): void {
    // Handle form submission
    if (this.categoryForm.valid) {
      const category = this.categoryForm.value.category;
      const payload = {
        table_name: 'category',
        action: 'insert',
        column_data: { name: this.categoryForm.value.category }
      };
      // console.log(paylod)
      this.AddProductService.addData_db_operations(payload).subscribe((response:any)=>{
        // console.log("data data",response)
        let message = response.message
        if(response.status==='success'){
          this.snackBar.openSnackBarSuccess([message])

        }
        else{
          this.snackBar.openSnackBarError([message])
        }
      })
      this.dialogRef.close()
      // this.dialogRef.close(category);
    }
  }
}