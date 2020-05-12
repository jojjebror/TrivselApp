import { Component, OnInit, ChangeDetectionStrategy } from "@angular/core";

import { Store, select, ActionsSubject } from "@ngrx/store";
import { AppState } from "src/app/core/state";
import { ActivatedRoute, Router } from "@angular/router";
import { Observable, Subscription } from "rxjs";
import { Drink } from "src/app/shared/models";
import * as fromDrink from "../../state/drinks";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { AlertifyService } from "src/app/core/services/alertify.service";
import { MatSnackBar } from "@angular/material";
import { filter } from "rxjs/operators";
import { ActionTypes } from '../../state/drinks';

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
  fileUpload: File = null;
  imageUrl: string;
  private subscription = new Subscription();
  

  constructor(
    private store$: Store<AppState>,
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private router: Router,
    private actionsSubject$: ActionsSubject,
    private snackBar: MatSnackBar
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
        image: [null]
      });
    });
    this.ngOnDestroy();
  }

  updateDrink() {
    if (this.drinkEditForm.valid) {
      const dr = Object.assign({}, this.drinkEditForm.value);
      console.log(dr);
      this.store$.dispatch(new fromDrink.UpdateDrink(dr, this.fileUpload));

      this.subscription.add(
        this.actionsSubject$.pipe(filter((action: any) => action.type === ActionTypes.UPDATE_DRINK_SUCCESS)).subscribe((action) => {
          this.snackBar.open('Drycken är nu uppdaterad', '', { duration: 2500 });
        })
      );

      this.subscription.add(
        this.actionsSubject$.pipe(filter((action: any) => action.type === ActionTypes.UPDATE_DRINK_ERROR)).subscribe((action) => {
          this.snackBar.open('Någonting gick fel, försök igen', '', { duration: 5000 });
        })
      );
    }
  }

  loadImage(file: FileList) {
    this.fileUpload = file.item(0);
  }
  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
