import { Component, OnInit, ChangeDetectionStrategy } from "@angular/core";

import { Store, select } from "@ngrx/store";
import { AppState } from "src/app/core/state";
import { ActivatedRoute, Router } from "@angular/router";
import { Observable } from "rxjs";
import { Drink } from "src/app/shared/models";
import * as fromDrink from "../../state/drinks";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { AlertifyService } from "src/app/core/services/alertify.service";

@Component({
  selector: "ex-event-edit",
  templateUrl: "./drink-edit.component.html",
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrls: ["./drink-edit.component.scss"],
})
export class DrinkEditComponent implements OnInit {
  dr$: Observable<Drink>;
  drink: Drink;
  drinkEditForm: FormGroup;
  

  constructor(
    private store$: Store<AppState>,
    private route: ActivatedRoute,
    private alertify: AlertifyService,
    private fb: FormBuilder,
    private router: Router
  ) {}

  ngOnInit() {
    this.dr$ = this.store$.pipe(select(fromDrink.getCurrentDrink));
    console.log(this.dr$);
    this.createDrinkEditForm();
    console.log(this.drinkEditForm);
  }

  createDrinkEditForm() {
    this.dr$.subscribe((dr) => {
      this.drinkEditForm = this.fb.group({
        id: [dr.id],
        productNameBold: [dr.productNameBold, Validators.required],
        price: [dr.price, Validators.required],
        volume: [dr.volume, Validators.required],
        category: [dr.category, Validators.required],
      });
    });
  }

  updateDrink() {
    if (this.drinkEditForm.valid) {
      this.drink = Object.assign({}, this.drinkEditForm.value);
      console.log(this.drink);
      this.store$.dispatch(new fromDrink.UpdateDrink(this.drink));
      this.alertify.success("Information om drycken har ändrats!");
    }
  }
}
