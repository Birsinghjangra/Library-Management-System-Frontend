import { Component, ElementRef, EventEmitter, OnInit, Output, ViewChild, AfterViewInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { CommonService } from '../../services/common.service';
import { SnackBarService } from '../../services/snackbar.service';
import { Router } from '@angular/router';
import { DeleteDialogComponent } from '../common/dialog-box/delete-dialog/delete-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { PaginationService } from 'src/app/services/pagination.service';
import { HttpClient } from '@angular/common/http';

// Update User interface to match the student schema
interface User {
  srn: string;
  student_name: string;
  class: string;
  section: string;
  roll_no: string;
  phone: string;
  address: string;
  date_added: string; // or Date depending on how you handle dates
  isHidden: boolean; // Use this property if you are implementing row visibility toggling
}

@Component({
  selector: 'app-user-management',
  templateUrl: './user-management.component.html',
  styleUrls: ['./user-management.component.css']
})
export class UserManagementComponent implements OnInit, AfterViewInit {

  dataSource: MatTableDataSource<User> = new MatTableDataSource<User>();
  hasData: boolean = false;
  userdata: User[] = [];
  showInactiveUsers: boolean = false;
  @Output() closeDialog = new EventEmitter<void>();
  currentPage: number = 1;
  pageSize: number = 10;
  totalItems: number = 0;
  totalPages: number = 0;
  selectedFile: File | null = null;
  @ViewChild('table', { static: false }) table!: ElementRef;
  classList: string[] = ['All', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12'];
  selectedClass: string = ''; // Add selectedClass property for the filter

  displayedColumns = ['srn', 'student_name', 'class', 'section', 'roll_no', 'createdOn', 'action'];

  constructor(private commonService: CommonService,
    private router: Router,
    private snackBar: SnackBarService,
    public dialog: MatDialog,
    private paginationService: PaginationService,
    private http: HttpClient) { }

    ngOnInit(): void {
      this.loaddata();
      this.paginateData();
    
      // Adjust filter predicate to support combined filter (class and search text)
      this.dataSource.filterPredicate = (data: User, filter: string) => {
        const combinedFilter = JSON.parse(filter);
        const matchesClass = combinedFilter.class === 'All' || data.class === combinedFilter.class;
        const matchesText = data.student_name.toLowerCase().includes(combinedFilter.text) || 
                            data.roll_no.toLowerCase().includes(combinedFilter.text) ||
                            data.phone.toLowerCase().includes(combinedFilter.text) ||
                            data.address.toLowerCase().includes(combinedFilter.text) ||
                            data.srn.toLowerCase().includes(combinedFilter.text); // Include srn in the filter
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
      console.log("this product", this.userdata);
      this.hasData = this.userdata.length > 0;
      this.dataSource.data = this.userdata;
      this.totalItems = this.userdata.length;
      this.totalPages = Math.ceil(this.totalItems / this.pageSize);
      this.paginateData();
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
  }

  filterByClass(selectedClass: string): void {
    this.selectedClass = selectedClass; // Set the selected class
    const currentTextFilter = this.dataSource.filter; // Get current text filter
    this.setCombinedFilter(currentTextFilter); // Combine the filters
  }

  setCombinedFilter(textFilter: string): void {
    // Combine both class and text filters in a JSON string
    const filter = JSON.stringify({ class: this.selectedClass || 'All', text: textFilter.trim() });
    this.dataSource.filter = filter;
  
    // Refresh the paginator
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  
    // Ensure the dataSource is updated correctly
    this.paginateData(); // This may need to be updated based on your filtering logic
  }

  toggleRowVisibility(index: number): void {
    const rowData = this.dataSource.data[index];
    rowData.isHidden = !rowData.isHidden;
    localStorage.setItem(`isHidden_${rowData.srn}`, rowData.isHidden.toString());
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
}
