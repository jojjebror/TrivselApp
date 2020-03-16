import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';

import { AppState } from 'src/app/core/state';

import * as fromDrinks from '../state/drinks';
import { Drink } from 'src/app/shared/models';

@Component({
  selector: 'ex-drink',
  templateUrl: './drink.component.html',
  styleUrls: ['./drink.component.scss']
})
export class DrinkComponent implements OnInit {

  drs$: Observable<Drink[]>;

  constructor(private store$: Store<AppState>) { }

  ngOnInit(): void {
    this.initializeEvents();
  }

  createDrink(dr: Drink): void {
    this.store$.dispatch(new fromDrinks.Create(dr));
  }

  private initializeEvents(): void {
    this.store$.dispatch(new fromDrinks.Load());
    this.drs$ = this.store$.select(fromDrinks.selectDrinks);
  }

 

}
