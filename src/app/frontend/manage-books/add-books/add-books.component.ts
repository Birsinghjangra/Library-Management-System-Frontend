import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CommonService } from 'src/app/services/common.service';
import { SnackBarService } from 'src/app/services/snackbar.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-add-books',
  templateUrl: './add-books.component.html',
  styleUrls: ['./add-books.component.css']
})
export class AddBooksComponent implements OnInit {

  bookForm!: FormGroup;
  flag:any;
  Params_ids:any; 
  get_form_data:any;

  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    private CommonService: CommonService,
    private SnackBarService: SnackBarService,
    private router: Router,
    private ActivatedRoute:ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.ActivatedRoute.queryParams.subscribe((params)=>{
      // console.log(params)
      this.Params_ids = params['id']
      this.flag =params['flag']
    })

    this.initializeForm();
    this.get_data()

  }

  initializeForm() {
    this.bookForm = this.fb.group({
      Isbn: ['', [Validators.required, ]],
      Title: ['', [Validators.required, ]],
      publication: ['', [Validators.required, ]],
      price: ['', [Validators.required, ]],
      Eddition: ['', [Validators.required, ]],
      // quantity: ['', [Validators.required,]]
    });
  }

  get_data(){
    if(this.flag=='edit'){
      const value = {
        Table_name:"book",
        id:this.Params_ids
      }
      this.CommonService.getData_common(value).subscribe(data=>{
  
        this.get_form_data = data.data[0]
        this.bookForm.patchValue(this.get_form_data)
        console.log(this.get_form_data)
      })
      // if(this.ids){
      //   this.borrowerForm.patchValue(data.data[0])
      // }
    }
   
  }
  onSubmit() {
    if (this.bookForm.valid) {
      const formData = this.bookForm.value;
      formData['isCheckedOut'] = 0;
      const value = {
        action: 'insert',
        column_data: formData,
        table_name: 'book',
        id: 0
      };
      if (this.Params_ids) {
        value['id'] = this.Params_ids;
        value['action'] = 'update';
      }
      console.log(value);
      this.CommonService.save_data_operation(value).subscribe((data: any) => {
        let message = data.message;
        if (data.status === 'success') {
          this.SnackBarService.openSnackBarSuccess([message]);
          this.router.navigate(['/admin/manage_books']);
        } else {
          this.SnackBarService.openSnackBarError([message]);
        }
      });
    }
  }
}
