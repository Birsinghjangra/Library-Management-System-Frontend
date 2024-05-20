import { Component, OnInit } from '@angular/core';
import { CommonService } from 'src/app/services/common.service';
import { SnackBarService } from 'src/app/services/snackbar.service';

interface User {
  id: number;
  Bname: string;
  Phone: string;
  createdOn: string;
  isHidden: boolean;
}

@Component({
  selector: 'app-delete-dialog',
  templateUrl: './delete-dialog.component.html',
})
export class DeleteDialogComponent implements OnInit {

  hasData: boolean = false;
  userdata: User[] = [];

  constructor(private commonService: CommonService, private snackBar: SnackBarService) { }

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
    });
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

  // onCancel(): void {
  //   this.dialogRef.close();
  // }

}
