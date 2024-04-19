import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { AddProductService } from '../services/add-product.service';
import { SnackBarService } from '../services/snackbar.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-selling',
  templateUrl: './selling.component.html',
  styleUrls: ['./selling.component.css']
})
export class SellingComponent implements OnInit {
  productdata: any;
  dataSource!: MatTableDataSource<any>;
  displayedColumns: string[] = [
    'Sno',
    'category',
    'productName',
    'costPrice',
    // 'sellingPrice',
    'quantity',
    'CostPerPiece',
    'remaining_stock',
    'manufacturingDate',
    'expiryDate',
    'actions',
  ];

  pageSize = 10;
  pageSizeOptions = [10, 25, 100];
  length = 100;
  hasData: boolean = false;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort!: MatSort;
 constructor(private AddProductService:AddProductService,
  private snackBar:SnackBarService,
  private router:Router){}
  ngOnInit(): void {
    // throw new Error('Method not implemented.');
    this.loaddata()
  }

  loaddata() {
    this.AddProductService.getProductData().subscribe((data: any) => {
      // this.productdata = data['data'][0];
      this.productdata = data.data;
      console.log("this product",this.productdata);
      this.hasData = this.productdata.length > 0;
      // this.productdata = this.productdata.data;
      this.dataSource = new MatTableDataSource(this.productdata);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }
  editProduct(id: number) {
    this.router.navigate(['/selling/add'], {
      queryParams: { id: id },
    });
  }
  dataProcessingDeletes(id: number) {
    return {
      table_name: 'products',
      row_ids: id,
      action: 'delete',
    };
  }
  delete(id: number) {
    const payload = this.dataProcessingDeletes(id);
    // console.log(payload);
    this.AddProductService.deleteProduct(payload).subscribe(
      (response) => {
        if (response.status === 'success') {
          let message = response.message;
          this.snackBar.openSnackBarSuccess([message]);
          this.loaddata();
        } else {
          this.snackBar.openSnackBarError([response.message]);
        }
      },
      (error) => {
        console.error(error);
      }
    );
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }



}
