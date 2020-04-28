import { Component, OnInit, ChangeDetectionStrategy } from "@angular/core";
import { Observable } from "rxjs";
import { Store, select } from "@ngrx/store";

import { AppState } from "src/app/core/state";
import { Drink, User } from "src/app/shared/models";

import * as drinksActions from "../../state/drinks";
import * as fromDrink from "../../state/drinks/drinks.selectors";
import { FormGroup } from "@angular/forms";
import { AlertifyService } from "src/app/core/services/alertify.service";
import * as fromUser from '../../../user/state/users/users.actions';

@Component({
  selector: "ex-drink",
  templateUrl: "./drink-category.component.html",
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrls: ["./drink-category.component.scss"],
})
export class DrinkCategoryComponent implements OnInit {
  drs$: Observable<Drink[]>;
  userCreditForm: FormGroup;
  usr$: Observable<User>;
  userId: number;
  user: User;
  dr: Drink;

  constructor(
    private store$: Store<AppState>,
    private alertify: AlertifyService,) {}

  ngOnInit(): void {
    this.initializeFilterCategory();
  }

  public initializeFilterBeer(): void {
    this.store$.dispatch(new drinksActions.FilterDrink("Öl"));
    
    this.drs$ = this.store$.select(fromDrink.getFilterDrinks);
  }


  public initializeFilterCategory(): void {

    this.store$.dispatch(new drinksActions.FilterDrink("Kategori"));
    
    this.drs$ = this.store$.select(fromDrink.getFilterDrinks);
  }

}
