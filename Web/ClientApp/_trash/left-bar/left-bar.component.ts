import { Component, OnInit } from '@angular/core';
import { onSideNavChange, animateText } from './animations'
import { LeftBarService } from './left-bar.service'


interface Page {
  link: string;
  name: string;
  icon: string;
}

@Component({
  selector: 'app-left-bar',
  templateUrl: './left-bar.component.html',
  styleUrls: ['./left-bar.component.css'],
  animations: [onSideNavChange, animateText]
})
export class LeftBarComponent implements OnInit {

  public sideNavState: boolean = false;
  public linkText: boolean = false;

  public pages: Page[] = [
    { name: 'Inbox', link: 'some-link', icon: 'inbox' },
    { name: 'Starred', link: 'some-link', icon: 'star' },
    { name: 'Send email', link: 'some-link', icon: 'send' },
  ]

  constructor(private leftBarService: LeftBarService) { }

  ngOnInit() {
  }

  onSinenavToggle() {
    this.sideNavState = !this.sideNavState

    setTimeout(() => {
      this.linkText = this.sideNavState;
    }, 200)
    this.leftBarService.sideNavState$.next(this.sideNavState)
  }

}
