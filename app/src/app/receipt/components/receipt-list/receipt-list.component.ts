import { Component, OnInit, ChangeDetectionStrategy, Input, HostBinding, EventEmitter, Output, HostListener, Directive } from "@angular/core";
import { Observable, Subscription } from "rxjs";
import { Store, select, ActionsSubject } from "@ngrx/store";



import { AppState } from "src/app/core/state";
import { Receipt, User} from "src/app/shared/models";

import * as receiptsActions from "../../state/receipts";
import * as fromReceipt from "../../state/receipts/receipts.selectors";
import * as asReceipt from "../../state/receipts/receipts.actions";
import { FormGroup, FormBuilder, Validators, FormControl } from "@angular/forms";
import { Router } from "@angular/router";
import { AlertifyService } from "src/app/core/services/alertify.service";
import { MatSnackBar, MatTableDataSource, MatDialog } from "@angular/material";
import * as fromSession from '../../../core/state/session'
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
export class ReceiptListComponent implements OnInit {

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

  displayedColumnAllReceipts = ['title', 'date', 'invited', 'actions'];
  displayedColumnAllUsersReceipts = ['title1', 'date1', 'invited1', 'actions1'];

  constructor(
    private store$: Store<AppState>,
    private router: Router,
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
  }

  /**
   * Simulate the upload process
   */
  uploadFilesSimulator(index: number) {
    setTimeout(() => {
      if (index === this.files.length) {
        return;
      } else {
        const progressInterval = setInterval(() => {
          if (this.files[index].progress === 100) {
            clearInterval(progressInterval);
            this.uploadFilesSimulator(index + 1);
          } else {
            this.files[index].progress += 5;
          }
        }, 200);
      }
    }, 1000);
  }

  /**
   * Convert Files list to normal array list
   * @param files (Files List)
   */
  prepareFilesList(files: Array<any>) {
    for (const item of files) {
      item.progress = 0;
      this.files.push(item);
    }
    this.uploadFilesSimulator(0);
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


   public loadReceipts(): void {
    this.store$.dispatch(new receiptsActions.LoadReceipts());

    this.store$.pipe(select(fromReceipt.getReceipts)).subscribe((data: Receipt[]) => {
      this.allReceipts.data = data;
    })

  }

  public loadUserReceipt(): void {
    this.store$.dispatch(new asReceipt.LoadUserReceipts(+this.userId));
    this.subscription.add(this.store$.pipe(select(fromReceipt.getReceiptCreatedByUser(+this.userId))).subscribe((data: Receipt[])=> {
      this.allUsersReceipts.data = data;
    })
   );
    console.log(this.allUsersReceipts);
  }

  
  createReceiptForm() {
    this.receiptForm = this.rb.group({
      image: [null],
      creatorId: [+this.userId],
      users: [null]
    });
  }

  createReceipt() {
    if (this.receiptForm.valid) {

      this.receipt = Object.assign({}, this.receiptForm.value);
      this.store$.dispatch(new asReceipt.CreateReceipt(this.receipt, this.fileUpload));

      this.subscription.add(
        this.actionsSubject$.pipe(filter((action: any) => action.type === ActionTypes.CREATE_RECEIPT_SUCCESS)).subscribe((action) => {
          var title = action.payload.title;
          this.snackBar.open('Kvitto uppladdat', '', { duration: 2500 });
        })
      );

      this.subscription.add(
        this.actionsSubject$.pipe(filter((action: any) => action.type === ActionTypes.UPLOAD_IMAGE_SUCCESS)).subscribe((action) => {
          this.snackBar.open('Kvittot är nu tillagt', '', { duration: 2500 });
        })
      );

    }
  }

  imageValidator(control: FormControl) {
    //Får inte att fungera med formbuilder
    if(control.value) {
      if(this.fileUpload) {
        const allowedInput = '/image-*/';
        //const fileExtension = this.fileUpload.name.split('.').pop().toLowerCase();
        const fileExtension = this.fileUpload.type;
        console.log(fileExtension);
        if (fileExtension.match(allowedInput)) {
          return true;
        }
        return false;
      }
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
    const message = 'Vill du ta bort evenemanget ' + title + '?';
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

 
  
}
