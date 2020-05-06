import { NgModule } from '@angular/core';
//import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FooterComponent } from './components/footer/footer.component';
import { FormsModule } from '@angular/forms';
import { CommonModule, LocationStrategy, PathLocationStrategy } from '@angular/common';
import { RouterModule } from '@angular/router';

import { SidebarModule } from 'primeng/sidebar';
import { MaterialModule } from './material.module';
import { FileUploadService } from './services/file-upload.service';
import { AccordionAnchorDirective, AccordionLinkDirective, AccordionDirective } from './components/accordion';
import { MenuItems } from './components/menu-items/menu-items';
@NgModule({
  imports: [
    CommonModule,
    // BrowserAnimationsModule,
    RouterModule,
    SidebarModule,
    MaterialModule
  ],
  declarations: [
    FooterComponent,
    AccordionAnchorDirective,
    AccordionLinkDirective,
    AccordionDirective
  ],

  exports: [
    CommonModule,
    FormsModule,
    FooterComponent,
    AccordionAnchorDirective,
    AccordionLinkDirective,
    AccordionDirective
  ],
  providers: [FileUploadService, MenuItems,
    {
      provide: LocationStrategy,
      useClass: PathLocationStrategy
    }]
})
export class SharedModule { }
