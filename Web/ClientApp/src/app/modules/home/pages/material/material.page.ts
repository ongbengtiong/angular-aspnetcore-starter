import { Component, ViewEncapsulation, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { MatSidenav } from '@angular/material/sidenav';
//import { SideBarService } from '../../../../shared/components/sidebar/sidebar.service';
//import { LeftBarService } from '../../../../shared/components/left-bar/left-bar.service';

 
@Component({
  selector: 'material-page',
  templateUrl: './material.page.html',
  styles: [`
`]
})
export class MaterialPage {
  // @ViewChild('sidenav') sidenav: MatSidenav;
  showFiller = false;
  public onSideNavChange: boolean;
  constructor(private router: Router, 
    //private leftBarService: LeftBarService
    ) {
    // this.leftBarService.sideNavState$.subscribe(res => {
    //   console.log(res)
    //   this.onSideNavChange = res;
    // })
  }
  close(reason: string) {
    // this.reason = reason;
    // this.sidenav.close();
  }

}
