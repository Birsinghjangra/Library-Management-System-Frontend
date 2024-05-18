import { SelectionModel } from '@angular/cdk/collections';
import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { CommonService } from 'src/app/services/common.service';
import { SnackBarService } from 'src/app/services/snackbar.service';

@Component({
  selector: 'app-manage-books',
  templateUrl: './manage-books.component.html',
  styleUrls: ['./manage-books.component.css']
})
export class ManageBooksComponent implements OnInit {

  dataSource: MatTableDataSource<any> = new MatTableDataSource<any>();
  hasData: boolean = false;
  userdata: any = [];
  selection = new SelectionModel<any>(true, []);

  displayedColumns = ['isbn', 'title', 'publication', 'price', 'eddition', 'action'];

  constructor(private commonService: CommonService,
              private router: Router,
              private snackBar: SnackBarService) { }

  ngOnInit(): void {
    this.loaddata();
  }

  loaddata() {
    const value = {
      Table_name: 'book'
    };
    this.commonService.getData_common(value).subscribe((data: any) => {
      this.userdata = data.data;
      console.log("this book", this.userdata);
      this.hasData = this.userdata.length > 0;
      this.dataSource.data = this.userdata;
    });
  }

  deleteUser(id: string) {
    return {
      table_name: 'book',
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

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

}
