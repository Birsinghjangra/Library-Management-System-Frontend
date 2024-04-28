import { Component } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { CommonService } from '../../services/common.service';
import { SnackBarService } from '../../services/snackbar.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-management',
  templateUrl: './user-management.component.html',
  styleUrls: ['./user-management.component.css']
})
export class UserManagementComponent {

  dataSource!: MatTableDataSource<any>;
  hasData: boolean = false;
  userdata: any = [];

  displayedColumns = ['checkbox', 'id', 'Bname', 'createdOn', 'action'];

  constructor(private CommonService: CommonService,
             private router: Router,
             private snackBar: SnackBarService
  ) { }

  ngOnInit(): void {
    this.loaddata();
  }
  loaddata() {
    const value = {
      Table_name:'borrower'
    }
    this.CommonService.getData_common(value).subscribe((data: any) => {
      this.userdata = data.data;

      console.log("this product",this.userdata);
      this.hasData = this.userdata.length > 0;
      // this.productdata = this.productdata.data;
      this.dataSource = new MatTableDataSource(this.userdata);
      // this.dataSource.paginator = this.paginator;
      // this.dataSource.sort = this.sort;
    });
  } 

}
