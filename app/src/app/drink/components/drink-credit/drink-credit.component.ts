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
  userCredit: number;
  userCreditForm: FormGroup;
  user: User;

  

  constructor(
    private store$: Store<AppState>,
    private route: ActivatedRoute,
    private alertify: AlertifyService,
    private fb: FormBuilder,
    private router: Router
  ) { }


  ngOnInit() {
   this.createCreditForm();
  }

  createCreditForm() {
   // this.usr$.subscribe((user) => {
      this.userCreditForm = this.fb.group({
        credit: ['', Validators.required],
      });
    
  }
  addCredit() {
   this.store$.select(fromSession.selectUser).subscribe((user)=> (this.userCredit = user.credit))
    var newSaldo = this.userCreditForm.value + this.userCredit;
      this.user = Object.assign({}, this.userCreditForm.value + this.userCredit);
      console.log(newSaldo);
      this.store$.dispatch(new fromUser.UpdateCredit(this.user));
      this.alertify.success("Ditt saldo är ändrat!");
      console.log(this.userCreditForm.get('credit'));
    
  }

}