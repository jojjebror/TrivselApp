import { Component, Output, EventEmitter, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { Store, select, ActionsSubject } from '@ngrx/store';
import { AppState } from 'src/app/core/state';
import { AlertifyService } from 'src/app/core/services/alertify.service';

import { Drink } from "../../../shared/models";
import * as fromDrink from "../../state/drinks/drinks.actions";
import { MatSnackBar } from '@angular/material';
import { filter } from 'rxjs/operators';
import { ActionTypes } from '../../state/drinks';
import { Subscription } from 'rxjs';


@Component({
  selector: "ex-drink-create",
  templateUrl: "./drink-create.component.html",
  styleUrls: ["./drink-create.component.scss"],
})
export class DrinkCreateComponent implements OnInit {
  @Output()
  cancelNewDrink = new EventEmitter();
  drink: Drink;
  drinkForm: FormGroup;
  fileUpload: File = null;
  imageUrl: string;
  subscription = new Subscription();


  constructor(
    private store$: Store<AppState>,
    private router: Router,
    private fb: FormBuilder,
    private snackBar: MatSnackBar,
    private actionsSubject$: ActionsSubject,
  ) {}

  ngOnInit() {
    this.createDrinkForm();
    console.log(this.drinkForm);
  }

  createDrinkForm() {
    this.drinkForm = this.fb.group({
      productNameBold: ['', Validators.required],
      price: ['', Validators.required],
      taste: ['', Validators.required],
      volume: ['', Validators.required],
      category: ['', Validators.required],
      image: [null],
    });
  }

  createDrink() {
    if (this.drinkForm.valid) {
      this.drink = Object.assign({}, this.drinkForm.value);
      this.store$.dispatch(new fromDrink.CreateDrink(this.drink, this.fileUpload));

      this.subscription.add(
        this.actionsSubject$.pipe(filter((action: any) => action.type === ActionTypes.CREATE_DRINK_SUCCESS)).subscribe((action) => {
          var title = action.payload.title;
          this.snackBar.open(title + ' är nu tillagt i evenemangslistan', '', { duration: 2500 });
        })
      );
    
      this.subscription.add(
        this.actionsSubject$.pipe(filter((action: any) => action.type === ActionTypes.UPLOAD_IMAGE_SUCCESS)).subscribe((action) => {
          this.snackBar.open('Drycken är nu tillagt i listan', '', { duration: 2500 });
        })
      );
    }
  }

  loadImage(file: FileList) {
    this.fileUpload = file.item(0);
  }

  imageValidator(control: FormControl) {
    //Får inte att fungera med formbuilder
    if (control.value) {
      if (this.fileUpload) {
        const allowedInput = '/image-*/';
        //const fileExtension = this.fileUpload.name.split('.').pop().toLowerCase();
        const fileExtension = this.fileUpload.type;
        console.log(fileExtension);
        if (fileExtension.match(allowedInput)) {
          return true;
        }
        return false;
      }
    }
  }
}


