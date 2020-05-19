import { Component, OnInit, Input, OnDestroy } from '@angular/core';

import * as officesActions from "../../../start/state/offices/offices.actions";
import * as fromOffices from "../../../start/state/offices/";

import { User, Office} from '../../../shared/models';
import { Observable, Subscription } from 'rxjs';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Store, select } from '@ngrx/store';
import { AppState } from 'src/app/core/state';
import * as fromSession from '../../../core/state/session';
import { AuthenticationService } from 'src/app/core/services';
import { ConfirmDialogModel, ConfirmDialogComponent } from 'src/app/shared/dialogs/confirmDialog/confirmDialog.component';
import { MatDialog, MatTableDataSource } from '@angular/material';


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

  numberToSwish: string;

  kontor: string;
  ofs$: Observable<Office>;
  office: Office;
  
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
    this.store$.select(fromSession.selectUser).subscribe((currentuser) => (this.userCredit = currentuser.credit));
    this.store$.select(fromSession.selectUser).subscribe((currentuser) => (this.kontor = currentuser.office));
     this.createCreditForm();
     this.store$.dispatch(new fromOffices.LoadOffices());
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

  getSwishNumber() {
   this.store$.dispatch(new officesActions.LoadOffices());
       this.ofs$ = this.store$.pipe(select(fromOffices.getUserOffice(this.kontor)));
       this.subscription.add(
         this.ofs$.subscribe((data: Office) => {
          this.numberToSwish = data.swishNumber;
         }));
         
         return this.numberToSwish;
   };

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