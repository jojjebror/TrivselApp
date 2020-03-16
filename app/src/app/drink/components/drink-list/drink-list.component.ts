import { Component, Input, ChangeDetectionStrategy } from '@angular/core';
import { Drink } from '../../../shared/models';

@Component({
  selector: 'ex-drink-list',
  templateUrl: './drink-list.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrls: ['./drink-list.component.scss']
  
})
export class DrinkListComponent {

  @Input() drs: Drink[];

  constructor() { }

}
