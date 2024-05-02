import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { CommonService } from '../../services/common.service';
import { SnackBarService } from '../../services/snackbar.service';
import { ActivatedRoute, Router } from '@angular/router';
import { SelectionModel } from '@angular/cdk/collections';

interface User {
  id: number;
  Bname: string;
  Phone: string;
  createdOn: string;
  isHidden: boolean;
}

@Component({
  selector: 'app-user-management',
  templateUrl: './user-management.component.html',
  styleUrls: ['./user-management.component.css']
})
export class UserManagementComponent implements OnInit {
  dataSource: MatTableDataSource<User> = new MatTableDataSource<User>();
  hasData: boolean = false;
  userdata: User[] = [];
  selection = new SelectionModel<User>(true, []);
  showInactiveUsers: boolean = false;
  displayedColumns = ['id', 'Bname', 'Phone', 'createdOn', 'action'];

  constructor(
    private commonService: CommonService,
    private route: ActivatedRoute,
    private router: Router,
    private snackBar: SnackBarService
  ) {}

  ngOnInit(): void {
    this.loadData();
  }

  loadData(): void {
    const value = {
      Table_name: 'borrower'
    };
    this.commonService.getData_common(value).subscribe((data: any) => {
      this.userdata = data.data.map((item: any) => ({
        id: item.id,
        Bname: item.Bname,
        Phone: item.Phone,
        createdOn: item.createdOn,
        isHidden: localStorage.getItem(`isHidden_${item.id}`) === 'true' || false
      }));
      this.hasData = this.userdata.length > 0;
      this.filterData();
    });
  }

  toggleRowVisibility(index: number): void {
    const rowData = this.dataSource.data[index];
    rowData.isHidden = !rowData.isHidden;
    localStorage.setItem(`isHidden_${rowData.id}`, rowData.isHidden.toString());
    this.filterData();
  }

  editProduct(id: number): void {
    this.router.navigate(['user_management/add_user'], {
      queryParams: { id: id },
    });
  }

  deleteUser(id: string): void {
    const payload = {
      table_name: 'borrower',
      row_ids: id,
      action: 'delete',
    };
    this.commonService.delete_data_operation(payload).subscribe(
      (response) => {
        if (response.status === 'success') {
          const message = response.message;
          this.snackBar.openSnackBarSuccess([message]);
          this.loadData();
        } else {
          this.snackBar.openSnackBarError([response.message]);
        }
      },
      (error) => {
        console.error(error);
      }
    );
  }

  applyFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  toggleShowInactiveUsers(): void {
    this.showInactiveUsers = !this.showInactiveUsers;
    this.filterData();
  }

  filterData(): void {
    if (this.showInactiveUsers) {
      this.dataSource.data = this.userdata.filter(user => user.isHidden);
    } else {
      this.dataSource.data = this.userdata;
    }
  }
}
