import { Component, ViewEncapsulation, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { MatSidenav } from '@angular/material/sidenav';
//import { SideBarService } from '../../../../shared/components/sidebar/sidebar.service';


@Component({
  selector: 'home-page',
  templateUrl: './home.page.html'
})
export class HomePage {
  // @ViewChild('sidenav') sidenav: MatSidenav;
  constructor(private router: Router) {
  }
  close(reason: string) {
    // this.reason = reason;
    // this.sidenav.close();
  }
  sidebarToggle() {
    //   this.sideBarService.toggle();
  }
}
