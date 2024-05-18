import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonService } from '../../services/common.service';

@Component({
  selector: 'app-issue-books',
  templateUrl: './issue-books.component.html',
  styleUrls: ['./issue-books.component.css']
})
export class IssueBooksComponent implements OnInit {
  searchUserInput: string = '';
  searchUserResult: Array<any> = [];
  userData: any = null;
  bookData: any = null;
  searchBookInput: string = '';
  searchBookResult: Array<any> = [];
  issueDate: string = '';
  returnDate: string = '';
  remark: string = '';

  constructor(private http: HttpClient, private commonService: CommonService) { }

  ngOnInit(): void {
    this.searchUserData('');
    this.searchBookData('');
  }

  searchUserData(id: string): void {
    const payload = {
      Table_name: 'borrower',
      id: id
    };
    this.commonService.search_user(payload).subscribe(
      (response) => {
        if (response && response.data) {
          this.searchUserResult = response.data;
        } else {
          console.error("Response data is missing or invalid:", response);
        }
      },
      (error) => {
        console.error('Error occurred while fetching user data:', error);
      }
    );
  }

  showUserDetails(user: any): void {
    this.userData = user;
    if (user) {
      this.searchUserInput = user.Bname;
    }
  }

  searchBookData(title: string): void {
    const payload = {
      Table_name: 'book',
      title: title
    };
    this.commonService.search_book(payload).subscribe(
      (response) => {
        if (response && response.data) {
          this.searchBookResult = response.data;
        } else {
          console.error("Response data is missing or invalid:", response);
        }
      },
      (error) => {
        console.error('Error occurred while fetching book data:', error);
      }
    );
  }

  showBookDetails(book: any): void {
    this.bookData = book;
    if (book) {
      this.searchBookInput = book.Title;
    }
  }

  issueBook(): void {
    const payload = {
      userId: this.userData.id,
      bookId: this.bookData.id,
      issueDate: this.issueDate,
      returnDate: this.returnDate,
      remark: this.remark
    };

    // this.commonService.issue_book(payload).subscribe(
    //   (response) => {
    //     if (response && response.success) {
    //       alert('Book issued successfully');
    //     } else {
    //       alert('Failed to issue book');
    //     }
    //   },
    //   (error) => {
    //     console.error('Error occurred while issuing book:', error);
    //   }
    // );
  }
}
