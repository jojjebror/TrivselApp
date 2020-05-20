import { Component, Output, EventEmitter, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { Store, select, ActionsSubject } from '@ngrx/store';
import { AppState } from 'src/app/core/state';

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
  imageUrl: any = null;
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
//creates a drinkform with specified fields
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
//creates a new drink object 
  createDrink() {
    if (this.drinkForm.valid) {
      this.drink = Object.assign({}, this.drinkForm.value);
      this.store$.dispatch(new fromDrink.CreateDrink(this.drink, this.fileUpload));

      this.showSnackbar();
    }
  }

  fileProgress(fileInput: any) {
    this.fileUpload = <File>fileInput.target.files[0];
    this.imagePreview();
  }

  imagePreview() {
    var mimeType = this.fileUpload.type;
    if (mimeType.match(/image\/*/) == null) {
      return;
    }

    var reader = new FileReader();
    reader.readAsDataURL(this.fileUpload);
    reader.onload = (_event) => {
      this.imageUrl = reader.result;
    };
  }



  loadImage(file: FileList) {
    this.fileUpload = file.item(0);
  }

  imageValidator(control: FormControl) {
    //Får inte att fungera med formbuilder
    if (control.value) {
      if (this.fileUpload) {
        const allowedInput = '/image-*/';
        const fileExtension = this.fileUpload.type;
        console.log(fileExtension);
        if (fileExtension.match(allowedInput)) {
          return true;
        }
        return false;
      }
    }
  }

  showSnackbar() {

    this.snackBar.open(this.drink.productNameBold + ' är nu tillagd i dryckeslistan!', '', { duration: 2500 });
      
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}


