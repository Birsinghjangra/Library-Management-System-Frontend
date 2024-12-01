import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ChartModule } from './charts/chart.module';
import { dashboardRouting } from './dashboard-routing.module';
import { DashboardComponent } from './dashboard.component';

@NgModule({
    declarations:[
        DashboardComponent
    ],
        
        imports:[
            // ChartModule,
            CommonModule,
        dashboardRouting,
        
    ],
    exports: [
          // Export PieChartComponent if you want to use it outside of this module
      ]
})

export class dashboardmodule {}