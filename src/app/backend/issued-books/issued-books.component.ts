import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { Router } from '@angular/router';
import { CommonService } from 'src/app/services/common.service';
import { SnackBarService } from 'src/app/services/snackbar.service';
import { SubmitBookDialogComponent } from '../common/dialog-box/submit_book-dialog/submit-book-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { MatSort } from '@angular/material/sort';


@Component({
  selector: 'app-issued-books',
  templateUrl: './issued-books.component.html',
  styleUrls: ['./issued-books.component.css']
})
export class IssuedBooksComponent implements OnInit {

  dataSource: MatTableDataSource<any> = new MatTableDataSource<any>();
  hasData: boolean = false;
  userdata: any = [];
  isLoading = false;
  totalRows = 0;
  pageSize = 10;
  currentPage = 1;
  mat_currentPage = 0;
  pageSizeOptions: number[] = [10, 25, 100];
  startIndex: number = 0;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort!: MatSort;
  // isSubmitted: boolean = false;

  displayedColumns = ['Sno','srn', 'student_name', 'isbn', 'title', 'remark', 'fine', 'issued_at', 'end_date', 'action'];
  constructor(private commonService: CommonService,
    private router: Router,
    private snackBar: SnackBarService,
    public dialog: MatDialog) { }

  ngOnInit(): void {
    this.loaddata();
    this.dataSource.sort = this.sort;

  }
  loaddata() {
    this.isLoading = true;
    const value = {
      Table_name: 'borrower_book_detail'
    };
    this.commonService.getData_common(value).subscribe((data: any) => {
      this.userdata = data.data.filter((item:any)=> item.isSubmit == 0);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
      this.paginator.pageIndex = this.mat_currentPage;
      this.isLoading = false;
      this.hasData = this.userdata.length > 0;
      this.dataSource.data = this.userdata;
    });
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
  openDialog(book: any): void {
    const dialogRef = this.dialog.open(SubmitBookDialogComponent, {
      width: '600px',
      height: '435px',
      data: book
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }
  pageChanged(event: PageEvent): void {
    this.pageSize = event.pageSize;
    this.currentPage = event.pageIndex + 1;
    this.mat_currentPage = event.pageIndex;
    this.startIndex = (this.currentPage - 1) * this.pageSize;
  }

}
