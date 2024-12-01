import { Component, OnInit,  AfterViewInit, Input } from '@angular/core';
import * as echarts from 'echarts';

@Component({
  selector: 'pie-chart',
  templateUrl: './pie-chart.component.html',
  // styleUrls: ['./pie-chart.component.css']
})
export class PieChartComponent implements OnInit, AfterViewInit {
  @Input() piedata: any;

  // @Input() data: any;  // Input data (damaged_books, lost_books, total_books)
  chartInstance: any;

  constructor() { }

  ngOnInit(): void {
    console.log("data in pei chart",this.piedata)
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
            { value: this.piedata.damaged_books, name: 'Damaged Books' },
            { value: this.piedata.lost_books, name: 'Lost Books' },
            { value: this.piedata.total_books, name: 'Total Books' }
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
