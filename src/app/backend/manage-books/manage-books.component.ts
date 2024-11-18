import { SelectionModel } from '@angular/cdk/collections';
import { Component, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort, Sort } from '@angular/material/sort';
import { Router } from '@angular/router';
// import { DeleteDialogComponent } from 'src/app/dialog/delete-dialog/delete-dialog.component';
import { CommonService } from 'src/app/services/common.service';
import { SnackBarService } from 'src/app/services/snackbar.service';
import { DeleteDialogComponent } from '../common/dialog-box/delete-dialog/delete-dialog.component';
import { BarcodeDialogComponent } from '../common/dialog-box/barcode-dialog/barcode-dialog.component';

interface Book {
  book_id: number;
  isbn: string;
  title: string;
  publication: string;
  price: number;
  edition: number;
  author_name: string;
  quantity: number;
  isActive: number;
}

@Component({
  selector: 'app-manage-books',
  templateUrl: './manage-books.component.html',
  styleUrls: ['./manage-books.component.css']
})
export class ManageBooksComponent implements OnInit {

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
  selection = new SelectionModel<any>(true, []);
  @Output() closeDialog = new EventEmitter<void>();
  showInactiveBooks: boolean = false;


  displayedColumns = ['Sno', 'book_id', 'isbn', 'title', 'publication', 'price', 'edition', 'action'];

  constructor(private commonService: CommonService,
    private router: Router,
    private snackBar: SnackBarService,
    public dialog: MatDialog
  ) { }

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
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
      this.paginator.pageIndex = this.mat_currentPage;
      this.isLoading = false;
      this.filterData();

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
    const dialogRef = this.dialog.open(DeleteDialogComponent, {
      width: '350px',
      height: '200px',
      data: { id: id }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        const payload = this.deleteUser(id);
        this.commonService.delete_data_operation(payload).subscribe(
          (response) => {
            if (response.status === 'success') {
              let message = response.message;
              this.snackBar.openSnackBarSuccess([message]);
              this.loaddata();
              this.closeDialog.emit();
            } else {
              this.snackBar.openSnackBarError([response.message]);
            }
          },
          (error) => {
            console.error(error);
          }
        );
      }
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
  onGenerateBarcode(isbn: any) {
    const value = {
      isbn: isbn
    }
    this.commonService.generateBarCode(value).subscribe((response) => {
      if (response.status === 'success') {
        let message = response.message;
        this.snackBar.openSnackBarSuccess([message]);

        this.dialog.open(BarcodeDialogComponent, {
          width: 'auto',
          data: { isbn, barcodeImage: response.barcodeImage }
        });
      } else {
        this.snackBar.openSnackBarError([response.message]);
      }
    },
      (error) => {
        console.error(error);
      })
  }

  // onDownloadBarcode(isbn:any){
  //   const value = {
  //     isbn:isbn
  //   }
  //   this.commonService.download_barcode(value).subscribe((response) => {
  //     if (response.status === 'success') {
  //       let message = response.message;
  //       this.snackBar.openSnackBarSuccess([message]);
  //       // this.loaddata();
  //       // this.closeDialog.emit();
  //     } else {
  //       this.snackBar.openSnackBarError([response.message]);
  //     }
  //   },
  //   (error) => {
  //     console.error(error);
  //   })
  // }
  onDownloadBarcode(isbn: any) {
    const payload = { isbn: isbn }; // Create payload for the request

    this.commonService.download_Barcode(payload).subscribe((response: Blob) => {
      // Create a new Blob object from the response
      const blob = new Blob([response], { type: 'image/png' });
      const downloadUrl = window.URL.createObjectURL(blob);

      // Create an anchor element for downloading
      const a = document.createElement('a');
      a.href = downloadUrl;
      a.download = `${isbn}.png`; // Set the desired file name
      document.body.appendChild(a); // Append anchor to body
      a.click(); // Simulate click to trigger download
      document.body.removeChild(a); // Remove anchor from body

      this.snackBar.openSnackBarSuccess(['Download started!']);
    },
      (error) => {
        console.error(error);
        this.snackBar.openSnackBarError(['Failed to download barcode.']);
      });
  }

  pageChanged(event: PageEvent): void {
    this.pageSize = event.pageSize;
    this.currentPage = event.pageIndex + 1;
    this.mat_currentPage = event.pageIndex;
    this.startIndex = (this.currentPage - 1) * this.pageSize;
  }

  toggleStatus(book_id: string, currentStatus: number): void {
    const newStatus = currentStatus === 1 ? 0 : 1;

    // Create the payload object
    const payload = { book_id: book_id };

    // Call the service with the payload
    this.commonService.toggleStatus(payload).subscribe(
      (response: any) => {
        if (response && response.message) {
          // this.snackBar.openSnackBarError(`User isActive toggled to ${newStatus}`, 'Close', { duration: 3000 });

          // Update the status on the frontend after successful backend update
          const user = this.dataSource.data.find((u: any) => u.book_id === book_id);
          if (user) {
            user.isActive = newStatus;
          }
        }
      },
      (error) => {
        console.error('Error toggling isActive:', error);
        // this.snackBar.openSnackBarError('Failed to toggle isActive. Please try again.', 'Close', { duration: 3000 });
      }
    );
  }
  toggleShowInactiveBooks(): void {
    this.showInactiveBooks = !this.showInactiveBooks;
    this.filterData(); // Apply the filter whenever the status is toggled
  }
  filterData(): void {
    if (this.showInactiveBooks) {
      // Show only inactive books
      this.dataSource.data = this.userdata.filter((book: Book) => book.isActive === 0);
    } else {
      // Show only active books
      this.dataSource.data = this.userdata.filter((book: Book) => book.isActive === 1);
    }
  }
  
}