import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { CommonService } from 'src/app/services/common.service';
import { SnackBarService } from 'src/app/services/snackbar.service';
import { environment } from 'src/environment';



@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.css']
})
export class AddUserComponent implements OnInit {

  userForm: FormGroup;

  constructor(private fb: FormBuilder,
    private http: HttpClient,
    private CommonService: CommonService,
    private SnackBarService: SnackBarService,
    private router: Router) {
    this.userForm = this.fb.group({
      Bname: ['', [Validators.required, Validators.pattern('^[a-zA-Z ]+$')]], // Only alphabets and spaces allowed
      Phone: ['', [Validators.required, Validators.pattern('^[0-9]{10}$')]], // 10-digit number validation
      Address: ['', [Validators.required, Validators.pattern('^[-.,a-zA-Z0-9 ]+$')]] // Only specified characters allowed
    });
  }
  ngOnInit(): void {
  }

  onSubmit() {
    const formData = this.userForm.value;
    // console.log(formData)
    const value = {
      action: "insert",
      column_data: this.userForm.value,
      table_name: "borrower"
    }

    this.CommonService.save_data_operation(value).subscribe((data: any) => {
      console.log(data)
      let message = data.message
      if (data.status === 'success') {
        this.SnackBarService.openSnackBarSuccess([message])
        this.router.navigate(['/admin/user_management']);
      } else {
        this.SnackBarService.openSnackBarError([message])
      }
    })
  }
  
}
