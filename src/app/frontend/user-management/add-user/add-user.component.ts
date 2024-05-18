import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { CommonService } from 'src/app/services/common.service';
import { SnackBarService } from 'src/app/services/snackbar.service';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.css']
})
export class AddUserComponent implements OnInit {

  userForm!: FormGroup;
  Params_ids: any;
  flag: any;

  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    private commonService: CommonService,
    private snackBarService: SnackBarService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.activatedRoute.queryParams.subscribe(params => {
      this.Params_ids = params['id'];
      this.flag = params['flag'];
    });

    this.initializeForm();
    if (this.flag === 'edit') {
      this.getData();
    }
  }

  initializeForm() {
    this.userForm = this.fb.group({
      Bname: ['', [Validators.required, Validators.pattern('^[a-zA-Z ]+$')]],
      Phone: ['', [Validators.required, Validators.pattern('^[0-9]{10}$')]],
      Address: ['', [Validators.required, Validators.pattern('^[-.,a-zA-Z0-9 ]+$')]]
    });
  }

  getData() {
    const value = {
      Table_name: "borrower",
      id: this.Params_ids
    };
    this.commonService.getData_common(value).subscribe(data => {
      this.userForm.patchValue(data.data[0]);
    });
  }

  onSubmit() {
    if (this.userForm.valid) {
      const formData = this.userForm.value;
      const value = {
        action: this.Params_ids ? 'update' : 'insert',
        column_data: formData,
        table_name: "borrower",
        id: this.Params_ids ? this.Params_ids : 0
      };
  
      this.commonService.save_data_operation(value).subscribe((data: any) => {
        const message = data.message;
        if (data.status === 'success') {
          this.snackBarService.openSnackBarSuccess([message]);
          this.router.navigate(['/admin/user_management']);
        } else {
          this.snackBarService.openSnackBarError([message]);
        }
      });
    } else {
      this.validateAllFormFields(this.userForm);
      console.log("Form is not valid");
    }
  }
  
  validateAllFormFields(formGroup: FormGroup) {
    Object.keys(formGroup.controls).forEach(field => {
      const control = formGroup.get(field);
      control?.markAsTouched({ onlySelf: true });
    });
  }
  
}
