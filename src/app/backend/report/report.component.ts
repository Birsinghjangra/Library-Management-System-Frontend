import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { CommonService } from 'src/app/services/common.service';
import { SnackBarService } from 'src/app/services/snackbar.service';

@Component({
    selector: 'app-report',
    templateUrl: './report.component.html',
    styleUrls: ['./report.component.css'],
})
export class ReportComponent implements OnInit {
    reportOptions = [
        { value: 'active_students', label: 'Active Students' },
        { value: 'inactive_students', label: 'Inactive Students' },
        { value: 'active_books', label: 'Active Books' },
        { value: 'inactive_books', label: 'Inactive Books' },
        { value: 'lost_books', label: 'Lost Books' },
        { value: 'damage_books', label: 'Damaged Books' },
        { value: 'total_issued', label: 'Total Books Issued' },
    ];
    fastTagOptions = [
        { value: 'all', label: 'All' },
        { value: 'last_7', label: 'Last 7 Days' },
        { value: 'last_30', label: 'Last 30 Days' },
        { value: 'this_month', label: 'This Month' },
        { value: 'last_month', label: 'Last Month' },
        { value: 'this_year', label: 'This Year' },
        { value: 'custom', label: 'Custom' },
    ];

    displayedColumns: string[] = [];
    dataSource: MatTableDataSource<any> = new MatTableDataSource<any>([]);
    showReportButtons: boolean = false;
    selectedReport: string = '';
    showTimePeriod = false;
    showCustomDateRange: boolean = false;
    customStartDate: string = '';
    customEndDate: string = '';
    start_date: string = '';  // Date used for query
    end_date: string = '';  // Date used for query
    query: string = '';  // Query string to be sent
    reportData: any[] = [];
    timePeriodSelected: boolean = false;
    showExportButtons: boolean = false; // Controls visibility of export buttons


    // Column name mapping for human-readable column headers
    columnNameMapping: { [key: string]: string } = {
        srn: 'SRN',
        student_name: 'Student Name',
        class: 'Class',
        section: 'Section',
        roll_no: 'Roll No.',
        phone: 'Phone No.',
        address: 'Address',
        createdOn: 'Creation Date',
        book_id: 'Book ID',
        isbn: 'ISBN',
        title: 'Title',
        publication: 'Publication',
        author_name: 'Author Name',
        price: 'Price',
        edition: 'Edition',
        quantity: 'Quantity',
        issued_at: 'Issue Date',
        end_date: 'End Date',
        fine: 'Fine',
        remark: 'Remark'
    };
    selectedValue: any;

    constructor(
        private commonService: CommonService,
        private snackBar: SnackBarService
    ) { }

    ngOnInit(): void {
    }

