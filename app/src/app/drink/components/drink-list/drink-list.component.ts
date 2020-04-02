import { Component, OnInit, ChangeDetectionStrategy} from '@angular/core';
import { Observable } from 'rxjs';
import { Store, select } from '@ngrx/store';

import { AppState } from 'src/app/core/state';
import { Drink } from 'src/app/shared/models';

import * as drinksActions from '../../state/drinks';
import * as fromDrink from '../../state/drinks/drinks.selectors';
import { ActivatedRoute, Router } from '@angular/router';
import { text } from '@angular/core/src/render3';


@Component({
  selector: 'ex-drink',
  templateUrl: './drink-list.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrls: ['./drink-list.component.scss']
})

export class DrinkListComponent implements OnInit {

  drs$: Observable<Drink[]>;
  dr$: Observable<Drink>;
  filter$: string;
  

  constructor(private store$: Store<AppState>, private route: ActivatedRoute,  private router: Router) { }

  ngOnInit(): void {
    this.initializeDrinks();
  
  }

  private initializeDrinks(): void {
   this.store$.dispatch(new drinksActions.LoadDrinks());
   this.drs$ = this.store$.select(fromDrink.getDrinks);
  }

  //public instializeFilterBeer(): void {
  //  this.store$.dispatch(new drinksActions.FilterDrink('Öl'));
 //   this.drs$ = this.store$.select(fromDrink.getFilterDrinks);
 // }

 // ListDrink(text){
   // this.store$.dispatch(new drinksActions.LoadDrinks());
   // this.drs$ =  this.store$.pipe(select(fromDrink.getDrinks(text)));
   // this.router.navigate(['/drink/category']);
 // }

}
