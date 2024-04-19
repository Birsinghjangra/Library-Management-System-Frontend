import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { AddProductService } from '../../services/add-product.service';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { DatePipe } from '@angular/common';
import { SnackBarService } from 'src/app/services/snackbar.service';
import { AddCategoryDialogueComponent } from '../addcategoryDialogue/add-category.component';
import { MatDialog } from '@angular/material/dialog';
import { ProductDialogueComponent } from '../addProductDialogue/productdialogue.component';
@Component({
  selector: 'app-adddetails',
  templateUrl: './adddetails.component.html',
  styleUrls: ['./adddetails.component.css'],
})
export class AdddetailsComponent implements OnInit {
  addProductForm!: FormGroup;
  formFields: any = [];
  productId: any;
  response: any = [];
  isRequired = false;
  categories: any = [];
  category_id: any;
  productOptions: any[] = [];
  categoryOptions: any[] = [];
  selectedCategoryId: any;
  selectedCategory: any

  constructor(
    private fb: FormBuilder,
    private addProductService: AddProductService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private datePipe: DatePipe,
    private snackBar: SnackBarService,
    public dialog: MatDialog
  ) { }

  async ngOnInit() {
    const val = {
      Table_name: "category"
    }
    this.addProductService.getData(val).subscribe(response => {
      this.categories = response.data;
      this.categoryOptions = this.categories;

    });
    this.activatedRoute.queryParams.subscribe((params) => {
      this.productId = params['id'];
      // console.log("edit id", this.productId)
      if (this.productId) {
        // debugger
        this.addProductService.getProductById(this.productId)
          .subscribe((product: any) => {
            this.response = product.data[0];
            console.log("response", this.response)
            const formValues: any = {};
            Object.keys(this.response).forEach((key) => {
              if (key === 'manufacturingDate' || key === 'expiryDate') {
                const formattedDate = this.datePipe.transform(this.response[key], 'yyyy-MM-dd');
                formValues[key] = formattedDate;
              } 
              else if (key === 'category') {
            this.categoryOptions = [{ id: this.response['category_id'], name: this.response['category'] }];
                formValues['category'] = this.categoryOptions
                console.log("category",formValues['category'])
            } else if (key === 'productName') {
              formValues['productName'] = this.response['productName'];
                console.log("productName",formValues['productName'])
                this.productOptions = [{ product_id: this.response['product_id'], product_name: this.response['productName'] }];
                formValues['productName'] = this.productOptions
            }
              else {
                formValues[key] = this.response[key];
              }
            });
            // this.productOptions = [{ product_id: this.response['product_id'], product_name: this.response['productName'] }];
            // console.log("this.productOptions:->",this.productOptions)
           
            this.addProductForm.patchValue(formValues);
          });
      }
    });
    await this.addProductService.GetProductform().subscribe((data) => {
      this.formFields = data;
      this.generateForm();
    });
  }
  async onCategorySelect(event: any) {
    this.selectedCategoryId = event.target.value;
    this.selectedCategory = await this.categoryOptions.find(option => option.id === parseInt(this.selectedCategoryId));
    // console.log("Selected category:", this.selectedCategory);
    await this.getProduct_name();
  }
  async getProduct_name() {
    const val = {
      category_id: this.selectedCategoryId
    }
    await this.addProductService.get_products_by_category(val).subscribe(res => {
      this.productOptions = res.data;
      // console.log("product option", this.productOptions)
      let message = res.message;
      if (res.status === 'success') {
        this.snackBar.openSnackBarSuccess([message]);
      } else {
        this.snackBar.openSnackBarError([message])
      }
    })
  }
  opencategoryDialogue(): void {
    const dialogRef = this.dialog.open(AddCategoryDialogueComponent, {
      width: '300px',
    });
    dialogRef.afterClosed().subscribe((result) => {
      console.log(result);
    });
  }

  openProductDialogue(): void {
    const dialogRef = this.dialog.open(ProductDialogueComponent, {
      width: '500px',
      height: '500px',
    });
    dialogRef.afterClosed().subscribe((result) => {
      console.log(result);
    });
  }
  generateForm(): void {
    const formGroupConfig: any = {};
    this.formFields.forEach((field: any) => {
      const validationsArray: any = [];
      field.validations.forEach((valid: any) => {
        if (valid.name === 'required') {
          validationsArray.push(Validators.required);
          this.isRequired = true;
        }
      });
      formGroupConfig[field.name] = ['', validationsArray];
      field.isRequired = this.isRequired;
    });
    this.addProductForm = this.fb.group(formGroupConfig);
  }
  onSubmit(): void {
    if (this.addProductForm.valid) {
      let value = this.addProductForm.value;
      const selectedCategory = this.categoryOptions.find(option => option.id === parseInt(value.category));
      const categoryName = selectedCategory ? selectedCategory.name : '';
      value.category = categoryName;
      const selectedProduct = this.productOptions.find(option => option.product_id === parseInt(value.productName));
      const productName = selectedProduct ? selectedProduct.product_name : '';
      value.productName = productName;
      value.category_id = selectedCategory ? selectedCategory.id : null;
      value.product_id = selectedProduct ? selectedProduct.product_id : null;
      if (this.productId > 0) {
        value.id = this.productId;
      }
      // console.log("value",value)
      
      this.addProductService.addProduct(value).subscribe((response: any) => {
        console.log(response);
        let message = response.message;
        if (response.status === 'success') {
          this.snackBar.openSnackBarSuccess([message]);
          this.router.navigate(['/admin/addproduct']);
        } else {
          this.snackBar.openSnackBarError([message]);
        }
      });
    } else {
      this.addProductForm.markAllAsTouched();
    }
  }
  resetform(){
    this.addProductForm.reset(this.addProductForm.value);
}
}
