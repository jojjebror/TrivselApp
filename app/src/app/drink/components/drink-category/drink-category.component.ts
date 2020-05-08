import { Component, OnInit, ChangeDetectionStrategy, Input, OnDestroy } from "@angular/core";
import { Observable, Subscription } from "rxjs";
import { Store, select, ActionsSubject } from "@ngrx/store";
import {MatTooltipModule} from '@angular/material/tooltip';
import { AppState } from "src/app/core/state";
import { Drink, User } from "src/app/shared/models";

import * as fromSession from "../../../core/state/session";
import * as drinksActions from "../../state/drinks";
import * as fromDrink from "../../state/drinks/drinks.selectors";
import { FormGroup } from "@angular/forms";
import { MatSnackBar } from '@angular/material';
import { AlertifyService } from "src/app/core/services/alertify.service";
import * as fromUser from '../../../user/state/users/users.actions';
import { ActivatedRoute } from "@angular/router";
import { AuthenticationService } from "src/app/core/services";
import { filter } from "rxjs/operators";

@Component({
  selector: "ex-drink",
  templateUrl: "./drink-category.component.html",
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrls: ["./drink-category.component.scss"],
})
export class DrinkCategoryComponent implements OnInit, OnDestroy {
  subscription = new Subscription();
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
  category = [{name:'Budget',price: 10,}, {name:'Standard',price: 15,}, {name:'Luxury',price: 20,}];
  
  

  constructor(
    private store$: Store<AppState>, private snackBar: MatSnackBar,
    private alertify: AlertifyService,
    private route: ActivatedRoute, private actionsSubject$: ActionsSubject, public authService: AuthenticationService
    ) {this.subscription.add(
      authService.getUserId().subscribe((user) => {
        this.userId = user.sub;
      })
    );}

  ngOnInit(): void {
    this.initializeFilterCategory();
    setTimeout(() => { this.store$.select(fromSession.selectUser).subscribe((currentuser) => (this.userCredit = currentuser.credit)) }, 500);
    this.getClickedId();
  }

  public initializeFilterBeer(): void {
    this.store$.dispatch(new drinksActions.FilterDrink("Öl"));
      this.drs$ = this.store$.select(fromDrink.getFilterDrinks);
  }

  public initializeFilterWine(): void {
    this.store$.dispatch(new drinksActions.FilterDrink("Vin"));
      this.drs$ = this.store$.select(fromDrink.getFilterDrinks);
  }

  public initializeFilterCider(): void {
    this.store$.dispatch(new drinksActions.FilterDrink("Cider"));
      this.drs$ = this.store$.select(fromDrink.getFilterDrinks);
  }

  public initializeFilterCategory(): void {
    this.store$.dispatch(new drinksActions.FilterDrink("Kategori"));
      this.drs$ = this.store$.select(fromDrink.getFilterDrinks);
  }

  public getClickedId() {
    var id = Number(this.route.snapshot.paramMap.get("id"));
     this.id = id;
         return id;
  }

  editDrink(id: number) {
    this.store$.dispatch(new drinksActions.LoadDrink(id));
  }

  public clickCount() {
    this.clickCounter += 1;
    console.log(this.clickCounter);
  }
  public clickCountM() {
    if (this.clickCounter > 0) this.clickCounter -= 1;
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
      if (confirm("Du kommer skickas vidare till swish och betala " + sum + "kr.")
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
      if (confirm("Total summa som dras från saldo är " + sum + "kr, fortsätta?")){
        this.store$.dispatch(new fromUser.UpdateCredit(data));
        }
    } 
    else { this.store$.dispatch(new fromUser.UpdateCreditError('Error'));}
    this.showSnackbarSaldo();
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

  showSnackbarSaldo() {
    this.subscription.add(
      this.actionsSubject$.pipe(filter((action: any) => action.type === fromUser.ActionTypes.UPDATE_CREDIT_SUCCESS)).subscribe((action) => {
        this.snackBar.open('Ditt saldo har uppdaterats', '', { duration: 3000 });
      }) );

      this.subscription.add(
        this.actionsSubject$.pipe(filter((action: any) => action.type === fromUser.ActionTypes.UPDATE_CREDIT_ERROR)).subscribe((action) => {
          setTimeout(() => {  this.snackBar.open('Du har för lite pengar på ditt saldo! ', '', { duration: 12000 }) }, 500);
        }) );
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}
