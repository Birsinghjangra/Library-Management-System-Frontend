import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { CommonService } from 'src/app/services/common.service';
import { SnackBarService } from 'src/app/services/snackbar.service';
import { SubmitBookDialogComponent } from '../../dialog/submit_book-dialog/submit-book-dialog.component';
import { MatDialog } from '@angular/material/dialog';


@Component({
  selector: 'app-issued-books',
  templateUrl: './issued-books.component.html',
  styleUrls: ['./issued-books.component.css']
})
export class IssuedBooksComponent implements OnInit {

  dataSource: MatTableDataSource<any> = new MatTableDataSource<any>();
  hasData: boolean = false;
  userdata: any = [];
  // isSubmitted: boolean = false;

  displayedColumns = ['id', 'Bname', 'Isbn', 'Title', 'issued_at', 'end_date', 'action'];
  constructor(private commonService: CommonService,
    private router: Router,
    private snackBar: SnackBarService,
    public dialog: MatDialog) { }

  ngOnInit(): void {
    this.loaddata();
  }
  loaddata() {
    const value = {
      Table_name: 'borrower_book_detail'
    };
    this.commonService.getData_common(value).subscribe((data: any) => {
      this.userdata = data.data;
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
      height: '400px',
      data: book
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }
}
