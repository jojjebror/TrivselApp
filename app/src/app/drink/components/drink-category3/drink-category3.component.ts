import { Component, OnInit, ChangeDetectionStrategy } from "@angular/core";
import { Observable } from "rxjs";
import { Store, select } from "@ngrx/store";

import { AppState } from "src/app/core/state";
import { Drink } from "src/app/shared/models";

import * as drinksActions from "../../state/drinks";
import * as fromDrink from "../../state/drinks/drinks.selectors";

@Component({
  selector: "ex-drink",
  templateUrl: "./drink-category3.component.html",
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrls: ["./drink-category3.component.scss"],
})
export class DrinkCategory3Component implements OnInit {
  drs$: Observable<Drink[]>;

  constructor(private store$: Store<AppState>) {}

  ngOnInit(): void {
    this.initializeFilterBeer();
  }

  private initializeDrinks(): void {
    this.store$.dispatch(new drinksActions.LoadDrinks(''));
    this.drs$ = this.store$.select(fromDrink.getDrinks);
  }

  public initializeFilterBeer(): void {
    this.store$.dispatch(new drinksActions.FilterDrink("Cider"));
    this.drs$ = this.store$.select(fromDrink.getFilterDrinks);
  }
}
