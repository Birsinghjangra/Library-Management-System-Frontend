import { Component } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { CommonService } from '../../services/common.service';
import { SnackBarService } from '../../services/snackbar.service';
import { Router } from '@angular/router';
import { SelectionModel } from '@angular/cdk/collections';

@Component({
  selector: 'app-user-management',
  templateUrl: './user-management.component.html',
  styleUrls: ['./user-management.component.css']
})
export class UserManagementComponent {

  dataSource!: MatTableDataSource<any>;
  hasData: boolean = false;
  userdata: any = [];
  selection = new SelectionModel<any>(true, []);


  displayedColumns = ['checkbox', 'id', 'Bname','Phone', 'createdOn', 'action'];

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

  masterToggle() {
    this.isAllSelected() ?
      this.selection.clear() :
      this.dataSource.data.forEach(row => this.selection.select(row));
  }

  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }

  deleteUser(id: number) {
    return {
      table_name: 'borrower',
      row_ids: id,
      action: 'delete',
    };
  }
  delete(id: number) {
    const payload = this.deleteUser(id);
    // console.log(payload);
    this.CommonService.delete_data_operation(payload).subscribe(
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

}
