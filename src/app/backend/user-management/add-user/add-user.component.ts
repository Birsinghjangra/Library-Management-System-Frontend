import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { CommonService } from 'src/app/services/common.service';
import { SnackBarService } from 'src/app/services/snackbar.service';
import { capitalizeWordsValidator } from 'src/app/validators/capitalize.validator';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.css']
})
export class AddUserComponent implements OnInit {

  userForm!: FormGroup;
  Params_ids: any;
  flag: any;
  classList: string[] = ['3', '4', '5', '6', '7', '8', '9', '10', '11', '12'];
  sectionList: string[] = ['A', 'B', 'C'];

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
      this.Params_ids = params['srn']; // Capture 'srn' instead of 'id'
      this.flag = params['flag'];
    });
  
    this.initializeForm();
    if (this.flag === 'edit') {
      this.getData();
    }
  }
  

  initializeForm() {
    this.userForm = this.fb.group({
      srn: ['', Validators.required],
      student_name: ['', [Validators.required, Validators.pattern('^[a-zA-Z ]+$'), Validators.minLength(3), capitalizeWordsValidator()]],
      class: ['', Validators.required],
      section: ['', Validators.required],
      roll_no: ['', Validators.required],
      phone: ['', [Validators.required, Validators.pattern('^[0-9]{10}$')]],
      address: ['', [Validators.required, Validators.pattern('^[-.,a-zA-Z0-9 ]+$')]]
    });
  }

  getData() {
    const value = {
      Table_name: "student",
      srn: this.Params_ids // Use srn instead of id
    };
    this.commonService.getData_common(value).subscribe(data => {
      this.userForm.patchValue(data.data[0]);
    });
  }
  
  onPhoneInput(event: Event): void {
    const input = event.target as HTMLInputElement;
    let value = input.value;
    
    if (value.length > 10) {
      value = value.slice(0, 10);
      input.value = value;
    }
    
    this.userForm.get('phone')?.setValue(value, { emitEvent: false });
  }

  onSubmit() {
    if (this.userForm.valid) {
      const formData = this.userForm.value;
      const isUpdateAction = !!this.Params_ids; // Check if srn is set for update
  
      const value = {
        action: isUpdateAction ? 'update' : 'insert',
        column_data: formData,
        table_name: "student",
        srn: isUpdateAction ? this.Params_ids : 0 // Pass srn instead of id
      };
  
      console.log("Action:", value.action); // Log the action for debugging
  
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
