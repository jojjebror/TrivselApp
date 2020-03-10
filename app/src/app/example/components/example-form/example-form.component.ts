import { Component, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';

import { Example } from '../../../shared/models';

@Component({
	selector: 'ex-example-form',
	templateUrl: './example-form.component.html',
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class ExampleFormComponent {

	@Output() create = new EventEmitter<Example>();

	form: FormGroup = new FormGroup({
		name: new FormControl('', Validators.required)
	});

	constructor() {}

	onSubmit(): void {
		let example = this.form.value;
		this.create.emit(example);
		this.form.reset();
	}

}