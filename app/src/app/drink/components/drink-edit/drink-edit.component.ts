import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Drink } from 'src/app/shared/models';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/core/state';
import { Router } from '@angular/router';
import { BsLocaleService } from 'ngx-bootstrap';

import * as drinksActions from "../../state/drinks/drinks.actions";
import * as fromDrink from '../../state/drinks/';
import { Observable } from 'rxjs';

@Component({
  selector: 'ex-drink-edit',
  templateUrl: './drink-edit.component.html',
  styleUrls: ['./drink-edit.component.scss']
})
export class DrinkEditComponent implements OnInit {
  drinkForm: FormGroup;
  @Output() 
	cancelNewDrink = new EventEmitter();
	drink: Drink;
	

  constructor(private store$: Store<AppState>, 
		private router: Router,
    private fb: FormBuilder
    ) {}

  ngOnInit() {
    this.drinkForm = this.fb.group({
      productNameBold: ["", Validators.required],
      price: ["", Validators.required],
      taste: ["", Validators.required],
      volume: ["", Validators.required],
      image: ["", Validators.required],
      category: ["", Validators.required],
      
    });
  

  const drink$: Observable<Drink> = this.store$.select(
    fromDrink.getCurrentDrink
  );

  drink$.subscribe(currentDrink => {
    if(currentDrink) {
      this.drinkForm.patchValue({
        productNameBold: currentDrink.productNameBold,
        price: currentDrink.price,
        taste: currentDrink.taste,
        volume: currentDrink.volume,
        category: currentDrink.category
      });
    }
  });
}

updateDrink() {
  const updateDrink: Drink = {
    productNameBold: this.drinkForm.get("productNameBold").value,
    price: this.drinkForm.get("price").value,
    taste: this.drinkForm.get("taste").value,
    volume: this.drinkForm.get("volume").value,
    category: this.drinkForm.get("category").value,
    alcoholPercentage: "",
    usage: "",
    beverageDescriptionShort: "",
    id: 21
  };

  this.store$.dispatch(new drinksActions.UpdateDrink(updateDrink));
}
}