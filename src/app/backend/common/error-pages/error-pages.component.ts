import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-error-pages',
  templateUrl: './error-pages.component.html',
  styleUrls: ['./error-pages.component.css']
})
export class ErrorPagesComponent implements OnInit {
  key: any
  constructor() { }

  ngOnInit() {
    this.key = localStorage.getItem('currentUser')
    console.log(this.key);
  }
}
