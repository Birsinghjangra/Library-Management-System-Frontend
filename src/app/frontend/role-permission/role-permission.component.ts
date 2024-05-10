// role-permission.component.ts
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-role-permission',
  templateUrl: './role-permission.component.html',
  styleUrls: ['./role-permission.component.css']
})
export class RolePermissionComponent implements OnInit {

  public searchInput: string = '';
  public searchResult: Array<any> = [];
  public toggle: boolean = false;
  public userData: any = {};
  public seriesList: Array<any> = [

    {
      id: 1,
      Bname: 'nilesh',
      Phone: '1234567890',
      Address: '123 Main St, Anytown, USA',
    },
    {
      id: 2,
      Bname: 'bir',
      Phone: '9876543210',
      Address: '456 Market St, Anytown, USA',
    },
    {
      id: 3,
      Bname: 'dev',
      Phone: '1234567890',
      Address: '789 Elm St, Anytown, USA',
    },
    {
      id: 4,
      Bname: 'prashant',
      Phone: '1234567890',
      Address: '789 Elm St, Anytown, USA',
    },
    {
      id: 5,
      Bname: 'bir',
      Phone: '9876543210',
      Address: '456 Market St, Anytown, USA',
    },
    {
      id: 6,
      Bname: 'dev',
      Phone: '1234567890',
      Address: '789 Elm St, Anytown, USA',
    },
    {
      id: 7,
      Bname: 'prashant',
      Phone: '1234567890',
      Address: '789 Elm St, Anytown, USA',
    }

    //Truncated for brevity
  ];



  ngOnInit(): void {
  }

  fetchUser(value: string): void {
    if (value === '') {
      this.searchResult = [];
      return;
    }
    this.searchResult = this.seriesList.filter((series) =>
      series.Bname.toLowerCase().includes(value.toLowerCase()) || 
      series.id.toString().includes(value.toLowerCase())
    );
    this.toggle = false;
  }
  

  showDetails(series: any): void {
    this.userData = series;
    this.toggle = true;
    this.searchInput = series.Bname;
  }
}
