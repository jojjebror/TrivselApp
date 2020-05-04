import { Component, Output, EventEmitter, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { Store, select } from '@ngrx/store';
import { AppState } from 'src/app/core/state';
import { AlertifyService } from 'src/app/core/services/alertify.service';

import { Drink } from "../../../shared/models";
import * as fromDrink from "../../state/drinks/drinks.actions";

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

  constructor(
    private store$: Store<AppState>,
    private router: Router,
    private fb: FormBuilder,
    private alertify: AlertifyService
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
      image: [''],
    });
  }

  createDrink() {
    if (this.drinkForm.valid) {
      this.drink = Object.assign({}, this.drinkForm.value);
      this.store$.dispatch(new fromDrink.CreateDrink(this.drink, this.fileUpload));
      this.alertify.success("Drycken har lagts till!");
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


