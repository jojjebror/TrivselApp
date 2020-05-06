import { Component, OnInit, Input, OnDestroy } from '@angular/core';

import { User } from '../../../shared/models';
import { Observable, Subscription } from 'rxjs';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Store, select } from '@ngrx/store';
import { AppState } from 'src/app/core/state';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertifyService } from 'src/app/core/services/alertify.service';
import * as fromUser from '../../../user/state/users/users.actions';
import * as fromSession from '../../../core/state/session'
import { AuthenticationService } from 'src/app/core/services';

@Component({
  selector: 'ex-drink-credit',
  templateUrl: './drink-credit.component.html',
  styleUrls: ['./drink-credit.component.scss']
})
export class DrinkCreditComponent implements OnInit, OnDestroy {
  subscription = new Subscription();
  usr$: Observable<User>;
  userId: number;
  userCreditForm: FormGroup;
  user: User;
  userCredit: number;
  userInput: number;



   
  constructor(
    private store$: Store<AppState>,
    private route: ActivatedRoute,
    private alertify: AlertifyService,
    private fb: FormBuilder,
    private router: Router,
    public authService: AuthenticationService
  ) {
    this.subscription.add(
      authService.getUserId().subscribe((user) => {
        this.userId = user.sub;
      })
    );
   }


  ngOnInit() {
    setTimeout(() => { this.store$.select(fromSession.selectUser).subscribe((currentuser) => (this.userCredit = currentuser.credit)) }, 500);
    console.log('userid' + this.userId);
    console.log('credit' + this.userCredit);
     this.createCreditForm();
     
  }

  createCreditForm() {
    
   // this.usr$.subscribe((user) => {
      this.userCreditForm = this.fb.group({
        id: [this.userId],
        credit: ['', Validators.required],
      });
    
  }
  addCredit() {
    var creditInput = [this.userCreditForm.get('credit').value]
    if(confirm("Swisha " + creditInput + "kr till saldo?")) {
      this.user = Object.assign({}, this.userCreditForm.value);
    console.log(this.user);

    var data = [this.userId, this.userCreditForm.get('credit').value]
      console.log(data);
    this.store$.dispatch(new fromUser.UpdateCredit(data));
    this.alertify.success("Värdet för ditt saldo har ändrats!");
    }
    this.addEncodedUrl();
  }

  addEncodedUrl(){
    var creditInput = this.userCreditForm.get('credit').value
    
    
    var initField = {
      "version":1,
      "payee":{
      "value":"+46700914195"
      },
      "amount":{
      "value": creditInput
      },
      "message":{
      "value":"Hälsningar Martin Loord",
      "editable":true
      }
     }
  
     console.log(initField);
  
      var newEncode = JSON.stringify(initField);
  
         console.log(newEncode);
  
            var encodedString = encodeURI(newEncode);
  
                console.log(encodedString);
  
                  var httpUrl = 'swish://payment?data=';
  
                     console.log(httpUrl + encodedString);

                      let urlInput = httpUrl + encodedString;

                     document.location.replace(urlInput);

                     // let callback = &callbackurl=http://localhost:8080/drink/pay&callbackresultparameter=paid add last 
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}