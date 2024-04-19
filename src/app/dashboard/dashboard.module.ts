import { NgModule } from '@angular/core';
import { dashboardRouting } from './dashboard-routing.module';
import { DashboardComponent } from './dashboard.component';

@NgModule({
    declarations:[
        DashboardComponent
    ],
    imports:[
        dashboardRouting
    ]
})

export class dashboardmodule {}