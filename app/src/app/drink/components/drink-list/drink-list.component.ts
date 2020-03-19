import { Component, Input, ChangeDetectionStrategy, OnInit } from '@angular/core';
import { Drink } from '../../../shared/models';
import { AppState } from 'src/app/core/state';
import * as drinkActions from '../../state/drinks';
import * as fromDrink from '../../state/drinks/drinks.selectors';
import { Observable } from 'rxjs';
import { Store, select } from '@ngrx/store';

@Component({
  selector: 'ex-drink-list',
  templateUrl: './drink-list.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrls: ['./drink-list.component.scss']
  
})
export class DrinkListComponent implements OnInit {
  drk$: Observable<Drink[]>;

  constructor(private store$: Store<AppState>) {}

  ngOnInit() {
    this.InitializeEvents();
  }

  private InitializeEvents(): void {
    this.store$.dispatch(new drinkActions.LoadDrinks());
    this.drk$ = this.store$.pipe(select(fromDrink.selectDrinks));
  }

/*
  deleteDrink(drink: Drink) {
    if (confirm("Are You Sure You want to Delete this drink?")) {
      this.store$.dispatch(new drinkActions.DeleteDrink(drink.id));
    }
  }
  */

}
