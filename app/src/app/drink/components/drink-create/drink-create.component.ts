import { Component, Output, EventEmitter, ChangeDetectionStrategy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { BsLocaleService } from 'ngx-bootstrap';
import { Store, select } from '@ngrx/store';
import { AppState } from 'src/app/core/state';
import { AlertifyService } from 'src/app/core/services/alertify.service';

import { Drink } from '../../../shared/models';
import * as fromDrink from '../../state/drinks/drinks.actions';

@Component({
	selector: 'ex-drink-create',
	templateUrl: './drink-create.component.html',
	styleUrls: ['./drink-create.component.scss']
	
})
export class DrinkCreateComponent implements OnInit {
	@Output() 
	cancelNewDrink = new EventEmitter();
	drink: Drink;
	drinkForm: FormGroup;

	constructor(private store$: Store<AppState>, 
		private router: Router,
		private fb: FormBuilder,
		private alertify: AlertifyService,
		private localeService: BsLocaleService)
		{
			localeService.use('sv');
		}

	ngOnInit() {
		this.createDrinkForm();
		console.log(this.drinkForm);
	}

	createDrinkForm() {
		this.drinkForm = this.fb.group(
			{
				productNameBold: ['', Validators.required],
				price: ['', Validators.required],
				taste: ['', Validators.required],
				volume: ['', Validators.required],
				category: ['', Validators.required],
				image:['']
			},
		);
	}

	createDrink() {
		if (this.drinkForm.valid)
		{
			this.drink = Object.assign({}, this.drinkForm.value);
			this.store$.dispatch(new fromDrink.CreateDrink(this.drink));
			this.alertify.success('Drycken har lagts till!');
			//this.router.navigate(['/drink']);
		}
	}
}

