import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { AppTitleService } from 'src/app/shared/services/app-title.service';


@Component({
  selector: 'shop-front-page',
  templateUrl: './shop-front.page.html'
})
export class ShopFrontPage implements OnInit {
  public constructor(private appTitleService: AppTitleService) { }

  ngOnInit() {
    this.appTitleService.setTitle('Shop Front');
  }
}
