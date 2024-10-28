import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-barcode-dialog',
  templateUrl: './barcode-dialog.component.html',
  styleUrls: ['./barcode-dialog.component.css']
})
export class BarcodeDialogComponent implements OnInit {
  isbn: string;

  constructor(@Inject(MAT_DIALOG_DATA) public data: any) {
    this.isbn = data.isbn;
  }

  ngOnInit(): void {
    // You can add barcode generation logic here if required
  }
}
