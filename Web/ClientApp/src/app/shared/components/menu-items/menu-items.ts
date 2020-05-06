import { Injectable } from '@angular/core';

export interface Menu {
  state: string;
  name: string;
  type: string;
  icon: string;
  subMenus: Menu[];
}

const MENUITEMS = [
  { state: 'dashboard', name: 'Dashboard', type: 'link', icon: 'av_timer', subMenus: [] },
  {
    state: 'bpm', type: 'link', name: 'BPM', icon: 'view_comfy', subMenus: [
      { state: 'bpm/bpmn-modeler', type: 'link', name: 'BPMN', icon: 'tab', subMenus: [] },
      { state: 'bpm/dmn-modeler', type: 'link', name: 'DMN', icon: 'crop_7_5', subMenus: [] },
    ]
  },
  {
    state: 'shop', type: 'link', name: 'Shop', icon: 'view_comfy', subMenus: [
      { state: 'shop', type: 'link', name: 'Shop', icon: 'view_comfy', subMenus: [] },
      { state: 'shop/products', type: 'link', name: 'Products', icon: 'web', subMenus: [] },
    ]
  },
  {
    state: 'about', type: 'link', name: 'About', icon: 'view_comfy', subMenus: [
      { state: 'about/counter', type: 'link', name: 'Counter', icon: 'view_list', subMenus: [] },
      { state: 'home/background', type: 'link', name: 'Background', icon: 'view_headline', subMenus: [] },
    ]
  },
  {
    state: 'modules', type: 'link', name: 'Modules', icon: 'view_comfy', subMenus: [
      { state: 'material/fetch-data', type: 'link', name: 'Fetch data', icon: 'crop_7_5', subMenus: [] },
      { state: 'entities', type: 'link', name: 'Entities', icon: 'view_headline', subMenus: [] },
      { state: 'login', type: 'link', name: 'Login', icon: 'view_list', subMenus: [] },
    ]
  },
  {
    state: 'components', type: 'link', name: 'Components', icon: 'crop_7_5', subMenus: [
      { state: 'button', type: 'link', name: 'Buttons', icon: 'crop_7_5', subMenus: [] },
      { state: 'grid', type: 'link', name: 'Grid List', icon: 'view_comfy', subMenus: [] },
      { state: 'lists', type: 'link', name: 'Lists', icon: 'view_list', subMenus: [] },
      { state: 'menu', type: 'link', name: 'Menu', icon: 'view_headline', subMenus: [] },
      { state: 'tabs', type: 'link', name: 'Tabs', icon: 'tab', subMenus: [] },
      { state: 'stepper', type: 'link', name: 'Stepper', icon: 'web', subMenus: [] },
      {
        state: 'expansion',
        type: 'link',
        name: 'Expansion Panel',
        icon: 'vertical_align_center', subMenus: []
      },
      { state: 'chips', type: 'link', name: 'Chips', icon: 'vignette', subMenus: [] },
      { state: 'toolbar', type: 'link', name: 'Toolbar', icon: 'voicemail', subMenus: [] },
      {
        state: 'progress-snipper',
        type: 'link',
        name: 'Progress snipper',
        icon: 'border_horizontal', subMenus: []
      },
      {
        state: 'progress',
        type: 'link',
        name: 'Progress Bar',
        icon: 'blur_circular', subMenus: []
      },
      {
        state: 'dialog',
        type: 'link',
        name: 'Dialog',
        icon: 'assignment_turned_in', subMenus: []
      },
      { state: 'tooltip', type: 'link', name: 'Tooltip', icon: 'assistant', subMenus: [] },
      { state: 'snackbar', type: 'link', name: 'Snackbar', icon: 'adb', subMenus: [] },
      { state: 'slider', type: 'link', name: 'Slider', icon: 'developer_mode', subMenus: [] },
      {
        state: 'slide-toggle',
        type: 'link',
        name: 'Slide Toggle',
        icon: 'all_inclusive', subMenus: []
      }
    ]
  },

];

@Injectable()
export class MenuItems {
  getMenuitem(): Menu[] {
    return MENUITEMS;
  }
}
