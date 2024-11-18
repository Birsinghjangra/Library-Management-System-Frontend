import { Component, ElementRef, EventEmitter, OnInit, Output, ViewChild, AfterViewInit } from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort, Sort } from '@angular/material/sort';
import { CommonService } from '../../services/common.service';
import { SnackBarService } from '../../services/snackbar.service';
import { Router } from '@angular/router';
import { DeleteDialogComponent } from '../common/dialog-box/delete-dialog/delete-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { PaginationService } from 'src/app/services/pagination.service';
import { HttpClient } from '@angular/common/http';

interface User {
  srn: string;
  student_name: string;
  class: string;
  section: string;
  roll_no: string;
  phone: string;
  address: string;
  date_added: string;
  isHidden: boolean;
  isActive: number;
}

@Component({
  selector: 'app-user-management',
  templateUrl: './user-management.component.html',
  styleUrls: ['./user-management.component.css']
})
export class UserManagementComponent implements OnInit, AfterViewInit {

  dataSource: MatTableDataSource<User> = new MatTableDataSource<User>([]);
  hasData: boolean = false;
  userdata: User[] = [];
  @Output() closeDialog = new EventEmitter<void>();
  isLoading = false;
  totalRows = 0;
  pageSize = 10;
  currentPage = 1;
  mat_currentPage = 0;
  pageSizeOptions: number[] = [10, 25, 100];
  startIndex: number = 0;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort!: MatSort;
  selectedFile: File | null = null;
  @ViewChild('table', { static: false }) table!: ElementRef;
  classList: string[] = ['All', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12'];
  selectedClass: string = ''; // Add selectedClass property for the filter
  showInactiveUsers: boolean = false;


  displayedColumns = ['srn', 'student_name', 'class', 'section', 'roll_no', 'createdOn', 'action'];

  constructor(private commonService: CommonService,
    private router: Router,
    private snackBar: SnackBarService,
    public dialog: MatDialog,
    private paginationService: PaginationService,
    private http: HttpClient) { }

  ngOnInit(): void {
    this.loaddata();


    // Set up filter predicate to consider both text and class filters
    this.dataSource.filterPredicate = (data: User, filter: string) => {
      const combinedFilter = JSON.parse(filter);
      const matchesClass = combinedFilter.class === 'All' || data.class === combinedFilter.class;
      const matchesText = data.student_name.toLowerCase().includes(combinedFilter.text) ||
        data.roll_no.toLowerCase().includes(combinedFilter.text) ||
        data.phone.toLowerCase().includes(combinedFilter.text) ||
        data.address.toLowerCase().includes(combinedFilter.text) ||
        data.srn.toLowerCase().includes(combinedFilter.text);
      return matchesClass && matchesText;
    };
  }
  ngAfterViewInit(): void {
    const tableElement = this.table.nativeElement; // Correctly reference the table element
    console.log('Table Element:', tableElement);
  }

  loaddata() {
    const value = {
      Table_name: 'student'
    };

    this.commonService.getData_common(value).subscribe((data: any) => {
      this.userdata = data.data;
      this.dataSource.data = this.userdata;
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
      this.paginator.pageIndex = this.mat_currentPage;
      this.isLoading = false;
      this.filterData();

    });
  }

  deleteUser(srn: string) {
    return {
      table_name: 'student',
      row_ids: srn,
      action: 'delete',
    };
  }

  delete(srn: string) {
    const dialogRef = this.dialog.open(DeleteDialogComponent, {
      width: '350px',
      height: '200px',
      data: { id: srn }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        const payload = this.deleteUser(srn);
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

  applyFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value.toLowerCase();
    this.setCombinedFilter(filterValue);
    this.filterData();  // Apply the filter based on input
  }

  filterByClass(selectedClass: string): void {
    this.selectedClass = selectedClass;
    this.setCombinedFilter(''); // Call with empty text filter if no text is provided
  }
  setCombinedFilter(textFilter: string): void {
    const filter = JSON.stringify({ class: this.selectedClass || 'All', text: textFilter.trim() });
    this.dataSource.filter = filter;
  }

  filterData(): void {
    if (this.showInactiveUsers) {
      // Show only inactive users
      this.dataSource.data = this.userdata.filter(user => user.isActive === 0);
    } else {
      // Show only active users
      this.dataSource.data = this.userdata.filter(user => user.isActive === 1);
    }

    // If the selected class filter is applied, apply that as well
    if (this.selectedClass && this.selectedClass !== 'All') {
      this.dataSource.data = this.dataSource.data.filter(user => user.class === this.selectedClass);
    }
  }

  onClassChange(event: Event): void {
    const selectedValue = (event.target as HTMLSelectElement)?.value || '';
    if (selectedValue) {
      this.filterByClass(selectedValue);
    }
    this.filterData();  // Apply the class filter as well
  }

  onFileSelected(event: Event): void {
    const fileInput = event.target as HTMLInputElement;
    if (fileInput.files && fileInput.files[0]) {
      this.selectedFile = fileInput.files[0];
    }
  }

  importFile(): void {
    if (!this.selectedFile) {
      this.snackBar.openSnackBarError(['No file selected!']);
      return;
    }

    const formData = new FormData();
    formData.append('file', this.selectedFile);

    this.http.post('/api/import_excel', formData).subscribe({
      next: (response: any) => {
        if (response.status === 'success') {
          this.snackBar.openSnackBarSuccess([response.message]);
          this.loaddata();
        } else {
          this.snackBar.openSnackBarError([response.message]);
        }
      },
      error: (err) => {
        console.error('Import error:', err);
        this.snackBar.openSnackBarError(['Failed to import file.']);
      }
    });
  }
  toggleStatus(srn: string, currentStatus: number): void {
    const newStatus = currentStatus === 1 ? 0 : 1;

    const payload = { srn: srn };

    this.commonService.toggleStatus(payload).subscribe(
      (response: any) => {
        if (response && response.message) {
          // this.snackBar.openSnackBarError(`User isActive toggled to ${newStatus}`, 'Close', { duration: 3000 });

          const user = this.dataSource.data.find((u: any) => u.srn === srn);
          if (user) {
            user.isActive = newStatus;
          }
        }
      },
      (error) => {
        console.error('Error toggling isActive:', error);
        // this.snackBar.openSnackBarError('Failed to toggle isActive. Please try again.', 'Close', { duration: 3000 });
      }
    );
  }

  toggleShowInactiveUsers(): void {
    this.showInactiveUsers = !this.showInactiveUsers;
    this.filterData(); // Apply the filter whenever the status is toggled
  }
  pageChanged(event: PageEvent): void {
    this.pageSize = event.pageSize;
    this.currentPage = event.pageIndex + 1;
    this.mat_currentPage = event.pageIndex;
    this.startIndex = (this.currentPage - 1) * this.pageSize;
  }
}