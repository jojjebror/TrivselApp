import { Component, OnInit, Input } from '@angular/core';

import { User } from '../../../shared/models';

@Component({
  selector: 'ex-drink-credit',
  templateUrl: './drink-credit.component.html',
  styleUrls: ['./drink-credit.component.scss']
})
export class DrinkCreditComponent implements OnInit {

  @Input() user: User;

  constructor() { }

  ngOnInit() {
  }

}
