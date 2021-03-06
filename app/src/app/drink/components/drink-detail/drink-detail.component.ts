import { Component, OnInit, ChangeDetectionStrategy } from "@angular/core";

import { AppState } from "src/app/core/state";
import { Store, select, ActionsSubject } from "@ngrx/store";
import * as fromSession from "../../../core/state/session";

import { Observable, Subscription } from "rxjs";
import { Drink } from "src/app/shared/models";
import { ActivatedRoute, Router } from "@angular/router";

import * as fromDrink from "../../state/drinks";
import * as drinksActions from "../../state/drinks";
import { filter } from "rxjs/operators";
import { MatSnackBar, MatDialog } from "@angular/material";
import { AuthenticationService } from "src/app/core/services";
import { ConfirmDialogModel, ConfirmDialogComponent } from "src/app/shared/dialogs/confirmDialog/confirmDialog.component";

@Component({
  selector: "ex-drink-detail",
  templateUrl: "./drink-detail.component.html",
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrls: ["./drink-detail.component.scss"],
})
export class DrinkDetailComponent implements OnInit {
  subscription = new Subscription();
  
  dr$: Observable<Drink>;
  id: number;
  isShown: boolean = false; // hidden by default

  clickCounter: number = 1;
  totalSum: number = 0;
  userId: number;
  userCredit: number;

  constructor(
    private store$: Store<AppState>,
    private route: ActivatedRoute,
    private snackBar: MatSnackBar,
    private actionsSubject$: ActionsSubject,
    public authService: AuthenticationService,
    private router: Router,
    private dialog: MatDialog
  ) {
    this.subscription.add(
      authService.getUserId().subscribe((user) => {
        this.userId = user.sub;
      })
    );
  }

  ngOnInit() {
    this.LoadDrink();
    setTimeout(() => { this.store$.select(fromSession.selectUser).subscribe((currentuser) => (this.userCredit = currentuser.credit)) }, 1000);
  }
  //Loads the selected drink based on its id
  private LoadDrink(): void {
    this.store$.dispatch(new drinksActions.LoadDrink(this.getClickedId()));
    this.dr$ = this.store$.pipe(select(fromDrink.getCurrentDrink));
  }
  
  private getClickedId() {
    var id = Number(this.route.snapshot.paramMap.get("id"));
    this.id = id;
    return id;
  }
  //Deletes the selected drink based on the selected id
  deleteDrink(id: number) {
    console.log(id);
      this.store$.dispatch(new drinksActions.DeleteDrink(id));
      this.showSnackbar();
    
  }
  //message dialog with confirm or cancel. If confirm runs deleteDrink()
  confirmDelete(id: number): void {
    const message = 'Är du säker på att du vill ta bort drycken?';
    const dialogData = new ConfirmDialogModel('Bekräfta', message);

    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      maxWidth: '400px',
      data: dialogData,
    });

    this.subscription.add(dialogRef.afterClosed().subscribe((dialogResult) => {
      if(dialogResult == true)  {
        this.deleteDrink(id);
      }
    }));
  }
  
  //Gets the selected drink based on its id. Then rerouted to drink-edit page.
  editDrink(drink: Drink) {
    this.store$.dispatch(new drinksActions.LoadDrink(drink.id));
  }

  //Shows a snackbar message if the drink was succesfully deleted
  showSnackbar() {
    this.subscription.add(
      this.actionsSubject$.pipe(filter((action: any) => action.type === fromDrink.ActionTypes.DELETE_DRINK_SUCCESS)).subscribe((action) => {
        this.snackBar.open('Drycken har tagits bort!', '', { duration: 3000 });
      }) );
    this.ngOnDestroy();
    }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}
