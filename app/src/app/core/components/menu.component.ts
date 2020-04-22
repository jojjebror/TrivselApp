import { Component, Input, Output, EventEmitter } from '@angular/core';

import { User } from '../../shared/models';

@Component({
  selector: 'ex-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent {
  @Input() user: User;

  @Output() logout = new EventEmitter<any>();

  menuItems = [
    {
      title: 'Välkommen',
      icon: 'dashboard',
      route: ['/start']
    },
    {
      title: 'Exempel',
      icon: 'grade',
      route: ['/exempel']
    },
    {
      title: 'Evenemang',
      icon: 'grade',
      route: ['/event']
    },
    {
      title: 'Drycker',
      icon: 'grade',
      route: ['/drink']
    }
  ];

  constructor() {}

}