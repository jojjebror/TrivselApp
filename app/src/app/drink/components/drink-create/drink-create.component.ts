import { Component, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';

import { Drink } from '../../../shared/models';

@Component({
	selector: 'ex-drink-create',
	templateUrl: './drink-create.component.html',
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class DrinkCreateComponent {

	@Output() create = new EventEmitter<Drink>();
	

	form: FormGroup = new FormGroup({
    productNameBold: new FormControl('', Validators.required),
    category: new FormControl('', Validators.required),
    volume: new FormControl('', Validators.required),
    price: new FormControl('', Validators.required),
    taste: new FormControl('', Validators.required),
    usage: new FormControl('', Validators.required),
    alcoholPercentage: new FormControl('', Validators.required),
    beverageDescriptionShort: new FormControl('', Validators.required)
	});

	constructor() {}

	onSubmit(): void {
		let drink = this.form.value;
		this.create.emit(drink);
    this.form.reset();
  
	}

}