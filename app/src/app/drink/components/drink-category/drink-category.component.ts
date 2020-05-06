import { Component, OnInit, ChangeDetectionStrategy, Input } from "@angular/core";
import { Observable, Subscription } from "rxjs";
import { Store, select } from "@ngrx/store";
import {MatTooltipModule} from '@angular/material/tooltip';
import { AppState } from "src/app/core/state";
import { Drink, User } from "src/app/shared/models";

import * as fromSession from "../../../core/state/session";
import * as drinksActions from "../../state/drinks";
import * as fromDrink from "../../state/drinks/drinks.selectors";
import { FormGroup } from "@angular/forms";
import { AlertifyService } from "src/app/core/services/alertify.service";
import * as fromUser from '../../../user/state/users/users.actions';
import { ActivatedRoute } from "@angular/router";

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

  dr$: Observable<Drink>;
  id: number;
  isShown: boolean = false; // hidden by default

  clickCounter: number = 0;
  totalSum: number = 0;
  userCredit: number;

  constructor(
    private store$: Store<AppState>,
    private alertify: AlertifyService,
    private route: ActivatedRoute,
    ) {}

 

  ngOnInit(): void {
    
    this.initializeFilterCategory();
    
    this.store$
      .select(fromSession.selectUser)
      .subscribe((currentuser) => (this.userCredit = currentuser.credit));
      this.store$
      .select(fromSession.selectUser)
      .subscribe((currentuser) => (this.userId = currentuser.id));
    this.getClickedId();
    
  }

  public initializeFilterBeer(): void {
    this.store$.dispatch(new drinksActions.FilterDrink("Öl"));
    
    this.drs$ = this.store$.select(fromDrink.getFilterDrinks);
  }

  public initializeFilterCategory(): void {

    this.store$.dispatch(new drinksActions.FilterDrink("Kategori"));
    
    this.drs$ = this.store$.select(fromDrink.getFilterDrinks);
  }

  public getClickedId() {
    var id = Number(this.route.snapshot.paramMap.get("id"));
    this.id = id;
    console.log(id);
    return id;
  }

  editDrink(id: number) {
    this.store$.dispatch(new drinksActions.LoadDrink(id));
    console.log(id);
  }

  public clickCount() {
    
    this.clickCounter += 1;
    console.log(this.clickCounter);
  }
  public clickCountM() {
    
    if (this.clickCounter > 1) this.clickCounter -= 1;
    console.log(this.clickCounter);
  }

  toggleShow() {
    this.isShown = !this.isShown;
  }

  GetToSwish(drink: Drink) {
    this.totalSum = 0;
    this.totalSum += this.clickCounter * drink.price;
    var sum = this.clickCounter * drink.price;
    console.log(this.totalSum);
    
      if (
        confirm("Du kommer skickas vidare till swish och betala " + sum + "kr.")
      ) {
        this.addEncodedUrl(drink);
      }
    
  }

  paySaldo(drink: Drink) {
    this.totalSum = 0;
    this.totalSum += this.clickCounter * drink.price;
    this.totalSum = -this.totalSum;
    var sum = this.clickCounter * drink.price;
    var data = [this.userId, this.totalSum];
    console.log(this.totalSum);
    if (this.userCredit >= sum) {
      if (
        confirm("Total summa som dras från saldo är " + sum + "kr, fortsätta?")
      ) {
        this.store$.dispatch(new fromUser.UpdateCredit(data));

        this.alertify.success("Värdet för ditt saldo har ändrats!");
      }
    } else this.alertify.error("Du har för lite pengar på ditt saldo!");
  }

  addEncodedUrl(drink: Drink) {
    var sumPriceToSwish = this.clickCounter * drink.price;

    var initField = {
      version: 1,
      payee: {
        value: "+46707662691",
      },
      amount: {
        value: sumPriceToSwish,
      },
      message: {
        value: "",
        editable: true,
      },
    };

    console.log(initField);

    var newEncode = JSON.stringify(initField);

    console.log(newEncode);

    var encodedString = encodeURI(newEncode);

    console.log(encodedString);

    var httpUrl = "swish://payment?data=";

    console.log(httpUrl + encodedString);
  }

}
