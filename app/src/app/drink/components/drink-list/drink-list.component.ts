import { Component, OnInit, Input, ChangeDetectionStrategy } from '@angular/core';
import { Drink } from '../../../shared/models';

@Component({
  selector: 'ex-drink-list',
  templateUrl: './drink-list.component.html',
 // styleUrls: ['./drink-list.component.scss']
  
})
export class DrinkListComponent implements OnInit {

  @Input() drs: Drink[];

  constructor() { }

  ngOnInit() {
  }

}
