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
  toggle: boolean = false;
  userData: any = {};
  searchBookInput: string = '';
  searchBookResult: Array<any> = [];

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
    //   this.commonService.search_user(id).subscribe(
    //     (response) => {
    //       console.log("Response from search_user:", response);
    //       if (response && response.data) {
    //         this.searchResult = response.data;
    //       } else {
    //         console.error("Response data is missing or invalid:", response);
    //       }
    //     },
    //     (error) => {
    //       console.error('Error occurred while fetching user data:', error);
    //     }
    //   );
    // }


    this.http.post<any>('http://127.0.0.1:5000/searchUser', payload).subscribe(
      (response) => {
        console.log(response);
        this.searchUserResult = response.data;
      },
      (error) => {
        console.error('Error occurred while fetching user data:', error);
      }
    );
  }

  showUserDetails(users: any): void {
    this.userData = users;
    this.toggle = true;
    this.searchUserInput = users.Bname;
  }

  searchBookData(title: string): void {
    const payload = {
      Table_name: 'book',
      title: title
    };
    //   this.commonService.search_book(id).subscribe(
    //     (response) => {
    //       console.log("Response from search_book:", response);
    //       if (response && response.data) {
    //         this.searchBookResult = response.data;
    //       } else {
    //         console.error("Response data is missing or invalid:", response);
    //       }
    //     },
    //     (error) => {
    //       console.error('Error occurred while fetching user data:', error);
    //     }
    //   );
    // }

    this.http.post<any>('http://127.0.0.1:5000/searchBook', payload).subscribe(
      (response) => {
        console.log(response);
        this.searchBookResult = response.data; 
      },
      (error) => {
        console.error('Error occurred while fetching user data:', error);
      }
    );
  }

  showBookDetails(users: any): void {
    this.userData = users;
    this.toggle = true;
    this.searchBookInput = users.title;
  }
}
