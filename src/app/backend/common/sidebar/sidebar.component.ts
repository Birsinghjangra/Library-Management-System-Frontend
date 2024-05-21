import { Component } from '@angular/core';
import {sidebarMenuConfig} from './config'

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent {
  sidebaritems = sidebarMenuConfig;
}
