import { Component, OnInit, ChangeDetectionStrategy} from '@angular/core';
import { Observable } from 'rxjs';
import { Store, select } from '@ngrx/store';

import { AppState } from 'src/app/core/state';
import { Drink } from 'src/app/shared/models';

import * as drinksActions from '../../state/drinks';
import * as fromDrink from '../../state/drinks/drinks.selectors';
import { text } from '@angular/core/src/render3';


@Component({
  selector: 'ex-drink',
  templateUrl: './drink-category.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrls: ['./drink-category.component.scss']
})

export class DrinkCategoryComponent implements OnInit {

  drs$: Observable<Drink[]>;
  categoryOne: boolean = false;
  text: string;
  
  

  constructor(private store$: Store<AppState>) { 
 

  }

  
  ngOnInit(): void {
    this.instializeFilterBeer();

  }

  
  public instializeFilterBeer(): void {
    this.store$.dispatch(new drinksActions.FilterDrink('Öl'));
    this.drs$ = this.store$.select(fromDrink.getDrinks);
  }

}