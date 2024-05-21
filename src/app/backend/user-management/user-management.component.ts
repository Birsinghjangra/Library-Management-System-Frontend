import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { CommonService } from '../../services/common.service';
import { SnackBarService } from '../../services/snackbar.service';
import { Router } from '@angular/router';
import { DeleteDialogComponent } from 'src/app/dialog/delete-dialog/delete-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { PaginationService } from 'src/app/services/pagination.service';

interface User {
  id: number;
  borrower_name: string;
  phone: string;
  createdOn: string;
  isHidden: boolean;
}

@Component({
  selector: 'app-user-management',
  templateUrl: './user-management.component.html',
  styleUrls: ['./user-management.component.css']
})
export class UserManagementComponent implements OnInit {

  dataSource: MatTableDataSource<any> = new MatTableDataSource<any>();
  hasData: boolean = false;
  userdata: User[] = [];
  showInactiveUsers: boolean = false;
  @Output() closeDialog = new EventEmitter<void>();
  currentPage: number = 1;
  pageSize: number = 10;
  totalItems: number = 0;
  totalPages: number = 0;

  displayedColumns = ['id', 'borrower_name', 'phone', 'createdOn', 'action'];

  constructor(private commonService: CommonService,
    private router: Router,
    private snackBar: SnackBarService,
    public dialog: MatDialog,
    private paginationService: PaginationService
  ) { }

  ngOnInit(): void {
    this.loaddata();
    this.paginateData();

  }

  loaddata() {
    const value = {
      Table_name: 'borrower'
    };
    this.commonService.getData_common(value).subscribe((data: any) => {
      this.userdata = data.data;
      console.log("this product", this.userdata);
      this.hasData = this.userdata.length > 0;
      this.dataSource.data = this.userdata;
    });
  }

  deleteUser(id: string) {
    return {
      table_name: 'borrower',
      row_ids: id,
      action: 'delete',
    };
  }
  delete(id: string) {
    const dialogRef = this.dialog.open(DeleteDialogComponent, {
      width: '350px',
      height: '200px',
      data: { id: id }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        const payload = this.deleteUser(id);
        this.commonService.delete_data_operation(payload).subscribe(
          (response) => {
            if (response.status === 'success') {
              let message = response.message;
              this.snackBar.openSnackBarSuccess([message]);
              this.loaddata();
              this.closeDialog.emit();
            } else {
              this.snackBar.openSnackBarError([response.message]);
            }
          },
          (error) => {
            console.error(error);
          }
        );
      }
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  toggleRowVisibility(index: number): void {
    const rowData = this.dataSource.data[index];
    rowData.isHidden = !rowData.isHidden;
    localStorage.setItem(`isHidden_${rowData.id}`, rowData.isHidden.toString());
    this.filterData();
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

  paginateData(): void {
    const startIndex = (this.currentPage - 1) * this.pageSize;
    const endIndex = startIndex + this.pageSize;
    this.dataSource.data = this.userdata.slice(startIndex, endIndex);
  }

  onPageChange(pageNumber: number): void {
    this.currentPage = pageNumber;
    this.paginateData();
  }
}

