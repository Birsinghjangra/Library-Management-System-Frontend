import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CommonService } from 'src/app/services/common.service';
import { SnackBarService } from 'src/app/services/snackbar.service';
import { ActivatedRoute } from '@angular/router';
import { capitalizeWordsValidator } from 'src/app/validators/capitalize.validator';
import { capitalizeFirstLetterValidator } from 'src/app/validators/capitalize-first-letter.validator';
import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';
import { query } from '@angular/animations';

@Component({
  selector: 'app-add-books',
  templateUrl: './add-books.component.html',
  styleUrls: ['./add-books.component.css']
})
export class AddBooksComponent implements OnInit {

  bookForm!: FormGroup;
  flag: any;
  Params_ids: any;
  get_form_data: any;

  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    private commonService: CommonService,
    private snackBarService: SnackBarService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.activatedRoute.queryParams.subscribe((params) => {
      this.Params_ids = params['id'];
      this.flag = params['flag'];
    });

    this.initializeForm();
    this.get_data();
  }

  initializeForm() {
    this.bookForm = this.fb.group({
      // book_id: ['', [Validators.required]], 
      isbn: ['', [Validators.required, this.isbnLengthValidator()]],
      title: ['', [Validators.required, capitalizeFirstLetterValidator()]],
      publication: ['', [Validators.required, capitalizeWordsValidator()]],
      author_name: ['', [Validators.required, capitalizeWordsValidator()]],
      price: ['', [Validators.required, Validators.min(0)]],
      edition: ['', [Validators.required]],
      quantity: [this.flag === 'create' ? '' : null, this.flag === 'create' ? [Validators.required] : []]
    });
  }

  isbnLengthValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const value = control.value?.replace(/\D/g, '') || ''; // Remove non-numeric characters
      return (value.length >= 10 && value.length <= 13) ? null : { invalidIsbn: true };
    };
  }
  onIsbnInput(event: Event): void {
    const input = event.target as HTMLInputElement;
    let value = input.value.replace(/\D/g, ''); // Remove non-numeric characters

    // Limit input length to a maximum of 13 characters
    if (value.length > 13) {
      value = value.slice(0, 13);
    }

    input.value = value;
    this.bookForm.get('isbn')?.setValue(value, { emitEvent: false });
  }

  get_data() {
    if (this.flag === 'edit') {
      const value = {
        query: `select * from book where book_id = ${this.Params_ids}`
      };
      this.commonService.generatereport(value).subscribe(data => {
        this.get_form_data = data.data[0];

        // Patch the form data
        this.bookForm.patchValue(this.get_form_data);

        // Disable the quantity field in edit mode
        this.bookForm.get('quantity')?.disable();
      });
    }
  }


  onSubmit() {
    if (this.bookForm.invalid) {
      this.bookForm.markAllAsTouched(); // Mark all controls as touched to trigger validation messages
      return;
    }

    const formData = this.bookForm.value;
    formData['isCheckedOut'] = 0; // Default value for isCheckedOut
    const value = {
      action: this.Params_ids ? 'update' : 'insert',
      column_data: formData,
      table_name: 'book',
      id: this.Params_ids || 0
    };

    this.commonService.save_data_operation(value).subscribe((data: any) => {
      const message = data.message;
      if (data.status === 'success') {
        this.snackBarService.openSnackBarSuccess([message]);
        this.router.navigate(['/admin/manage_books']);
      } else {
        console.log("error", data.message);
        let errorMessage = "Something went wrong";
        this.snackBarService.openSnackBarSuccess([errorMessage]);
        this.snackBarService.openSnackBarError([errorMessage]);
      }
    });
  }
}
