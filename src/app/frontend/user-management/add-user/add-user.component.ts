import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
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
export class AddUserComponent {

  userForm: FormGroup;

  constructor(private fb: FormBuilder, 
    private http: HttpClient,
    private CommonService: CommonService,
    private SnackBarService: SnackBarService,
    private router: Router) {
    this.userForm = this.fb.group({
      Bname: ['', Validators.required],
      Phone: ['', Validators.required],
      Address: ['', Validators.required]
    });
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
          this.router.navigate(['/admin/user-management']);
      } else {
          this.SnackBarService.openSnackBarError([message])
      }
    })
    // if (this.userForm.valid) {
    // Make API call to /createuser
    // this.http.post(`${environment.apiUrl}/db_operation`, value).subscribe(
    //   (response) => {
    //     // Handle success
    //     console.log('User created successfully:', response);

    //     // Reset form
    //     this.userForm.reset();
    //   },
    //   (error) => {
    //     // Handle error
    //     console.error('Error creating user:', error);
    //   }
    // );
    // } 
    //  {
    //   // Handle form validation errors
    //   console.error('Form is invalid');
    // }


  }

}