    onReportChange(event: any): void {
        this.showExportButtons = false; // Reset export buttons visibility
        const selectedValue = (event.target as HTMLSelectElement).value;
        this.selectedReport = selectedValue; // Assign selected value to this.selectedReport
        this.showTimePeriod = selectedValue !== '';

        // Reset date range and hide custom inputs if necessary
        if (selectedValue !== 'custom') {
            this.customStartDate = '';
            this.customEndDate = '';
            this.start_date = '';
            this.end_date = '';
            this.showCustomDateRange = false;
        }

        // Reset query and set it based on the selected report
        this.query = '';
        switch (selectedValue) {
            case 'active_students':
                this.query = `SELECT srn, student_name, class, section, roll_no, phone, address, createdOn FROM student WHERE isActive = 1`;
                break;
            case 'inactive_students':
                this.query = `SELECT srn, student_name, class, section, roll_no, phone, address, createdOn FROM student WHERE isActive = 0`;
                break;
            case 'active_books':
                this.query = `SELECT DISTINCT isbn, title, publication, author_name, price, edition, SUM(quantity) OVER (PARTITION BY isbn) AS total_quantity FROM book WHERE isActive = 1`;
                break;
            case 'inactive_books':
                this.query = `SELECT DISTINCT isbn, title, publication, author_name, price, edition, SUM(quantity) OVER (PARTITION BY isbn) AS total_quantity FROM book WHERE isActive = 0`;
                break;
            case 'lost_books':
                this.query = `SELECT b.book_id, b.isbn, b.title, b.author_name, s.student_name, s.class, s.section, bbd.issued_at, bbd.end_date, bbd.fine, bbd.remark FROM borrower_book_detail bbd JOIN book b ON b.book_id = bbd.book_id JOIN student s ON s.srn = bbd.srn WHERE bbd.isLost = 1`;
                break;
            case 'damage_books':
                this.query = `SELECT b.book_id, b.isbn, b.title, b.author_name, s.student_name, s.class, s.section, bbd.issued_at, bbd.end_date, bbd.fine, bbd.remark FROM borrower_book_detail bbd JOIN book b ON b.book_id = bbd.book_id JOIN student s ON s.srn = bbd.srn WHERE bbd.isDamage = 1`;
                break;
            case 'total_book_issued':
                this.query = `SELECT b.isbn, b.title, b.author_name, COUNT(bbd.book_id) AS total_issued_count FROM borrower_book_detail bbd JOIN book b ON b.book_id = bbd.book_id`;
                break;
            default:
                this.query = '';
        }

        console.log('Selected Report:', this.selectedReport);
        console.log('Query:', this.query);
    }

    onTimePeriodChange(event: any): void {
        const selectedValue = event.target.value;

        // Show custom date range input if 'custom' is selected
        if (selectedValue === 'custom') {
            this.showCustomDateRange = true;
        } else {
            this.showCustomDateRange = false;
            this.customStartDate = '';
            this.customEndDate = '';
            this.start_date = '';
            this.end_date = '';
        }

        // Set predefined date ranges for the selected time period
        let newDate = new Date();
        let startDate: Date | undefined = undefined;
        let endDate: Date | undefined = undefined;

        switch (selectedValue) {
            case 'all':
                startDate = new Date('2024-01-01');
                endDate = new Date();
                break;
            case 'last_7':
                startDate = new Date(newDate.setDate(newDate.getDate() - 6));
                endDate = new Date();
                break;
            case 'last_30':
                startDate = new Date(newDate.setDate(newDate.getDate() - 30));
                endDate = new Date();
                break;
            case 'this_month':
                startDate = new Date(newDate.getFullYear(), newDate.getMonth(), 1);
                endDate = new Date();
                break;
            case 'last_month':
                startDate = new Date(newDate.getFullYear(), newDate.getMonth() - 1, 1);
                endDate = new Date(newDate.getFullYear(), newDate.getMonth(), 0);
                break;
            case 'this_year':
                startDate = new Date(newDate.getFullYear(), 0, 1);
                endDate = new Date();
                break;
            case 'last_year':
                startDate = new Date(newDate.getFullYear() - 1, 0, 1);
                endDate = new Date(newDate.getFullYear() - 1, 11, 31);
                break;
            default:
                break;
        }

        if (startDate && endDate) {
            this.start_date = this.formatDate(startDate);
            this.end_date = this.formatDate(endDate);
        }

        // Set time period selected flag
        this.timePeriodSelected = selectedValue !== '' && selectedValue !== 'custom';
    }

