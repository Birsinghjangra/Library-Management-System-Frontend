import { Component,OnInit } from '@angular/core';
import { CommonService } from 'src/app/services/common.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  total_books: any;
  issueBook_detail: any;
  userdetail: any;
 
  constructor(private commonservice : CommonService){}
  ngOnInit(): void {
    this.bookCount();
    this.issueBook();
    this.userCount();
  }
  bookCount(){
    const payload = {
      Table_name :'book'
    }
    this.commonservice.getData_common(payload).subscribe(data=>{
      this.total_books =data.data.length;
    })
  }
  issueBook(){
    const payload = {
      Table_name :'borrower_book_detail'
    }
    this.commonservice.getData_common(payload).subscribe(data=>{
      this.issueBook_detail =data.data.length;
    })
  }
  userCount(){
    const payload = {
      Table_name :'borrower'
    }
    this.commonservice.getData_common(payload).subscribe(data=>{
      this.userdetail =data.data.length;
    })
  }
}
