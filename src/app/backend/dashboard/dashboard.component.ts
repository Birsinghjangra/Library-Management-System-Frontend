import { Component, OnInit, AfterViewInit } from '@angular/core';
import { CommonService } from 'src/app/services/common.service';
import * as echarts from 'echarts';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit, AfterViewInit {
  total_books: any;
  issueBook_detail: any = 0;
  userdetail: any;

  constructor(private commonservice: CommonService) { }

  ngOnInit(): void {
    this.bookCount();
    this.issueBook();
    this.userCount();
  }

  ngAfterViewInit(): void {
    setTimeout(() => {
      this.initCharts();
    }, 0);
  }
  
  
  bookCount() {
    const payload = {
      Table_name: 'book'
    };
    this.commonservice.getData_common(payload).subscribe((data) => {
      if (data && data.data) {
        this.total_books = data.data.length;
        this.initCharts();
      }
    });
  }
  
  issueBook() {
    const payload = {
      Table_name: 'borrower_book_detail'
    };
    this.commonservice.getData_common(payload).subscribe((data) => {
      if (data && data.data) {
        this.issueBook_detail = data.data.length;
        this.initCharts();
      }
    });
  }
  
  userCount() {
    const payload = {
      Table_name: 'student'
    };
    this.commonservice.getData_common(payload).subscribe((data) => {
      if (data && data.data) {
        this.userdetail = data.data.length;
        this.initCharts();
      }
    });
  }
  
  initCharts() {
    const chartDom = document.getElementById('booksChart')!;
    const myChart = echarts.init(chartDom);
  
    // Ensure the chart size is responsive
    myChart.resize();
  
    const option = {
      // title: {
      //   text: 'Books Overview',
      //   // subtext: 'Total vs Issued Books',
      //   left: 'center'
      // },
      tooltip: {
        trigger: 'axis'
      },
      legend: {
        data: ['Total Books', 'Issued Books']
      },
      xAxis: {
        type: 'category',
        data: ['Books']
      },
      yAxis: {
        type: 'value'
      },
      series: [
        {
          name: 'Total Books',
          type: 'bar',
          data: [this.total_books],
        },
        {
          name: 'Issued Books',
          type: 'bar',
          data: [this.issueBook_detail],
        }
      ]
    };
  
    myChart.setOption(option);
  }
}  