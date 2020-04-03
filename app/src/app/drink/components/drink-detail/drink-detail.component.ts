import { Component, OnInit, ChangeDetectionStrategy} from '@angular/core';

import { AppState } from 'src/app/core/state';
import { Store, select} from '@ngrx/store';

import { Observable } from 'rxjs';
import { Drink } from 'src/app/shared/models';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertifyService } from 'src/app/core/services/alertify.service';

import * as fromDrink from '../../state/drinks';
import * as drinksActions from '../../state/drinks';


@Component({
  selector: 'ex-drink-detail',
  templateUrl: './drink-detail.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrls: ['./drink-detail.component.scss']
})
export class DrinkDetailComponent implements OnInit {
  dr$: Observable<Drink>;
  id: number;
  isShown: boolean = false ; // hidden by default
 
  clickCounter: number = 1;
  totalSum: number = 0;

  constructor(private store$: Store<AppState>, private alertify: AlertifyService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit() {
    this.LoadDrink();
  }

  private LoadDrink(): void {
    this.store$.dispatch(new drinksActions.LoadDrink(this.getClickedId()));
    this.dr$ = this.store$.pipe(select(fromDrink.getCurrentDrink));
  }

  private getClickedId() {
    var id = Number(this.route.snapshot.paramMap.get('id'));
    this.id = id;
    return id;
  }

  deleteDrink(id) {
    console.log(id);
    if (confirm("Are You Sure You want to Delete the drink?")) {
      this.store$.dispatch(new drinksActions.DeleteDrink(id));
      this.alertify.warning('Dryck pantad!');
      //this.router.navigate(['/drink']);

    }
  }

  clickCount(){
    this.clickCounter +=1;
    console.log(this.clickCounter);
  }
  clickCountM(){
    if(this.clickCounter > 1)
    this.clickCounter -=1;
    console.log(this.clickCounter);
  }

  editDrink(drink: Drink) {
    this.store$.dispatch(new drinksActions.LoadDrink(drink.id));
  }

  toggleShow() {

    this.isShown = ! this.isShown;
  }

  GetToSwish(drink: Drink){
    this.totalSum = 0;
   this.totalSum += this.clickCounter * drink.price;
    console.log(this.totalSum);
  }
}
