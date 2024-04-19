import { Component,OnInit } from '@angular/core';
import { AddProductService } from '../services/add-product.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  productdata: any;
  totalCostPrice: number = 0;
  totalSellingPrice: number = 0;
  totalCategories: number = 0;
  Total_productName:number=0;
  // totalCategories:any=[];
  totalProfit: number = 0;
  Total_sale:any;
  constructor(private AddProductService: AddProductService){}
  ngOnInit(): void {

    this.AddProductService.getProductData().subscribe((data: any) => {
      this.productdata = data.data;
      // this.productdata = this.productdata.data;
      console.log("product data dashboard",this.productdata)
      this.productdata.forEach((product: any) => {
        this.Total_sale= product.Total_sales
        this.totalCostPrice += product.costPrice;
        this.totalSellingPrice += product.sellingPrice;
        let uniqueCategories:any =[];
        let uniqueProducts:any=[];
        this.productdata.forEach((product: any) => {
          uniqueCategories.push(product.category);
          uniqueProducts.push(product.productName)
          let profit = product.unit_sellingPrice - product.CostPerPiece;
          this.totalProfit +=profit
      });
      this.totalCategories = uniqueCategories.length;
      this.Total_productName=uniqueProducts.length
      this.totalProfit=this.totalProfit
      // console.log("Total Unique Categories:", totalUniqueCategories);

        this.totalProfit += (product.sellingPrice - product.costPrice);
        
      });

      // Difference between cost and profit
      const costProfitDiff = this.totalSellingPrice - this.totalCostPrice;
      console.log("Difference between Cost and Profit:", costProfitDiff);
    });
  }
}
