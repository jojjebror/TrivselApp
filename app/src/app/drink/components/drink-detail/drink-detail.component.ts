import { Component, OnInit, ChangeDetectionStrategy } from "@angular/core";

import { AppState } from "src/app/core/state";
import { Store, select, ActionsSubject } from "@ngrx/store";
import * as fromSession from "../../../core/state/session";

import { Observable, Subscription } from "rxjs";
import { Drink } from "src/app/shared/models";
import { ActivatedRoute, Router } from "@angular/router";
import { AlertifyService } from "src/app/core/services/alertify.service";

import * as fromDrink from "../../state/drinks";
import * as drinksActions from "../../state/drinks";
import { filter } from "rxjs/operators";
import { MatSnackBar, MatDialog } from "@angular/material";
import { AuthenticationService } from "src/app/core/services";
import { ConfirmDialogModel, ConfirmDialogComponent } from "src/app/shared/components/confirmDialog/confirmDialog.component";

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
    private alertify: AlertifyService,
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
    setTimeout(() => { this.store$.select(fromSession.selectUser).subscribe((currentuser) => (this.userCredit = currentuser.credit)) }, 500);

    if (this.userCredit < 60) {
      this.alertify.warning(
        "Psst..Det börjar se lite tomt ut på ditt saldo! :)"
      );
    }

    console.log(this.userId);
    console.log(this.userCredit);
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
      this.store$.dispatch(new drinksActions.DeleteDrink(id));
      this.showSnackbar();
    
  }

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
  showSnackbar() {
    this.subscription.add(
      this.actionsSubject$.pipe(filter((action: any) => action.type === fromDrink.ActionTypes.DELETE_DRINK_SUCCESS)).subscribe((action) => {
        this.snackBar.open('Drycken har tagits bort!', '', { duration: 3000 });
      }) );}

  toggleShow() {
    this.isShown = !this.isShown;
  }
  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}
