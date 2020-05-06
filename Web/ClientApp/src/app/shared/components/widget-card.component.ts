import { Component, Input } from '@angular/core';

@Component({
    selector: 'app-widget-card',
    template: `     
    <mat-card-content> 
    <mat-card-subtitle>{{label}}</mat-card-subtitle>
<div class='text'>
    
    <span class='total'>{{total}}</span>
    <span class='m-1'>
        <mat-icon color='primary'>trending_up</mat-icon>
    </span>
    <span class='description'>{{percentage}}</span>
    <span> of target</span>
</div>
<div class='widget'>

</div>
</mat-card-content>
 
  `,
    styles: [`
   .total {
       font-size: 3rem;
   }
   .mat-icon 
   .description {
        color: green;
        font-size: 2rem;
        padding: 1rem;
   }
   .mat-icon {
        position: relative;
        margin: 0 20px;
        top: 5px;
   }

  `]

})
export class WidgetCardComponent {
    @Input() label: string;
    @Input() total: string;
    @Input() percentage: string;


}
