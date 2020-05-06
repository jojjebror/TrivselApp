import { Component, OnInit, OnDestroy } from '@angular/core';
import { AppState } from 'src/app/core/state';
import { Store, ActionsSubject } from '@ngrx/store';
import * as fromUser from '../../../user/state/users/users.actions';
import * as fromSession from '../../../core/state/session'
import { MatSnackBar } from '@angular/material';
import { Subscription } from 'rxjs';
import { filter } from 'rxjs/operators';
import { AuthenticationService } from 'src/app/core/services';

@Component({
  selector: 'ex-drink-pay-credit',
  templateUrl: './drink-pay-credit.component.html',
  styleUrls: ['./drink-pay-credit.component.scss']
})
export class DrinkPayCreditComponent implements OnInit, OnDestroy {
  subscription = new Subscription();
  userId: number;
  amount: number;
  userCredit: number;

  constructor(private store$: Store<AppState>, private snackBar: MatSnackBar, private actionsSubject$: ActionsSubject, public authService: AuthenticationService) {
    this.subscription.add(
    authService.getUserId().subscribe((user) => {
      this.userId = user.sub;
    })
  );
}
  ngOnInit() {
    this.getUrl();
    console.log('userId'+ this.userId);
  } 

  getUrl(){
    var newUrl = 'https://mobile-app-007.web.app/?paid=%7B%22result%22:%22paid%22,%22amount%22:1,%22message%22:%22Hälsningar%20Martin%20Loord%22,%22payee%22:%220700914195%22,%22version%22:2%7D';
     //window.location.href;
    
     var splice = newUrl.slice(37);

      var decode = decodeURI(splice);

        var newJSON = JSON.parse(decode);

          var res = newJSON.result;
            
            this.amount = newJSON.amount;
          console.log(res);
          console.log(this.amount);
          
          if(res === 'paid'){
            //add snackbar? "Ditt köp gick igenom, klicka på updatera saldo".
            console.log('Ser ut som att din betalning gick igenom! Kul, köp en bira!');
            var x =  [this.userId, this.amount];
            console.log(x);
             this.store$.dispatch(new fromUser.UpdateCredit(x));

             this.subscription.add(
              this.actionsSubject$.pipe(filter((action: any) => action.type === fromUser.ActionTypes.UPDATE_CREDIT_SUCCESS)).subscribe((action) => {
                this.snackBar.open('Ditt saldo har uppdaterats', '', { duration: 3000 });
              }) ); }
          else {
            // snackBar 'Ditt köp gick inte igenom, klicka på försök igen'.
            console.log('nej du..!');
          }
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
 // addCredit(){ 
 //  var x =  [this.userId, this.amount];
 //   console.log(x);
 //    this.store$.dispatch(new fromUser.UpdateCredit(x));
     // add route back to credit? or category
 // }
}
