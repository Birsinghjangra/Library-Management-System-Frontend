// export class SubmitBookComponent implements OnInit {
//     Params_ids: any;
//     Isbn: any;
//     details: any;
//     submitFine: boolean =false;
//     submitBook: boolean =false;
//     constructor(  private ActivatedRoute:ActivatedRoute,
//         private CommonService: CommonService,
//         private SnackBarService: SnackBarService,
//         private router: Router,
//     ){

//     }

//     ngOnInit(): void {
//         this.ActivatedRoute.queryParams.subscribe((params)=>{
//             // console.log(params)
//             this.Params_ids = params['id']
//             this.Isbn =params['isbn']
//           })
//           this.calculate_fine()


//     }
//     calculate_fine(){
//         const payload ={
//             id:this.Params_ids,
//             Isbn:this.Isbn
//           }
//         this.CommonService.calculate_fine(payload).subscribe(res=>{
//             console.log(res.data)
//             this.details = res.data;
//             this.submitFine = true
//             if(this.details['calculate_fine']>0){
//                 this.submitBook = true

//             }
//           })
//     }
//     submit_fine(){
//         const payload ={
//             id:this.Params_ids,
//             Isbn:this.Isbn
//           }
//           this.CommonService.submit_fine(payload).subscribe(data=>{
//             let message = data.message
//             if(data.status==='success'){
//                 this.SnackBarService.openSnackBarSuccess([message]);
//                 // this.calculate_fine()
//                  this.router.navigate(['/admin/issued_books']);
//                 // this.ngOnInit()
//                 // this.router.navigate(['/admin/issued_books']);
//             }else{
//                 this.SnackBarService.openSnackBarError([message]);
//             }

//           })
//     }
// }
import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { CommonService } from 'src/app/services/common.service';
import { SnackBarService } from 'src/app/services/snackbar.service';

@Component({
  selector: 'app-submit-book',
  templateUrl: './submit-book-dialog.component.html',
})
export class SubmitBookDialogComponent implements OnInit {
  userdata: any;
  isbn: any;
  current_book_fine: any;
  totalFine: any;
  selectedCondition: string = ''; // Variable to store the selected condition

  constructor(
    private CommonService: CommonService,
    private SnackBarService: SnackBarService,
    private router: Router,
    public dialogRef: MatDialogRef<SubmitBookDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { this.userdata = data; }

  ngOnInit(): void {
    console.log("user data", this.userdata);
    this.isbn = this.userdata['isbn'];
    this.showfines();
  }

  showfines() {
    const payload = this.userdata;
    this.CommonService.calculate_fine(payload).subscribe(data => {
      console.log(data.data);
      this.current_book_fine = data.data['currentBook_fine'];
      this.totalFine = parseFloat(data.data['total_fine']);
      console.log(this.totalFine, this.current_book_fine);
    });
  }

  onConditionChange(event: any): void {
    const selectedValue = event.target.value; // Directly access the value
    this.selectedCondition = selectedValue;
    console.log('Selected Condition:', this.selectedCondition);
  }

  submit_book() {
    // // Submit book only if selected condition is valid
    // if (this.selectedCondition && this.selectedCondition !== 'book condition') {
    //   this.toggleStatus(this.userdata.book_id, this.selectedCondition); // Pass selected condition to toggle status
    // }

    const payload = this.userdata;
    if (this.selectedCondition == "damaged" || this.selectedCondition == "tear") {
      payload["isDamage"] = 1
    }
    else if (this.selectedCondition == "lost") {
      payload["isLost"] = 1
    }
    this.CommonService.submitbook(payload).subscribe(data => {
      let message = data.message;
      if (data.status === 'success') {
        this.SnackBarService.openSnackBarSuccess([message]);
        this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
          this.router.navigate(['/admin/issued_books']);
        });
      }
    });
    this.dialogRef.close();
  }

  // toggleStatus(book_id: string, selectedCondition: string): void {
  //   if (selectedCondition && selectedCondition !== 'book condition') {
  //     const payload = { book_id: book_id, status: selectedCondition };

  //     // Call the API to toggle the status
  //     this.CommonService.toggleStatus(payload).subscribe(
  //       (response: any) => {
  //         if (response && response.message) {
  //           this.SnackBarService.openSnackBarSuccess([response.message]);
  //         }
  //       },
  //       (error) => {
  //         console.error('Error toggling status:', error);
  //         // this.SnackBarService.openSnackBarError('Failed to update book condition. Please try again.', 'Close', { duration: 3000 });
  //       }
  //     );
  //   }
  // }

  onCancel(): void {
    this.dialogRef.close();
  }
}
