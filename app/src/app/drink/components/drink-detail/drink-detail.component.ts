import { Component, OnInit } from '@angular/core';
import { Drink } from 'src/app/shared/models';
import { Observable } from 'rxjs';
import { Store, select } from '@ngrx/store';
import { AppState } from 'src/app/core/state';
import { ActivatedRoute } from '@angular/router';
import * as drinkActions from '../../state/drinks';
import * as fromDrink from '../../state/drinks';

@Component({
  selector: 'ex-drink-detail',
  templateUrl: './drink-detail.component.html',
  styleUrls: ['./drink-detail.component.scss']
})
export class DrinkDetailComponent implements OnInit {
  dr$: Observable<Drink>;

  constructor(private store$: Store<AppState>, private route: ActivatedRoute) {}

  ngOnInit() {
    this.LoadDrink();
  }

  private LoadDrink(): void {
    this.store$.dispatch(new drinkActions.LoadDrink(this.getClickedId()));
    this.dr$ = this.store$.pipe(select(fromDrink.getCurrentDrink));
  }

  private getClickedId() {
    var id = Number(this.route.snapshot.paramMap.get('id'));
    return id;
  }

}
