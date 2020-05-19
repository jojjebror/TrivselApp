import { Component, OnInit, ChangeDetectionStrategy, Input, OnDestroy } from "@angular/core";
import { Observable, Subscription } from "rxjs";
import { Store, select, ActionsSubject, defaultStateFn } from "@ngrx/store";
import {MatTooltipModule} from '@angular/material/tooltip';
import { AppState } from "src/app/core/state";
import { Drink, User, Office } from "src/app/shared/models";

import * as fromSession from "../../../core/state/session";
import * as fromOffice from "../../../start/state/offices/offices.selectors"; 
import * as drinksActions from "../../state/drinks";
import * as officesActions from "../../../start/state/offices/offices.actions";
import * as fromDrink from "../../state/drinks/drinks.selectors";
import { FormGroup } from "@angular/forms";
import { MatSnackBar, MatTabChangeEvent, MatDialog } from '@angular/material';
import * as fromOffices from "../../../start/state/offices/";

import * as fromUser from '../../../user/state/users/users.actions';
import { ActivatedRoute } from "@angular/router";
import { AuthenticationService } from "src/app/core/services";
import { filter } from "rxjs/operators";
import { ConfirmDialogModel, ConfirmDialogComponent } from 'src/app/shared/dialogs/confirmDialog/confirmDialog.component';

@Component({
  selector: "ex-drink",
  templateUrl: "./drink-category.component.html",
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrls: ["./drink-category.component.scss"],
})
export class DrinkCategoryComponent implements OnInit, OnDestroy {
  subscription1 = new Subscription();
  drs$: Observable<Drink[]>;
  dr$: Observable<Drink>;
  dr: Drink;
  usr$: Observable<User>;
  userCreditForm: FormGroup;
  ofs$: Observable<Office>;
  user: User;
  kontor: string;
  numberToSwish: string;
  
  
  isShown: boolean = false; // hidden by default
  
  userId: number;
  id: number;
  clickCounter: number = 0;
  totalSum: number = 0;
  userCredit: number;
  category = [{name:'Budget', price: 10,}, {name:'Standard', price: 15,}, {name:'Luxury', price: 20,}];
  

  constructor(
    private store$: Store<AppState>, private snackBar: MatSnackBar,
    private dialog: MatDialog,
    private route: ActivatedRoute, private actionsSubject$: ActionsSubject, public authService: AuthenticationService
    ) {this.subscription1.add(
      authService.getUserId().subscribe((user) => {
        this.userId = user.sub;
      })
    );}

  ngOnInit(): void {
     this.store$.select(fromSession.selectUser).subscribe((currentuser) => (this.kontor = currentuser.office));
     this.store$.select(fromSession.selectUser).subscribe((currentuser) => (this.userCredit = currentuser.credit));
    this.store$.dispatch(new fromOffices.LoadOffices());
  }

  onLinkClick(event: MatTabChangeEvent) {
    if(event.index == 1)
    this.initializeFilterBeer();

    if(event.index == 2)
      this.initializeFilterWine();
    
    if(event.index == 3)
      this.initializeFilterCider();
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

  editDrink(id: number) {
    this.store$.dispatch(new drinksActions.LoadDrink(id));
  }

 getSwishNumber() {
  this.store$.dispatch(new officesActions.LoadOffices());
      this.ofs$ = this.store$.pipe(select(fromOffice.getUserOffice(this.kontor)));
      this.subscription1.add(
        this.ofs$.subscribe((data: Office) => {
         console.log(data.swishNumber);
         this.numberToSwish = data.swishNumber;
        }));
        
        return this.numberToSwish;
  };
  public clickCount() {
    this.clickCounter += 1;
    console.log(this.clickCounter);
    if (this.clickCounter > 1) {
      this.snackBar.open(this.clickCounter + ' drycker valda.', '', { duration: 3000 });
    }
    else {
      this.snackBar.open(this.clickCounter + ' dryck vald.', '', { duration: 3000 });
    }

    
  }
  public clickCountM() {
    if (this.clickCounter > 0) this.clickCounter -= 1;
    console.log(this.clickCounter);

    if (this.clickCounter > 1) {
      this.snackBar.open(this.clickCounter + ' drycker valda.', '', { duration: 3000 });
    }
    else {
      this.snackBar.open(this.clickCounter + ' dryck vald.', '', { duration: 3000 });
    }
    
  }

  toggleShow() {
    this.isShown = !this.isShown;
  }

  GetToSwish(drink: Drink) {
    this.totalSum = 0;
    this.totalSum += this.clickCounter * drink.price;
    var sum = this.clickCounter * drink.price;
    console.log(this.totalSum);
       {
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
    
        this.store$.dispatch(new fromUser.UpdateCredit(data));
    } 
    else { this.store$.dispatch(new fromUser.UpdateCreditError('Error'));}
    this.showSnackbarSaldo();
  }

  confirmPurchase(dr: Drink): void {
    this.totalSum = 0;
    this.totalSum += this.clickCounter * dr.price;
    this.totalSum = -this.totalSum;
    var sum = this.clickCounter * dr.price;
    const message = sum + ' kronor kommer dras från ditt saldo, ok?';
    const dialogData = new ConfirmDialogModel('Bekräfta köp', message);
  
    if(this.clickCounter > 0){
  const dialogRef = this.dialog.open(ConfirmDialogComponent, {
    maxWidth: '400px',
    data: dialogData,
  });
  this.subscription1.add(dialogRef.afterClosed().subscribe((dialogResult) => {
    if(dialogResult == true)  {
        this.paySaldo(dr);
      }
    }));
  } else 
    this.snackBar.open('Du har inte valt någon produkt!', '', { duration: 3000 });
}

confirmPurchaseSwish(dr: Drink): void {
    this.totalSum = 0;
    this.totalSum += this.clickCounter * dr.price;
    this.totalSum = -this.totalSum;
    var sum = this.clickCounter * dr.price;
    const message = 'Du kommer att skickas till swish och betala ' + sum + ' kr, ok?';
    const dialogData = new ConfirmDialogModel('Bekräfta köp', message);

    if(this.clickCounter > 0){
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      maxWidth: '400px',
      data: dialogData,
    });

    this.subscription1.add(dialogRef.afterClosed().subscribe((dialogResult) => {
      if(dialogResult == true)  {
        this.GetToSwish(dr);
      }
    }));
  } else
    this.snackBar.open('Du har inte valt någon produkt!', '', { duration: 3000 });
   }

  addEncodedUrl(drink: Drink) {
    var sumPriceToSwish = this.clickCounter * drink.price;
    
    var initField = {
      version: 1,
      payee: {
        value: this.getSwishNumber(),
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

    console.log(httpUrl + encodedString); // var x =  callbackUrl + resultparameter lägg till var swish ska skicka url 'http://vårdomän/drink/pay
  }

  showSnackbarSaldo() {
    this.subscription1.add(
      this.actionsSubject$.pipe(filter((action: any) => action.type === fromUser.ActionTypes.UPDATE_CREDIT_SUCCESS)).subscribe((action) => {
        this.snackBar.open('Ditt saldo har uppdaterats!', '', { duration: 3000 });
      }) );

      this.subscription1.add(
        this.actionsSubject$.pipe(filter((action: any) => action.type === fromUser.ActionTypes.UPDATE_CREDIT_ERROR)).subscribe((action) => {
          setTimeout(() => {  this.snackBar.open('Du har för lite pengar på ditt saldo! ', '', { duration: 12000 }) }, 500);
        }) );
        this.ngOnDestroy();
  }

  ngOnDestroy() {
    this.subscription1.unsubscribe();
  }

}
