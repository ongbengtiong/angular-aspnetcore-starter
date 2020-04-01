import { Component, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
 
@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  encapsulation: ViewEncapsulation.None,
  styles: [`
        my-app { padding: 0 }

        .demo-header { padding: 5px; }

        kendo-drawer-content {
            height: 500px;
            overflow: auto;
            padding-left: 10px;
        }
    `]
})
export class AboutComponent {
  public expanded = false;
  public items: Array<any> = [];

  constructor(private router: Router) {
    const routes: any[] = router.config;

    routes.forEach(route => {
      this.items.push({
        text: route.text,
        path: route.path ? route.path : ''
      });
    });

    this.items[0].selected = true;
  }
}
