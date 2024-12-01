import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { PieChartComponent } from './pie-chart/pie-chart.component'; // Update path if necessary

@NgModule({
    declarations: [
        PieChartComponent
    ],
    imports: [
        CommonModule // Import CommonModule for ngIf, ngFor, etc.
    ],
    exports: [
        PieChartComponent // Export PieChartComponent so it can be used in other modules
    ]
})
export class ChartModule {}
