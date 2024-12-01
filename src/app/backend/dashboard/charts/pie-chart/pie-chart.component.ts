import { Component, OnInit, Input, AfterViewInit } from '@angular/core';
import * as echarts from 'echarts';

@Component({
  selector: 'app-pie-chart',
  templateUrl: './pie-chart.component.html',
  styleUrls: ['./pie-chart.component.css']
})
export class PieChartComponent implements OnInit, AfterViewInit {

  @Input() data: any;  // Input data (damaged_books, lost_books, total_books)
  chartInstance: any;

  constructor() { }

  ngOnInit(): void {
    // You can handle any initialization here if necessary
  }

  ngAfterViewInit(): void {
    this.initChart();
  }

  // Initialize the chart
  initChart(): void {
    this.chartInstance = echarts.init(document.getElementById('pieChart') as HTMLElement);
    this.updateChart();
  }

  // Update chart based on input data
  updateChart(): void {
    const option = {
      title: {
        text: 'Books Status',
        subtext: 'Lost and Damaged Books',
        left: 'center'
      },
      tooltip: {
        trigger: 'item'
      },
      legend: {
        orient: 'vertical',
        left: 'left'
      },
      series: [
        {
          name: 'Book Status',
          type: 'pie',
          radius: '50%',
          data: [
            { value: this.data.damaged_books, name: 'Damaged Books' },
            { value: this.data.lost_books, name: 'Lost Books' },
            { value: this.data.total_books, name: 'Total Books' }
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
    this.chartInstance.setOption(option);
  }

}
