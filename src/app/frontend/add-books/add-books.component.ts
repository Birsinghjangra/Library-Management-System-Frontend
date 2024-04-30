import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-add-books',
  templateUrl: './add-books.component.html',
  styleUrls: ['./add-books.component.css']
})
export class AddBooksComponent implements OnInit {

  bookForm: FormGroup;


  constructor(
    private fb: FormBuilder
  ) {
    this.bookForm = this.fb.group({
      isbn: ['', [Validators.required, Validators.pattern('^[0-9]{10}(?:[0-9]{3})?$')]],
      title: ['', [Validators.required, Validators.pattern('^[a-zA-Z0-9]+$')]],
      publication: ['', [Validators.required, Validators.pattern('^[-.,\w ]+$')]],
      price: ['', [Validators.required, Validators.pattern('^\d{1,5}(\.\d{1,2})?$')]]
    });
   }

  ngOnInit(): void {
    
  }

  onSubmit() {
    console.log(this.bookForm.value);
  }
}
