import { Component, OnInit, Input } from '@angular/core';

import { User } from '../../../shared/models';
import { Observable } from 'rxjs';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Store, select } from '@ngrx/store';
import { AppState } from 'src/app/core/state';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertifyService } from 'src/app/core/services/alertify.service';
import * as fromUser from '../../../user/state/users/users.actions';
import * as fromSession from '../../../core/state/session'

@Component({
  selector: 'ex-drink-credit',
  templateUrl: './drink-credit.component.html',
  styleUrls: ['./drink-credit.component.scss']
})
export class DrinkCreditComponent implements OnInit {

  usr$: Observable<User>;
  userId: number;
  userCreditForm: FormGroup;
  user: User;
  userCredit: number;

  

  constructor(
    private store$: Store<AppState>,
    private route: ActivatedRoute,
    private alertify: AlertifyService,
    private fb: FormBuilder,
    private router: Router
  ) { }


  ngOnInit() {
    this.store$.select(fromSession.selectUser).subscribe((currentuser ) => (this.userId = currentuser.id));
    this.store$.select(fromSession.selectUser).subscribe((currentuser ) => (this.userCredit = currentuser.credit));
    console.log(this.userId);
    console.log(this.userCredit);
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

    this.user = Object.assign({}, this.userCreditForm.value);
    console.log(this.user);

    var data = [this.userId, this.userCreditForm.get('credit').value]

    this.store$.dispatch(new fromUser.UpdateCredit(data));
    this.alertify.success("Världet för ditt saldo har ändrats!");
    
  }


}