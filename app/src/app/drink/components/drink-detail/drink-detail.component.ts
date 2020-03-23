import { Component, OnInit, ChangeDetectionStrategy} from '@angular/core';

import { AppState } from 'src/app/core/state';
import { Store, select} from '@ngrx/store';

import { Observable } from 'rxjs';
import { Drink } from 'src/app/shared/models';
import { ActivatedRoute, Router } from '@angular/router';

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


  constructor(private store$: Store<AppState>, private route: ActivatedRoute, private router: Router) { }

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
      this.router.navigate(['/drink']);
    }
  }

  editDrink(drink: Drink) {
    this.store$.dispatch(new drinksActions.LoadDrink(drink.id));
  }
}
