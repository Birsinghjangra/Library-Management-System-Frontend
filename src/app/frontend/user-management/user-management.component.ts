import { Component, OnInit } from '@angular/core';
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
export class UserManagementComponent implements OnInit {

  dataSource: MatTableDataSource<any> = new MatTableDataSource<any>();
  hasData: boolean = false;
  userdata: any = [];
  selection = new SelectionModel<any>(true, []);

  displayedColumns = ['checkbox', 'id', 'Bname', 'Phone', 'createdOn', 'action'];

  constructor(private commonService: CommonService,
              private router: Router,
              private snackBar: SnackBarService) { }

  ngOnInit(): void {
    this.loaddata();
  }

  loaddata() {
    const value = {
      Table_name: 'borrower'
    };
    this.commonService.getData_common(value).subscribe((data: any) => {
      this.userdata = data.data;
      console.log("this product", this.userdata);
      this.hasData = this.userdata.length > 0;
      this.dataSource.data = this.userdata;
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

  deleteUser(id: string) {
    return {
      table_name: 'borrower',
      row_ids: id,
      action: 'delete',
    };
  }

  delete(id: string) {
    const payload = this.deleteUser(id);
    this.commonService.delete_data_operation(payload).subscribe(
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

  delete1() {
    const selectedRows = this.selection.selected.map(row => row.id); 
    if (selectedRows.length === 0) {
      return;
    }
    const payload = selectedRows.map(id => this.deleteUser(id));
    this.commonService.delete_data_operation(payload).subscribe(
      (response) => {
        if (response.status === 'success') {
          let message = response.message;
          this.snackBar.openSnackBarSuccess([message]);
          this.loaddata(); 
          this.selection.clear(); 
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
