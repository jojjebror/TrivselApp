import { Injectable } from "@angular/core";
import { Actions, ofType } from "@ngrx/effects/src/actions";
import { UserResource } from "src/app/core/resources";
import { Router } from "@angular/router";
import { Effect } from "@ngrx/effects";
import { Observable, of } from "rxjs";
import { mergeMap, catchError, map } from "rxjs/operators";
import { Office } from "src/app/shared/models/dto/OfficeDto";
import { Action } from '@ngrx/store';
import * as officesActions from './offices.actions';

@Injectable()
export class OfficesEffects {
  constructor(private actions$: Actions, private userResource: UserResource,  private router: Router) {}
  
  @Effect()
  getOffices$: Observable<Action> = this.actions$.pipe(
    ofType<officesActions.GetOffices>(officesActions.ActionTypes.GET_OFFICES),
    mergeMap((actions: officesActions.GetOffices) =>
      this.userResource.getOffices().pipe(
        map((offices: Office[]) => new officesActions.GetOfficesSuccess(offices)),
        catchError((err) => of(new officesActions.GetOfficesError(err)))
      )
    )
  );
}