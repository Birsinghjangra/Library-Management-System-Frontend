import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, RouterLink,ActivatedRoute } from '@angular/router';
import { CommonService } from 'src/app/services/common.service';
import { SnackBarService } from 'src/app/services/snackbar.service';
import { environment } from 'src/environment';



@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.css']
})
export class AddUserComponent implements OnInit {

  userForm!: FormGroup;
  Params_ids:any;
  get_form_data:any
  flag:any

  constructor(private fb: FormBuilder,
    private http: HttpClient,
    private CommonService: CommonService,
    private SnackBarService: SnackBarService,
    private router: Router,
    private ActivatedRoute:ActivatedRoute) { }
  ngOnInit(): void {
    this.ActivatedRoute.queryParams.subscribe((params)=>{
      // console.log(params)
      this.Params_ids = params['id']
      this.flag =params['flag']
      console.log(this.flag)
    })

    this.initializeForm()
    this.get_data()
  }

  initializeForm() {
    this.userForm = this.fb.group({
      Bname: ['', [Validators.required, Validators.pattern('^[a-zA-Z ]+$')]], // Only alphabets and spaces allowed
      Phone: ['', [Validators.required, Validators.pattern('^[0-9]{10}$')]], // 10-digit number validation
      Address: ['', [Validators.required, Validators.pattern('^[-.,a-zA-Z0-9 ]+$')]] // Only specified characters allowed
    });
  }
  get_data(){
    if(this.flag=='edit'){
      const value = {
        Table_name:"borrower",
        id:this.Params_ids
      }
      this.CommonService.getData_common(value).subscribe(data=>{
  
        this.get_form_data = data.data[0]
        this.userForm.patchValue(this.get_form_data)
        // console.log(this.get_form_data)
      })
      // if(this.ids){
      //   this.borrowerForm.patchValue(data.data[0])
      // }
    }
   
  }

  onSubmit() {
    if (this.userForm.valid) { // Check if the form is valid
      const formData = this.userForm.value;
      const value = {
        action: "insert",
        column_data: formData,
        table_name: "borrower",
        id: 0
      };
      if (this.Params_ids) {
        value['id'] = this.Params_ids;
        value['action'] = 'update';
      }
      
      this.CommonService.save_data_operation(value).subscribe((data: any) => {
        let message = data.message;
        if (data.status === 'success') {
          this.SnackBarService.openSnackBarSuccess([message]);
          this.router.navigate(['/admin/user_management']);
        } else {
          this.SnackBarService.openSnackBarError([message]);
        }
      });
    } else {
      // Form is not valid, display error message or handle accordingly
      console.log("Form is not valid");
    }
  }
  
  
}
