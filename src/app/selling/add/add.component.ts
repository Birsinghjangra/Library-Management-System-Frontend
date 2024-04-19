import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { HttpClient } from "@angular/common/http";
import { AddProductService } from "src/app/services/add-product.service";
import { SnackBarService } from "src/app/services/snackbar.service";
import { Router } from "@angular/router";
@Component({
    selector: "app-add",
    templateUrl: "./add.component.html",
    styleUrls: ["./add.component.css"],
})

export class AddComponent implements OnInit {
    sellProductForm!: FormGroup;
    // productdata:any
    productOptions: any[] = [];
    selectedProductId!: number;

    constructor(
        private fb: FormBuilder, 
        private http: HttpClient,
        private AddProductService: AddProductService,
        private SnackBarService: SnackBarService,
        private router:Router) { }
    ngOnInit(): void {

        this.sellProductForm = this.fb.group({
            product_id: ['', Validators.required],
            sell_quantity: ['', Validators.required],
            unit_sellingPrice: ['', Validators.required]
        });
        
        this.getProduct()
    }
    resetform(){
        this.sellProductForm.reset(this.sellProductForm.value);
    }
    getProduct(){
        this.AddProductService.getProductData().subscribe((data: any) => {
            // this.productdata = data['data'][0];
            // this.productdata = data.data;
            this.productOptions = data.data;
            // console.log("this product",this.productOptions);
            // this.sellProductForm = this.fb.group({
            //     product_id: [], 
            //     sellQuantity:[],
            //     unitSellingPrice:[]

            //   });
    })
}
onProductSelect(event: any) {
    const selectedProductId = event.target.value; 
    console.log("selected id",selectedProductId)
    this.sellProductForm.patchValue({ product_id: parseInt(selectedProductId )}); // Update the value of the form control
  }
  
    sellProduct() {
        if (this.sellProductForm.valid) {
            // console.log("form sell value:->", this.sellProductForm.value)
        }
        const val = this.sellProductForm.value;
        // console.log("form sell value:->",this.sellProductForm.value);
        // return
        this.AddProductService.product_sales(val).subscribe(res => {
            // console.log("res", res);
            let message = res.message
            if (res.status === 'success') {
                this.SnackBarService.openSnackBarSuccess([message])
                this.router.navigate(['/admin/selling']);
            } else {
                this.SnackBarService.openSnackBarError([message])
            }
        })
    }
}