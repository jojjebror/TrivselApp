import { Component, OnInit, ChangeDetectionStrategy, OnDestroy } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { Store, select, ActionsSubject } from '@ngrx/store';
import { AppState } from 'src/app/core/state';
import { Drink, User, Office } from 'src/app/shared/models';

import * as fromSession from '../../../core/state/session';
import * as fromOffice from '../../../start/state/offices/offices.selectors';
import * as drinksActions from '../../state/drinks';
import * as officesActions from '../../../start/state/offices/offices.actions';
import * as fromDrink from '../../state/drinks/drinks.selectors';
import { FormGroup } from '@angular/forms';
import { MatSnackBar, MatTabChangeEvent, MatDialog } from '@angular/material';
import * as fromOffices from '../../../start/state/offices/';

import * as fromUser from '../../../user/state/users/users.actions';
import { AuthenticationService } from 'src/app/core/services';
import { filter } from 'rxjs/operators';
import { ConfirmDialogModel, ConfirmDialogComponent } from 'src/app/shared/dialogs/confirmDialog/confirmDialog.component';

@Component({
  selector: 'ex-drink',
  templateUrl: './drink-category.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrls: ['./drink-category.component.scss'],
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
  category = [
    { name: 'Budget', price: 10 },
    { name: 'Standard', price: 15 },
    { name: 'Luxury', price: 20 },
  ];

  constructor(
    private store$: Store<AppState>,
    private snackBar: MatSnackBar,
    private dialog: MatDialog,
    private actionsSubject$: ActionsSubject,
    public authService: AuthenticationService
  ) {
    this.subscription1.add(
      authService.getUserId().subscribe((user) => {
        this.userId = user.sub;
      })
    );
  }

  ngOnInit(): void {
    this.store$.select(fromSession.selectUser).subscribe((currentuser) => (this.kontor = currentuser.office));
    this.store$.select(fromSession.selectUser).subscribe((currentuser) => (this.userCredit = currentuser.credit));
    this.store$.dispatch(new fromOffices.LoadOffices());
  }
  //Displays drinks in separate categories based on the selected tabs
  onLinkClick(event: MatTabChangeEvent) {
    if (event.index == 0) {
      this.clickCounter = 0;
    }
    if (event.index == 1) {
      this.initializeFilterBeer();
      this.clickCounter = 0;
    }

    if (event.index == 2) {
      this.initializeFilterWine();
      this.clickCounter = 0;
    }

    if (event.index == 3) {
      this.initializeFilterCider();
      this.clickCounter = 0;
    }
  }
  //Filters out drinks with category "Öl"
  public initializeFilterBeer(): void {
    this.store$.dispatch(new drinksActions.FilterDrink('Öl'));
    this.drs$ = this.store$.select(fromDrink.getFilterDrinks);
  }
  //Filters out drinks with category "Vin"
  public initializeFilterWine(): void {
    this.store$.dispatch(new drinksActions.FilterDrink('Vin'));
    this.drs$ = this.store$.select(fromDrink.getFilterDrinks);
  }
  //Filters out drinks with category "Cider"
  public initializeFilterCider(): void {
    this.store$.dispatch(new drinksActions.FilterDrink('Cider'));
    this.drs$ = this.store$.select(fromDrink.getFilterDrinks);
  }

  //Gets the number to swish based on selected office
  getSwishNumber() {
    this.store$.dispatch(new officesActions.LoadOffices());
    this.ofs$ = this.store$.pipe(select(fromOffice.getUserOffice(this.kontor)));
    this.subscription1.add(
      this.ofs$.subscribe((data: Office) => {
        this.numberToSwish = data.swishNumber;
      })
    );
    return this.numberToSwish;
  }
  //Clickcounter add, displays a snackbar with the number of selected drinks
  public clickCount() {
    this.clickCounter += 1;
    if (this.clickCounter > 1) {
      this.snackBar.open(this.clickCounter + ' drycker valda.', '', {
        duration: 3000,
      });
    } else {
      this.snackBar.open(this.clickCounter + ' dryck vald.', '', {
        duration: 3000,
      });
    }
  }
  //Clickcounter subtract, displays a snackbar with the number of selected drinks
  public clickCountM() {
    if (this.clickCounter > 0) this.clickCounter -= 1;

    if (this.clickCounter > 1 || this.clickCounter == 0) {
      this.snackBar.open(this.clickCounter + ' drycker valda.', '', {
        duration: 3000,
      });
    } else {
      this.snackBar.open(this.clickCounter + ' dryck vald.', '', {
        duration: 3000,
      });
    }
  }

  //gets the total amount to swish based on the amount of selected drinks, then runs addEncodedUrl()
  GetToSwish(drink: Drink) {
    this.totalSum = 0;
    this.totalSum += this.clickCounter * drink.price;

    this.addEncodedUrl(drink);
  }
  //sums the selected prices of drinks and updates the users current credit balance
  paySaldo(drink: Drink) {
    this.totalSum = 0;
    this.totalSum += this.clickCounter * drink.price;
    this.totalSum = -this.totalSum;
    var sum = this.clickCounter * drink.price;
    var data = [this.userId, this.totalSum];
    if (this.userCredit >= sum) {
      this.store$.dispatch(new fromUser.UpdateCredit(data));
    } else {
      this.store$.dispatch(new fromUser.UpdateCreditError('Error'));
    }
    this.showSnackbarSaldo();
  }
  //message dialog with confirm or cancel. If confirm, runs paysaldo()
  confirmPurchase(dr: Drink): void {
    this.totalSum = 0;
    this.totalSum += this.clickCounter * dr.price;
    this.totalSum = -this.totalSum;
    var sum = this.clickCounter * dr.price;
    const message = sum + ' kronor kommer dras från ditt saldo, ok?';
    const dialogData = new ConfirmDialogModel('Bekräfta köp', message);

    if (this.clickCounter > 0) {
      const dialogRef = this.dialog.open(ConfirmDialogComponent, {
        maxWidth: '400px',
        data: dialogData,
      });
      this.subscription1.add(
        dialogRef.afterClosed().subscribe((dialogResult) => {
          if (dialogResult == true) {
            this.paySaldo(dr);
          }
        })
      );
    } else
      this.snackBar.open('Du har inte valt någon produkt!', '', {
        duration: 3000,
      });
  }
  //message dialog with confirm or cancel. If confirm runs GetToSwish()
  confirmPurchaseSwish(dr: Drink): void {
    this.totalSum = 0;
    this.totalSum += this.clickCounter * dr.price;
    this.totalSum = -this.totalSum;
    var sum = this.clickCounter * dr.price;
    const message = 'Du kommer att skickas till swish och betala ' + sum + ' kr, ok?';
    const dialogData = new ConfirmDialogModel('Bekräfta köp', message);

    if (this.clickCounter > 0) {
      const dialogRef = this.dialog.open(ConfirmDialogComponent, {
        maxWidth: '400px',
        data: dialogData,
      });

      this.subscription1.add(
        dialogRef.afterClosed().subscribe((dialogResult) => {
          if (dialogResult == true) {
            this.GetToSwish(dr);
          }
        })
      );
    } else
      this.snackBar.open('Du har inte valt någon produkt!', '', {
        duration: 3000,
      });
  }

  //Gets the required parameters necessary to perform a payment in swish. Puts the parameters in a encoded url which opens swish app.
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
        value: '',
        editable: true,
      },
    };

    var newEncode = JSON.stringify(initField);
    console.log(newEncode);

    var encodedString = encodeURI(newEncode);
    console.log(encodedString);

    var httpUrl = 'swish://payment?data=';
    console.log(httpUrl + encodedString); // var y =  callbackUrl + resultparameter. Lägg till vart swish ska skicka callbackUrl tex'http://exsitecDomän/drink/pay' (resultparamet = ex 'paid')

    // document.location.replace(sendUrl);  var sendUrl = httpUrl + encodedString + callback)
  }

  //Shows a snackbar message when the users creditbalance is updated and when the users creditbalance is too low to perform a payment.
  showSnackbarSaldo() {
    this.subscription1.add(
      this.actionsSubject$.pipe(filter((action: any) => action.type === fromUser.ActionTypes.UPDATE_CREDIT_SUCCESS)).subscribe((action) => {
        this.snackBar.open('Ditt saldo har uppdaterats!', '', {
          duration: 3000,
        });
      })
    );

    this.subscription1.add(
      this.actionsSubject$.pipe(filter((action: any) => action.type === fromUser.ActionTypes.UPDATE_CREDIT_ERROR)).subscribe((action) => {
        setTimeout(() => {
          this.snackBar.open('Du har för lite pengar på ditt saldo! ', '', {
            duration: 12000,
          });
        }, 500);
      })
    );
    this.ngOnDestroy();
  }

  ngOnDestroy() {
    this.subscription1.unsubscribe();
  }
}
