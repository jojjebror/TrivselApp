import { Component, OnInit, ChangeDetectionStrategy } from "@angular/core";

import { Store, select, ActionsSubject } from "@ngrx/store";
import { AppState } from "src/app/core/state";
import { Observable, Subscription } from "rxjs";
import { Drink } from "src/app/shared/models";
import * as fromDrink from "../../state/drinks";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { MatSnackBar } from "@angular/material";
import { filter } from "rxjs/operators";
import { ActionTypes } from '../../state/drinks';
import { getLoadingData} from '../../../core/state/loading';

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
  loadings$ = this.store$.pipe(select(getLoadingData));
  

  constructor(
    private store$: Store<AppState>,
    private fb: FormBuilder,
    private actionsSubject$: ActionsSubject,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit() {
    this.dr$ = this.store$.pipe(select(fromDrink.getCurrentDrink));
    this.createDrinkEditForm();
  }
  //creates a form for editing existing drinks with the required parameters.
  createDrinkEditForm() {
   let sub = this.dr$.subscribe((dr) => {
      this.drinkEditForm = this.fb.group({
        id: [dr.id],
        productNameBold: [dr.productNameBold, Validators.required],
        price: [dr.price, Validators.required],
        volume: [dr.volume, Validators.required],
        taste: [dr.taste, Validators.required],
        category: [dr.category, Validators.required],
        image: [dr.image]
      });
    });
    sub.unsubscribe();
  }
  //updates the drink with the filled in parameters. Only able to update if the drinkform is valid.
  updateDrink() {
    if (this.drinkEditForm.valid) {
      const dr = Object.assign({}, this.drinkEditForm.value);
      this.store$.dispatch(new fromDrink.UpdateDrink(dr, this.fileUpload));
      this.updateDrinkSnackbar();
    }
  }
  //shows a snackbar message with either the message that the drinks was updated or that something went wrong. 
  updateDrinkSnackbar(){
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

  loadImage(file: FileList) {
    this.fileUpload = file.item(0);
  }
  ngOnDestroy() {
    this.subscription.unsubscribe();
    
  }
}
