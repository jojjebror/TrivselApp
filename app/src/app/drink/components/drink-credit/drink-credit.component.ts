import * as officesActions from "../../../start/state/offices/offices.actions";
import * as fromOffices from "../../../start/state/offices/";
import * as fromUser from '../../../user/state/users/users.actions';
import * as fromSession from '../../../core/state/session';

import { Component, OnInit, OnDestroy } from '@angular/core';
import { User, Office} from '../../../shared/models';
import { Observable, Subscription } from 'rxjs';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Store, select } from '@ngrx/store';
import { AppState } from 'src/app/core/state';
import { AuthenticationService } from 'src/app/core/services';
import { ConfirmDialogModel, ConfirmDialogComponent } from 'src/app/shared/dialogs/confirmDialog/confirmDialog.component';
import { MatDialog } from '@angular/material';


@Component({
  selector: 'ex-drink-credit',
  templateUrl: './drink-credit.component.html',
  styleUrls: ['./drink-credit.component.scss']
})
export class DrinkCreditComponent implements OnInit, OnDestroy {
  subscription = new Subscription();
  ofs$: Observable<Office>;
  usr$: Observable<User>;
  user: User;
  office: Office;
  userId: number;
  userCredit: number;
  userInput: number;
  amount: number;
  
  numberToSwish: string;
  kontor: string;
  userCreditForm: FormGroup;
  
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
    let sub = this.store$.select(fromSession.selectUser).subscribe((currentuser) => (this.userCredit = currentuser.credit));
    this.store$.select(fromSession.selectUser).subscribe((currentuser) => (this.kontor = currentuser.office));
     this.createCreditForm();
     this.store$.dispatch(new fromOffices.LoadOffices());
     sub.unsubscribe();
  }
  //creates a credit form with two fields
  createCreditForm() {
      this.userCreditForm = this.fb.group({
        id: [this.userId],
        credit: ['', Validators.required],
      });
  }

  addCredit() {
    var creditInput = [this.userCreditForm.get('credit').value]
      this.user = Object.assign({}, this.userCreditForm.value);
           var data = [this.userId, this.userCreditForm.get('credit').value]
    this.store$.dispatch(new fromUser.UpdateCredit(data));
   
    this.addEncodedUrl();
  }
  //message dialog with confirm or cancel. If confirm, runs addCredit()
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
  //Gets the number to swish based on selected office
  getSwishNumber() {
   this.store$.dispatch(new officesActions.LoadOffices());
       this.ofs$ = this.store$.pipe(select(fromOffices.getUserOffice(this.kontor)));
       this.subscription.add(
         this.ofs$.subscribe((data: Office) => {
          this.numberToSwish = data.swishNumber;
         }));
         return this.numberToSwish;
   };
   
//Gets the required parameters necessary to perform a payment in swish. Puts the parameters in a encoded url which opens swish app.
  addEncodedUrl(){
    var creditInput = this.userCreditForm.get('credit').value
    
    var initField = {
      "version":1,
      "payee":{
      "value": this.getSwishNumber(),
      },
      "amount":{
      "value": creditInput
      },
      "message":{
      "value":"Hälsningar Martin Loord",
      "editable":true
      }
     }
      var newEncode = JSON.stringify(initField);
  
            var encodedString = encodeURI(newEncode);
  
                  var httpUrl = 'swish://payment?data=';
  
                      let urlInput = httpUrl + encodedString;

                     document.location.replace(urlInput);

                     // let callback = &callbackurl=http://localhost:8080/drink/pay&callbackresultparameter=paid add last 
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}