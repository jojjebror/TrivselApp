import { Component, Input, ChangeDetectionStrategy, Output, EventEmitter } from '@angular/core';
import { Drink } from '../../../shared/models';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/core/state';
import * as fromDrinks from '../../state/drinks/drinks.actions';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'ex-drink-list',
  templateUrl: './drink-list.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrls: ['./drink-list.component.scss']
  
})
export class DrinkListComponent {

  @Input() drs: Drink[];
  @Output() delete = new EventEmitter<Drink>();

  formDr: FormGroup = new FormGroup({
    id: new FormControl('', Validators.required),
    
	});

  constructor(private store$: Store<AppState>) { }

  onSubmit(): void {
		let drink = this.formDr.value;
		this.delete.emit(drink);
    this.formDr.reset();
  }



}
