import { MediaMatcher } from '@angular/cdk/layout';
import {
  ChangeDetectorRef,
  Component,
  OnDestroy,
  ViewChild,
  AfterViewInit,
  OnInit
} from '@angular/core';

import { SidebarService } from './sidebar/sidebar.service';
import { MenuItems } from 'src/app/shared/components/menu-items/menu-items';
import { Title } from '@angular/platform-browser';
import { AppTitleService } from 'src/app/shared/services/app-title.service';

/** @title Responsive sidenav */
@Component({
  selector: 'app-full-layout',
  templateUrl: './full.component.html',
  styleUrls: ['./full.component.css']
})
export class FullComponent implements OnInit, OnDestroy, AfterViewInit {
  @ViewChild('snav') snav: any;

  mobileQuery: MediaQueryList;

  private _mobileQueryListener: () => void;
  sideBarState = true;
  title: any;
  constructor(
    changeDetectorRef: ChangeDetectorRef,
    media: MediaMatcher,
    public menuItems: MenuItems,
    public titleService: Title,
    private appTitleService: AppTitleService
  ) {
    this.mobileQuery = media.matchMedia('(min-width: 768px)');
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this._mobileQueryListener);
  }
  ngOnInit() {
    // https://stackoverflow.com/questions/51286357/angular-display-title-of-selected-component/51287553#51287553
    this.appTitleService.getTitle().subscribe(appTitle => this.title = appTitle);
    this.titleService.setTitle(this.title);
  }
  ngOnDestroy(): void {
    this.mobileQuery.removeListener(this._mobileQueryListener);
  }
  ngAfterViewInit() { }
  sidebarToggle() {
    this.snav.toggle();
    //sidebarService
    this.sideBarState = !this.sideBarState;
  }
}
