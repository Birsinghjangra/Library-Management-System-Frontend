import { Component } from '@angular/core';

@Component({
  selector: 'app-report',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.css']
})
export class ReportComponent {
  reportOptions = [
    { value: 'most_issued_books', label: 'Most Issued Books' },
    { value: 'damaged_books', label: 'Damaged Books' },
    { value: 'lost_books', label: 'Lost Books' },
    { value: 'late_returned', label: 'Late Returned Books' },
    { value: 'fines_collected', label: 'Fines Collected' },
  ];

  fastTagOptions = [
    { value: 'this_week', label: 'This Week' },
    { value: 'last_30', label: 'Last 30 Days' },
    { value: 'this_month', label: 'This Month' },
    { value: 'last_month', label: 'Last Month' },
    { value: 'this_year', label: 'This Year' },
    // { value: 'last_year', label: 'Last Year' },
  ];
}