    generateReport(): void {
        this.showExportButtons = false; // Reset export buttons visibility
        // Validate time period selection
        if (!this.timePeriodSelected && !this.showCustomDateRange) {
            this.snackBar.openSnackBarError(['Please select a valid time period to generate the report.']);
            return;
        }

        // Assign custom date range if selected
        if (this.showCustomDateRange && this.customStartDate && this.customEndDate) {
            this.start_date = this.customStartDate;
            this.end_date = this.customEndDate;
        }

        console.log('Start Date:', this.start_date);
        console.log('End Date:', this.end_date);
        console.log('Selected Report:', this.selectedReport);

        var active_students1 = ''
        var active_books1 = ''
        var lost_books1 = ''
        var total_issued1 = ''


        if (this.start_date && this.end_date) {
            // Reset query base
            // this.onReportChange({ target: { value: this.selectedReport } });

            // Add time period conditions
            if (this.selectedReport === 'active_students' || this.selectedReport === 'inactive_students') {
                active_books1 = ''
                lost_books1 = ''
                total_issued1 = ''
                active_students1 = ` AND createdOn BETWEEN '${this.start_date}' AND '${this.end_date}'`;
            }
            else if (this.selectedReport === 'active_books' || this.selectedReport === 'inactive_books') {
                active_students1 = ''
                lost_books1 = ''
                total_issued1 = ''
                active_books1 = ` AND createdOn BETWEEN '${this.start_date}' AND '${this.end_date}'`;
            }
            else if (this.selectedReport === 'lost_books' || this.selectedReport === 'damage_books') {
                active_books1 = ''
                active_students1 = ''
                total_issued1 = ''
                lost_books1 = ` AND bbd.end_date BETWEEN '${this.start_date}' AND '${this.end_date}'`;
            }
            else if (this.selectedReport === 'total_issued') {
                active_books1 = ''
                active_students1 = ''
                lost_books1 = ''
                total_issued1 = ` AND createdOn BETWEEN '${this.start_date}' AND '${this.end_date}' GROUP BY b.isbn, b.title, b.author_name`;
            }

            console.log(this.query + active_books1 + active_students1 + lost_books1 + total_issued1);
        }

        const payload = { query: this.query + active_books1 + active_students1 + lost_books1 };
        this.commonService.generatereport(payload).subscribe(
            (data: any) => {
                this.reportData = data.data;
                this.generateTable(this.reportData);
    
                if (this.reportData.length > 0) {
                    this.showExportButtons = true; // Enable export buttons if data is available
                }
            },
            (error: any) => {
                console.error('Error generating report:', error);
                this.snackBar.openSnackBarError(['Failed to generate the report.']);
            }
        );
    }
    formatDate(date: any): string {
        // If the input is a timestamp, create a Date object
        if (typeof date === 'number') {
            date = new Date(date); // Convert the timestamp to Date
        }

        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        return `${year}-${month}-${day}`;
    }

    generateTable(data: any) {
        // Format date fields to human-readable form
        data.forEach((item: any) => {
            // Check if the field is a timestamp or a valid date string and format it
            if (item.createdOn) item.createdOn = this.formatDate(item.createdOn);
            if (item.issued_at) item.issued_at = this.formatDate(item.issued_at);
            if (item.end_date) item.end_date = this.formatDate(item.end_date);
        });

        this.dataSource.data = data;
        if (data.length > 0) {

            this.displayedColumns = Object.keys(data[0]);
        } else {
            this.displayedColumns = [];
        }
    }


    downloadReport(format: string): void {
        if (!this.reportData || this.reportData.length === 0) {
            this.snackBar.openSnackBarError(['No data available to export.']);
            return;
        }

        const payload = {
            query: this.query,
            start_date: this.start_date,
            end_date: this.end_date,
            format: format, // 'pdf' or 'excel'
        };

        this.commonService.exportReport(payload).subscribe(
            (response: any) => {
                const blob = new Blob([response], {
                    type: format === 'pdf' ? 'application/pdf' : 'application/vnd.ms-excel',
                });
                const url = window.URL.createObjectURL(blob);
                const a = document.createElement('a');
                a.href = url;
                a.download = `report.${format}`;
                a.click();
                window.URL.revokeObjectURL(url);
            },
            (error: any) => {
                console.error(`Failed to export report as ${format}:`, error);
                this.snackBar.openSnackBarError([`Failed to export report as ${format}.`]);
            }
        );
    }
    toggleExportButtons(): void {
        if (!this.selectedReport || this.reportData.length === 0) {
            this.snackBar.openSnackBarError(['Please select a valid report and no data available.']);
            return; // Do not proceed if there's an error
        }
        this.showExportButtons = !this.showExportButtons;
    }
}
