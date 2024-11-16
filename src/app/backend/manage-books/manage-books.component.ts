import { SelectionModel } from '@angular/cdk/collections';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
// import { DeleteDialogComponent } from 'src/app/dialog/delete-dialog/delete-dialog.component';
import { CommonService } from 'src/app/services/common.service';
import { SnackBarService } from 'src/app/services/snackbar.service';
import { DeleteDialogComponent } from '../common/dialog-box/delete-dialog/delete-dialog.component';
import { BarcodeDialogComponent } from '../common/dialog-box/barcode-dialog/barcode-dialog.component';

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
  @Output() closeDialog = new EventEmitter<void>();

  displayedColumns = ['Sno','book_id', 'isbn', 'title', 'publication', 'price', 'edition', 'action'];

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
  onGenerateBarcode(isbn:any){
    const value = {
      isbn:isbn
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
}
