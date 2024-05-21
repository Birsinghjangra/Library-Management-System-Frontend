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

  constructor(
    private CommonService: CommonService,
    private SnackBarService: SnackBarService,
    private router: Router,
    public dialogRef: MatDialogRef<SubmitBookDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { this.userdata = data; }

  ngOnInit(): void {
    this.isbn = this.userdata['isbn'];
  }

  submit_book() {
    const payload = {
      isbn: this.isbn
    }
    this.CommonService.submit_book(payload).subscribe(data => {
      let message = data.message
      if (data.status === 'success') {
        this.SnackBarService.openSnackBarSuccess([message]);
        this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
          this.router.navigate(['/admin/issued_books']);
        });
      }
    })
    this.dialogRef.close();
  }

  onCancel(): void {
    this.dialogRef.close();
  }
}
