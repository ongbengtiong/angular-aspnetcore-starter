import { Component, OnInit, OnDestroy, HostBinding } from '@angular/core';
import { Subscription } from 'rxjs';
import { Router, NavigationStart } from '@angular/router';
import { SideBarService } from './sidebar.service';
export interface RouteInfo {
  path: string;
  title: string;
  icon: string;
  class: string;
  auth: boolean;
}
export const ROUTES: RouteInfo[] = [

  { path: '/home', title: 'Home', icon: 'ti-home', class: '', auth: false },
  { path: '/plan/dashboard', title: 'Dashboard', icon: 'ti-panel', class: '', auth: false },
  { path: '/details/profile', title: 'Profile', icon: 'ti-user', class: '', auth: true },
  { path: '/details/start', title: 'Start', icon: 'ti-view-list-alt', class: '', auth: false } 


];


@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit, OnDestroy {
  @HostBinding('class.is-open')
  isOpen = false;

  public menuItems: any[];
  subscription: Subscription;
  constructor(private router: Router,   private sideBarService: SideBarService) {
    // https://stackoverflow.com/questions/43882389/angular-2-side-bar-to-be-closed-whenever-a-route-is-changed
    router.events.subscribe((val) => {
      if (val instanceof NavigationStart) {
        this.isOpen = false;
      }
    });
  }
  ngOnInit() {
    this.menuItems = ROUTES.filter(menuItem => menuItem);
    this.subscription = this.sideBarService.change.subscribe(() => {
      this.isOpen = !this.isOpen;
    });

  }


  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
