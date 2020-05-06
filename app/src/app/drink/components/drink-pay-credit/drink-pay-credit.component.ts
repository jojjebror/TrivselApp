import { Component, OnInit } from '@angular/core';
import { AppState } from 'src/app/core/state';
import { Store } from '@ngrx/store';
import * as fromUser from '../../../user/state/users/users.actions';
import * as fromSession from '../../../core/state/session'

@Component({
  selector: 'ex-drink-pay-credit',
  templateUrl: './drink-pay-credit.component.html',
  styleUrls: ['./drink-pay-credit.component.scss']
})
export class DrinkPayCreditComponent implements OnInit {

  userId: number;
  amount: number;
  userCredit: number;
  buttonDisable: boolean = true;
  buttonDisable2: boolean = true;

  constructor(  private store$: Store<AppState>,) { }

  ngOnInit() {
    this.store$.select(fromSession.selectUser).subscribe((currentuser ) => (this.userId = currentuser.id));
    this.store$.select(fromSession.selectUser).subscribe((currentuser ) => (this.userCredit = currentuser.credit));
    this.getUrl();
    console.log(this.userId);
    console.log(this.userCredit);
  }



  getUrl(){
    var newUrl = 'https://mobile-app-007.web.app/?paid=%7B%22result%22:%22paid%22,%22amount%22:1,%22message%22:%22Hälsningar%20Martin%20Loord%22,%22payee%22:%220700914195%22,%22version%22:2%7D';

     //window.location.href;
     var splice = newUrl.slice(37);

        var decode = decodeURI(splice);

         var newJSON = JSON.parse(decode);

        //  var result = Object.values(newJSON).includes("paid");

          var res = newJSON.result;
           this.amount = newJSON.amount;
          console.log(res);
          console.log(this.amount);
          
          if(res === 'paid'){
            //add snackbar? "Ditt köp gick igenom, klicka på updatera saldo".
            this.buttonDisable = false;
            console.log('Ser ut som att din betalning gick igenom! Kul, köp en bira!');
          }
          else {
            // snackBar 'Ditt köp gick inte igenom, klicka på försök igen'.
            this.buttonDisable2 = false;
            console.log('nej du..!');
          }
        
  }

  addCredit(){ 
   var x =  [this.userId, this.amount];
    console.log(x);
     this.store$.dispatch(new fromUser.UpdateCredit(x));
     // add route back to credit? or category
  }
}
