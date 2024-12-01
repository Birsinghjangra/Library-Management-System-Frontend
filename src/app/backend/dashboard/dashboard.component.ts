import { Component, OnInit, AfterViewInit, Output } from '@angular/core';
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
  pieChartData:any={};
  damaged:any;
  lost_book:any;
  fine:number=0;

  constructor(private commonservice: CommonService) { }

  ngOnInit(): void {
    this.bookCount();
    this.issueBook();
    this.userCount();
    this.bookData(); // to calculate total damage lost book
  }

  ngAfterViewInit(): void {
    setTimeout(() => {
      this.initCharts();
      // this.bookData();
    }, 0);
  }
  bookData(){
    let query = 'SELECT COUNT(*) AS total_books, COUNT(CASE WHEN `isLost` = 1 THEN 1 END) AS lost_books,COUNT(CASE WHEN `isDamage` = 1 THEN 1 END) AS damaged_books FROM `borrower_book_detail`;'
    this.commonservice.generatereport({query:query}).subscribe(data=>{
      // console.log(data.data)
      // this.peiChart(data.data) // chart for lost and damage book
      this.pieChartData= data.data
      this.pieChartData = {
        damaged_books: 5,
        lost_books: 3,
        total_books: 100
      };
      this.lost_book= this.pieChartData.lost_books
      this.damaged= this.pieChartData.damaged_books

       console.log(this.pieChartData)
       this.initPieChart();
    })
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
    let myChart = echarts.getInstanceByDom(chartDom); 
    if (myChart) {
      myChart.dispose(); // Dispose of the existing chart instance
    }
    // Ensure the chart size is responsive
    myChart = echarts.init(chartDom);

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
  initPieChart(): void {
    const chartDom = document.getElementById('pieChart')!;
    const myChart = echarts.init(chartDom);
    const option = {
      title: {
        text: 'Lost and Damaged Books',
        // subtext: 'Fake Data',
        left: 'center'
      },
      tooltip: {
        trigger: 'item',
        formatter: '{a} <br/>{b}: {c} ({d}%)'
      },
      legend: {
        orient: 'vertical',
        left: 'left'
      },
      series: [
        {
          name: 'Books',
          type: 'pie',
          radius: '50%',
          data: [
            { value: this.pieChartData.lost_books, name: 'Lost Books' },
            { value: this.pieChartData.damaged_books, name: 'Damaged Books' },
            { value: this.pieChartData.total_books - (this.pieChartData.lost_books + this.pieChartData.damaged_books), name: 'Healthy Books' }
          ],
          emphasis: {
            itemStyle: {
              shadowBlur: 10,
              shadowOffsetX: 0,
              shadowColor: 'rgba(0, 0, 0, 0.5)'
            }
          }
        }
      ]
    };
    myChart.setOption(option);
  }
}  