import { Component, OnInit, ChangeDetectionStrategy, Input } from "@angular/core";
import { Observable, Subscription } from "rxjs";
import { Store, select } from "@ngrx/store";

import { AppState } from "src/app/core/state";
import { Drink, Price } from "src/app/shared/models";

import * as drinksActions from "../../state/drinks";
import * as fromDrink from "../../state/drinks/drinks.selectors";
import * as fromPrice from "../../../price/state/prices/prices.selectors";
import * as pricesActions from "../../../price/state/prices";

@Component({
  selector: "ex-drink",
  templateUrl: "./drink-category.component.html",
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrls: ["./drink-category.component.scss"],
})
export class DrinkCategoryComponent implements OnInit {
  drs$: Observable<Drink[]>;
  categoryOne: boolean = false;
  prs$: Observable<Price[]>;
  private subscription = new Subscription();

  constructor(private store$: Store<AppState>) {}

 

  ngOnInit(): void {
    this.initializeFilterBeer();
    this.loadPrices();
  }

  public initializeFilterBeer(): void {
    this.store$.dispatch(new drinksActions.FilterDrink("Öl"));
    this.drs$ = this.store$.select(fromDrink.getFilterDrinks);
  }

  public loadPrices(): void {
    this.store$.dispatch(new pricesActions.LoadPrices("Öl"));
    this.prs$ = this.store$.select(fromPrice.getPrices)
  }

}
