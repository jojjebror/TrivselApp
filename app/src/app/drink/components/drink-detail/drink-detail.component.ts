import { Component, OnInit, ChangeDetectionStrategy } from "@angular/core";

import { AppState } from "src/app/core/state";
import { Store, select } from "@ngrx/store";
import * as fromSession from '../../../core/state/session'
import * as fromUser from '../../../user/state/users/users.actions';

import { Observable } from "rxjs";
import { Drink } from "src/app/shared/models";
import { ActivatedRoute, Router } from "@angular/router";
import { AlertifyService } from "src/app/core/services/alertify.service";

import * as fromDrink from "../../state/drinks";
import * as drinksActions from "../../state/drinks";

@Component({
  selector: "ex-drink-detail",
  templateUrl: "./drink-detail.component.html",
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrls: ["./drink-detail.component.scss"],
})
export class DrinkDetailComponent implements OnInit {
  dr$: Observable<Drink>;
  id: number;
  isShown: boolean = false; // hidden by default
  photo: string = "/bilder/beer.jpg";
  clickCounter: number = 1;
  totalSum: number = 0;
  userId: number;

  constructor(
    private store$: Store<AppState>,
    private alertify: AlertifyService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {
    this.LoadDrink();
    this.store$.select(fromSession.selectUser).subscribe((currentuser ) => (this.userId = currentuser.id));
    console.log(this.userId);
  }

  private LoadDrink(): void {
    this.store$.dispatch(new drinksActions.LoadDrink(this.getClickedId()));
    this.dr$ = this.store$.pipe(select(fromDrink.getCurrentDrink));
  }

  private getClickedId() {
    var id = Number(this.route.snapshot.paramMap.get("id"));
    this.id = id;
    return id;
  }

  deleteDrink(id) {
    console.log(id);
    if (confirm("Are You Sure You want to Delete the drink?")) {
      this.store$.dispatch(new drinksActions.DeleteDrink(id));
      this.alertify.warning("Dryck pantad!");
    }
  }

  clickCount() {
    this.clickCounter += 1;
    console.log(this.clickCounter);
  }
  clickCountM() {
    if (this.clickCounter > 1) this.clickCounter -= 1;
    console.log(this.clickCounter);
  }

  editDrink(drink: Drink) {
    this.store$.dispatch(new drinksActions.LoadDrink(drink.id));
  }

  toggleShow() {
    this.isShown = !this.isShown;
  }

  GetToSwish(drink: Drink) {
    this.totalSum = 0;
    this.totalSum += this.clickCounter * drink.price;
    console.log(this.totalSum);
  }

  paySaldo(drink: Drink) {
    this.totalSum = 0;
    this.totalSum += this.clickCounter * drink.price;
    this.totalSum = -this.totalSum
    var data = [this.userId , this.totalSum];
    console.log(this.totalSum);
    this.store$.dispatch(new fromUser.UpdateCredit(data));
    this.alertify.success("Världet för ditt saldo har ändrats!");
  }





  changeImage(drink: Drink) {
    if (drink.category == "cider") {
      this.photo = "/beer3.jpg";
      console.log(this.photo);
    } else if (drink.category == "vin") {
      this.photo = "/beer2.jpg";
      console.log(this.photo);
    } else {
      return this.photo;
    }
  }
}
