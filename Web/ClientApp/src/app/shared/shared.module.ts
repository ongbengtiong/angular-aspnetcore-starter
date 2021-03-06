import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule, LocationStrategy, PathLocationStrategy } from '@angular/common';
import { RouterModule } from '@angular/router';

import { SidebarModule } from 'primeng/sidebar';
import { MaterialModule } from './material.module';
import { FileUploadService } from './services/file-upload.service';
import { AccordionAnchorDirective, AccordionLinkDirective, AccordionDirective } from './components/accordion';
import { MenuItems } from './components/menu-items/menu-items';
import { WidgetCardComponent } from './components/widget-card.component';
@NgModule({
  imports: [
    CommonModule,
    // BrowserAnimationsModule,
    RouterModule,
    SidebarModule,
    MaterialModule
  ],
  declarations: [
    AccordionAnchorDirective,
    AccordionLinkDirective,
    AccordionDirective,
    WidgetCardComponent
  ],

  exports: [
    CommonModule,
    FormsModule,
    AccordionAnchorDirective,
    AccordionLinkDirective,
    AccordionDirective,
    WidgetCardComponent
  ],
  providers: [FileUploadService, MenuItems,
    {
      provide: LocationStrategy,
      useClass: PathLocationStrategy
    }]
})
export class SharedModule { }
