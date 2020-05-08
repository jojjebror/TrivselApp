import { Component, OnInit, Input, OnDestroy } from '@angular/core';

import { User } from '../../../shared/models';
import { Observable, Subscription } from 'rxjs';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Store, select } from '@ngrx/store';
import { AppState } from 'src/app/core/state';
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
  kontor: string;
  offices = [{kontor:'Linköping', swishNumber: '0768658080'}, {kontor:'Örebro', swishNumber: '0735469891'},
  {kontor:'Uppsala', swishNumber: '070'}, {kontor:'Helsingborg', swishNumber: '073'}, {kontor:'Göteborg', swishNumber: '0735'},
  {kontor:'Malmö', swishNumber: '07045'}, {kontor:'Söderhamn', swishNumber: '07309'}, {kontor:'Borlänge', swishNumber: '0730922'},
  {kontor:'Karlstad', swishNumber: '0703345'}, {kontor:'Stockholm', swishNumber: '04847575'}];

  constructor(
    private store$: Store<AppState>,
    private fb: FormBuilder,
    public authService: AuthenticationService
  ) {
    this.subscription.add(
      authService.getUserId().subscribe((user) => {
        this.userId = user.sub;
      })
    );
   }

  ngOnInit() {
    setTimeout(() => { this.store$.select(fromSession.selectUser).subscribe((currentuser) => (this.userCredit = currentuser.credit)) }, 1000);
    this.store$.select(fromSession.selectUser).subscribe((currentuser) => (this.kontor = currentuser.office));
    console.log('userid' + this.userId);
    console.log('credit' + this.userCredit);
     this.createCreditForm();
     console.log(this.kontor);
     for (let element of this.offices) {
      if (this.kontor == element.kontor) 
           console.log(element.swishNumber);
     }
  }

  createCreditForm() {
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