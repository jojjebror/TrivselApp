import { Component, OnInit, ChangeDetectionStrategy} from '@angular/core';

import { AppState } from 'src/app/core/state';
import { Store, select} from '@ngrx/store';

import { Observable } from 'rxjs';
import { Drink } from 'src/app/shared/models';
import { ActivatedRoute } from '@angular/router';

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


  constructor(private store$: Store<AppState>, private route: ActivatedRoute) { }

  ngOnInit() {
    this.LoadDrink();
  }

  private LoadDrink(): void {
    this.store$.dispatch(new drinksActions.LoadDrink(this.getClickedId()));
    this.dr$ = this.store$.pipe(select(fromDrink.getCurrentDrink));
  }

  private getClickedId() {
    var id = Number(this.route.snapshot.paramMap.get('id'));
    return id;
  }
}
