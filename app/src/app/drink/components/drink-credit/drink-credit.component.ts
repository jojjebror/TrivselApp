import { Component, OnInit, Input, OnDestroy } from '@angular/core';

import { User} from '../../../shared/models';
import { Observable, Subscription } from 'rxjs';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Store, select } from '@ngrx/store';
import { AppState } from 'src/app/core/state';
import * as fromSession from '../../../core/state/session';
import { AuthenticationService } from 'src/app/core/services';
import { ConfirmDialogModel, ConfirmDialogComponent } from 'src/app/shared/components/confirmDialog/confirmDialog.component';
import { MatDialog } from '@angular/material';


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
  
  office: string;
  officeList = [{listoffice:'Linköping', swishNumber: '0768658080'}, {listoffice:'Örebro', swishNumber: '0735469891'},
  {listoffice:'Uppsala', swishNumber: '0767606702'}, {listoffice:'Helsingborg', swishNumber: '073'}, {listoffice:'Göteborg', swishNumber: '0735'},
  {listoffice:'Malmö', swishNumber: '07045'}, {listoffice:'Söderhamn', swishNumber: '07309'}, {listoffice:'Borlänge', swishNumber: '0730922'},
  {listoffice:'Karlstad', swishNumber: '0703345'}, {listoffice:'Stockholm', swishNumber: '0767606702'}];

  constructor(
    private store$: Store<AppState>,
    private fb: FormBuilder,
    public authService: AuthenticationService,
    private dialog: MatDialog,
  ) {
    this.subscription.add(
      authService.getUserId().subscribe((user) => {
        this.userId = user.sub;
      })
    );
   }

  ngOnInit() {
    setTimeout(() => { this.store$.select(fromSession.selectUser).subscribe((currentuser) => (this.userCredit = currentuser.credit)) }, 1000);
    setTimeout(() => { this.store$.select(fromSession.selectUser).subscribe((currentuser) => (this.office = currentuser.office)) }, 1000);
    console.log('userid' + this.userId);
    console.log('credit' + this.userCredit);
     this.createCreditForm();
     this.getOfficeNumber();
  }

  createCreditForm() {
      this.userCreditForm = this.fb.group({
        id: [this.userId],
        credit: ['', Validators.required],
      });
  }

  addCredit() {
    var creditInput = [this.userCreditForm.get('credit').value]
    
      this.user = Object.assign({}, this.userCreditForm.value);
        console.log(this.user);
           var data = [this.userId, this.userCreditForm.get('credit').value]
             console.log(data);
    
    this.addEncodedUrl();
  }

  confirmCredit(): void {
    var creditInput = [this.userCreditForm.get('credit').value]
    const message = 'Är du säker på att du vill sätta in ' + creditInput + 'kr?' ;
    const dialogData = new ConfirmDialogModel('Bekräfta insättning', message);

    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      maxWidth: '400px',
      data: dialogData,
    });

    this.subscription.add(dialogRef.afterClosed().subscribe((dialogResult) => {
      if(dialogResult == true)  {
        this.addCredit();
      }
    }));
  }
getOfficeNumber(){
 
}
  
  addOfficeSwish(){
    for (let element of this.officeList) {
      if (this.office == element.listoffice) 
      var numToSwish = element.swishNumber;
           console.log(element.swishNumber);
     }
     return numToSwish;
  }

  addEncodedUrl(){
    var creditInput = this.userCreditForm.get('credit').value
    
    var initField = {
      "version":1,
      "payee":{
      "value": this.addOfficeSwish()
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