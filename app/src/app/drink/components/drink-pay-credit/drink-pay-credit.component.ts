import { Component, OnInit, OnDestroy } from '@angular/core';
import { AppState } from 'src/app/core/state';
import { Store, ActionsSubject } from '@ngrx/store';
import * as fromUser from '../../../user/state/users/users.actions';
import * as fromSession from '../../../core/state/session'
import { MatSnackBar } from '@angular/material';
import { Subscription } from 'rxjs';
import { filter } from 'rxjs/operators';
import { AuthenticationService } from 'src/app/core/services';
import { Router } from '@angular/router';
import { User } from 'src/app/shared/models';

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
  user: User;
  
  constructor(private store$: Store<AppState>, private snackBar: MatSnackBar, private router: Router,
  private actionsSubject$: ActionsSubject, public authService: AuthenticationService,) {
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
     let nya = window.location.href;
    console.log('kolla in detta ' + nya);
     var splice = newUrl.slice(37);

      var decode = decodeURI(splice);

        var newJSON = JSON.parse(decode);

          var res = newJSON.result;
            
            this.amount = newJSON.amount;
          console.log(res);
          console.log(this.amount);
          
          if(res === 'paid'){
            console.log('Ser ut som att din betalning gick igenom! Kul, köp en bira!');
            var x =  [this.userId, this.amount];
            console.log(x);
             this.store$.dispatch(new fromUser.UpdateCredit(x)); }
          else {
            console.log('nej du..!');
            this.store$.dispatch(new fromUser.UpdateCreditError('Error'));
            this.router.navigate(['/drink/credit']);
          }
            this.showSnackbar();
  }

  showSnackbar() {
    this.subscription.add(
      this.actionsSubject$.pipe(filter((action: any) => action.type === fromUser.ActionTypes.UPDATE_CREDIT_SUCCESS)).subscribe((action) => {
        this.snackBar.open('Ditt saldo har uppdaterats', '', { duration: 3000 });
      }) );

      this.subscription.add(
        this.actionsSubject$.pipe(filter((action: any) => action.type === fromUser.ActionTypes.UPDATE_CREDIT_ERROR)).subscribe((action) => {
          setTimeout(() => {  this.snackBar.open('Din betalning gick inte igenom, var god försök igen', '', { duration: 12000 }) }, 500);
        }) );
  }
  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
