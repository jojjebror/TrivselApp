import { Component, OnInit, ChangeDetectionStrategy} from "@angular/core";
import { Observable, Subscription } from "rxjs";
import { Store, select, ActionsSubject } from "@ngrx/store";



import { AppState } from "src/app/core/state";
import { Receipt} from "src/app/shared/models";

import * as receiptsActions from "../../state/receipts";
import * as fromReceipt from "../../state/receipts/receipts.selectors";
import * as asReceipt from "../../state/receipts/receipts.actions";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { MatSnackBar, MatTableDataSource, MatDialog, MatTabChangeEvent } from "@angular/material";
import { AuthenticationService } from "src/app/core/services";
import { filter } from "rxjs/operators";
import { ActionTypes } from '../../state/receipts';
import { ConfirmDialogModel, ConfirmDialogComponent } from "src/app/shared/dialogs/confirmDialog/confirmDialog.component";

@Component({
  selector: 'ex-receipt-list',
  templateUrl: './receipt-list.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrls: ['./receipt-list.component.scss']
})
export class ReceiptListComponent implements OnInit{

  res$: Observable<Receipt[]>;
  fileUpload: File = null;
  imageUrl: string;
  receiptForm: FormGroup;
  receipt: Receipt;
  subscription = new Subscription();
  allReceipts = new MatTableDataSource<Receipt>();
  allUsersReceipts = new MatTableDataSource<Receipt>();
  userId: number;
  cres$: Observable<Receipt[]>;
  maxFilesize: 100;  
  acceptedFiles: 'image/jpg,image/png,image/jpeg/*';
  files: any = [];

  displayedColumnAllReceipts = ['title', 'date', 'actions'];
  displayedColumnAllUsersReceipts = ['title1', 'date1', 'actions1'];

  navLinks = [
    {path: 'Receipt', label: 'receipts/AllReceipts'},
    {path: '/Receipt/' + this.userId, label: 'receipts/YourReceipts'},
  ];

  constructor(
    private store$: Store<AppState>,
    private rb: FormBuilder,
    private snackBar: MatSnackBar,
    private actionsSubject$: ActionsSubject,
    public authService: AuthenticationService,
    public dialog: MatDialog
    ) 
    {
      this.subscription.add(
        authService.getUserId().subscribe((user) => {
          this.userId = user.sub;
        })
      );
    }


  ngOnInit() {
    this.createReceiptForm();
    this.loadReceipts();
    this.loadUserReceipt();
  }

  onLinkClick(event: MatTabChangeEvent) {
    if(event.index == 0)
    {
    this.loadReceipts();
    }
    else {
      this.loadUserReceipt();
    }
  }

 /**
   * on file drop handler
   */
  onFileDropped($event) {
    this.prepareFilesList($event);
  }

  /**
   * handle file from browsing
   */
  fileBrowseHandler(files) {
    this.prepareFilesList(files);
  }
  /**
   * Delete file from files list
   * @param index (File index)
   */
  deleteFile(index: number) {
    this.files.splice(index, 1);
    if(this.files == 0)
    {
      this.receiptForm.value.image == null;
    }
  }
  /**
   * Convert Files list to normal array list
   * @param files (Files List)
   */
  prepareFilesList(files: any) {
    for (const item of files) {
      item.progress = 1;
      this.files.push(item);
    }
  }

  /**
   * format bytes
   * @param bytes (File size in bytes)
   * @param decimals (Decimals point)
   */
  formatBytes(bytes, decimals) {
    if (bytes === 0) {
      return '0 Bytes';
    }
    const k = 1024;
    const dm = decimals <= 0 ? 0 : decimals || 2;
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
  }


   loadReceipts() {
    this.store$.dispatch(new receiptsActions.LoadReceipts());

    this.store$.pipe(select(fromReceipt.getReceipts)).subscribe((data: Receipt[]) => {
      this.allReceipts.data = data;
    })

  }

  loadUserReceipt() {
    this.store$.dispatch(new asReceipt.LoadUserReceipts(+this.userId));
    this.subscription.add(this.store$.pipe(select(fromReceipt.getReceiptCreatedByUser)).subscribe((data: Receipt[])=> {
      this.allUsersReceipts.data = data;
    })
   );
  }

  
  createReceiptForm() {
    this.receiptForm = this.rb.group({
      image: ["", Validators.required],
      creatorId: [+this.userId],
      users: [null]
    });
  }

  createReceipt() {
    if (this.receiptForm.valid || this.files.length < 2) {

      this.receipt = Object.assign({}, this.receiptForm.value);

      if(this.validateFile(this.receipt.image))
      {
      this.store$.dispatch(new asReceipt.CreateReceipt(this.receipt, this.fileUpload));

      this.subscription.add(
        this.actionsSubject$.pipe(filter((action: any) => action.type === ActionTypes.UPLOAD_IMAGE_SUCCESS)).subscribe((action) => {
          this.snackBar.open('Kvittot är nu tillagt', '', { duration: 2500 });
        })
       );  
       this.loadUserReceipt();
       this.loadReceipts();
       this.clearArray();
      }
    }
    else
    {
      this.getErrorMessage('image');
    }
  }

  validateFile(name: String) {
    var ext = name.substring(name.lastIndexOf('.') + 1);
    if (ext.toLowerCase() == 'png') {
        return true;
    }
    if(ext.toLowerCase() == 'jpg') {
      return true;
    }
    if(ext.toLowerCase() == 'jpeg') {
      return true;
    }
    else {
        return false;
    }
}
  
  loadImage(file: FileList) {
    this.fileUpload = file.item(0);
  }

  deleteReceipt(id: number) {
    this.store$.dispatch(new receiptsActions.DeleteReceipt(id));

    this.subscription.add(
      this.actionsSubject$.pipe(filter((action: any) => action.type === ActionTypes.DELETE_RECEIPT_SUCCESS)).subscribe((action) => {
        this.snackBar.open('Kvittot borttaget', '', { duration: 2500 });
        this.store$.dispatch(new asReceipt.LoadUserReceipts(+this.userId));
      })
    );
    this.subscription.add(
      this.actionsSubject$.pipe(filter((action: any) => action.type === ActionTypes.DELETE_RECEIPT_ERROR)).subscribe((action) => {
        this.snackBar.open('Någonting gick fel, försök igen', '', { duration: 5000 });
        this.loadReceipts();
      })
    );

  }

  confirmDialog(id: number, title: string): void {
    const message = 'Är du säker på att du vill ta bort kvittot?';
    const dialogData = new ConfirmDialogModel('Bekräfta', message);

    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      maxWidth: '400px',
      data: dialogData,
    });

    this.subscription.add(dialogRef.afterClosed().subscribe((dialogResult) => {
      if(dialogResult == true)  {
        this.deleteReceipt(id);
      }
    }));
  }

  getErrorMessage(property: string) {
    switch (property) {
      case 'image': {
        return 'Välj en bild och du kan endast ladda upp 1 bild i taget';
      }
    }
  }

  clearArray()
  {
    this.files = [];
  }
 
}
