import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';

@Component({
  selector: 'app-role-permission',
  templateUrl: './role-permission.component.html',
  styleUrls: ['./role-permission.component.css']
})
export class RolePermissionComponent implements OnInit {
  users = [
    { id: 1, Bname: 'nilesh', Phone: '1234567890', Address: '123 Main St, Anytown, USA' },
    { id: 2, Bname: 'bir', Phone: '9876543210', Address: '456 Market St, Anytown, USA' },
    // Add more users as needed
  ];

  searchInput: any = '';
  searchResult: Array<any> = [];
  toggle: boolean = false;
  userData: any = null;

  constructor() {}

  ngOnInit(): void {
    // Initialize search results to show all users initially
    this.searchResult = this.users;
  }

  fetchUser(value: string): void {
    if (value === '') {
      this.searchResult = this.users;
    } else {
      this.searchResult = this.users.filter((user) =>
        user.Bname.toLowerCase().includes(value.toLowerCase()) ||
        user.id.toString().includes(value.toLowerCase())
      );
    }
    this.toggle = false;
  }

  showDetails(user: any): void {
    this.userData = user;
    this.toggle = true;
    this.searchInput = user ? user.Bname : '';
  }
}
