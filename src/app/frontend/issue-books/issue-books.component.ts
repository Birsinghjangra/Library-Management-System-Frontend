import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonService } from '../../services/common.service';
import { formatDate } from '@angular/common';

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
    this.setInitialIssueDate();
  }

  setInitialIssueDate(): void {
    const today = new Date();
    this.issueDate = formatDate(today, 'yyyy-MM-dd', 'en');
    this.onIssueDateChange({ target: { value: this.issueDate } });
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

  onIssueDateChange(event: any): void {
    const issueDate = new Date(event.target.value);
    const returnDate = new Date(issueDate);
    returnDate.setDate(issueDate.getDate() + 7);

    this.issueDate = formatDate(issueDate, 'yyyy-MM-dd', 'en');
    this.returnDate = formatDate(returnDate, 'yyyy-MM-dd', 'en');
  }

  issueBook(): void {
    if (!this.userData || !this.bookData) {
      alert('Please select both a user and a book.');
      return;
    }

    const payload = {
      userId: this.userData.id,
      isbn: this.bookData.Isbn,
      issueDate: this.issueDate,
      returnDate: this.returnDate,
      remark: this.remark
    };

    console.log('Issue Book Payload:', payload);

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
