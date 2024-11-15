import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { CommonService } from 'src/app/services/common.service';
@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
  sidebaritems: any = [];
  activeMenuId: number | null = null;
  AccountId: any;
  openSubmenuId$: BehaviorSubject<number | null> = new BehaviorSubject<number | null>(null);

  constructor( private router: Router,private CommonService:CommonService) {
    this.AccountId = localStorage.getItem('AccountId');
  }

  async ngOnInit(): Promise<void> {
    this.AccountId = localStorage.getItem('AccountId');
    if (this.AccountId) {
      const value = { id: this.AccountId };
      try {
        const data = await this.CommonService.sidebarConfig(value).toPromise();
        this.sidebaritems = data;

        const storedOpenSubmenuId = localStorage.getItem('openSubmenuId');
        const storedActiveMenuId = localStorage.getItem('activeMenuId');

        if (storedOpenSubmenuId) {
          this.openSubmenuId$.next(Number(storedOpenSubmenuId));
        }
        if (storedActiveMenuId) {
          this.activeMenuId = Number(storedActiveMenuId);
        }

        // Set active menu and submenu on route change
        this.router.events.subscribe(() => {
          this.setActiveMenuAndSubMenu();
        });
      } catch (error) {
        console.error('Error fetching sidebar data:', error);
      }
    }
  }

  setActiveMenuAndSubMenu(): void {
    const currentRoute = this.router.url.split('?')[0]; // Get the base URL without query params
    let foundActiveMenuId = null;
    let foundOpenSubmenuId = null;
    
    for (const menuItem of this.sidebaritems) {
      if (menuItem.childmenu) {
        for (const subMenuItem of menuItem.childmenu) {
          if (currentRoute.includes(subMenuItem.route)) {
            foundActiveMenuId = menuItem.id;
            foundOpenSubmenuId = menuItem.id;
            break;
          }
        }
      }
    }

    // Update states based on found IDs
    if (foundActiveMenuId) {
      this.activeMenuId = foundActiveMenuId;
      this.openSubmenuId$.next(foundOpenSubmenuId);
      localStorage.setItem('openSubmenuId', foundOpenSubmenuId.toString());
      localStorage.setItem('activeMenuId', foundActiveMenuId.toString());
    }
  }

  setActiveSubMenu(menuItem: any): void {
    const newOpenSubmenuId = this.openSubmenuId$.value === menuItem.id ? null : menuItem.id;
    this.openSubmenuId$.next(newOpenSubmenuId);
    if (newOpenSubmenuId) {
      localStorage.setItem('openSubmenuId', newOpenSubmenuId.toString());
    } else {
      localStorage.removeItem('openSubmenuId');
    }
    localStorage.setItem('activeMenuId', menuItem.id.toString());
    this.activeMenuId = menuItem.id; // Update active menu
  }

  isSubmenuOpen(menuItem: any): boolean {
    const currentRoute = this.router.url.split('?')[0];
    const excludedRoutes = [
      '/admin/dashboard',
      
    ];
    if (currentRoute == '/admin') {
      return this.openSubmenuId$.value === menuItem.id; // Allow submenu toggle
    }
    if (excludedRoutes.includes(currentRoute)) {
      return false;
    }
  
    return this.openSubmenuId$.value === menuItem.id;
  }
  
}
