import { Component, Inject, OnDestroy } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Observable, Subscription } from 'rxjs';
import { User } from '../../models';


@Component({
  selector: 'ex-participantsDialog',
  templateUrl: './participantsDialog.component.html',
  styleUrls: ['./participantsDialog.component.scss'],
})
export class ParticipantsDialogComponent implements OnDestroy {
  subscription = new Subscription();
  title: string;
  invitedParticipants: Observable<User[]>;
  attendedParticipants: Observable<User[]>;
  declinedParticipants: Observable<User[]>;

  constructor(public dialogRef: MatDialogRef<ParticipantsDialogComponent>, @Inject(MAT_DIALOG_DATA) public data: ParticipantsDialogModel) {
    // Update view with given values
    this.title = data.title;
    this.invitedParticipants = data.invitedParticipants$;
    this.attendedParticipants = data.attendedParticipants$;
    this.declinedParticipants = data.declinedParticipants$;
  }

  onDismiss(): void {
    // Close the dialog, return false
    this.dialogRef.close(false);
  }

  countInvited(users: Observable<User[]>) {
    let countParticipants: User[];
    this.subscription.add(users.subscribe((data) => (countParticipants = data)));
    return countParticipants.length;
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}

export class ParticipantsDialogModel {
  constructor(public title: string, public attendedParticipants$: Observable<User[]>,
     public invitedParticipants$: Observable<User[]>,
     public declinedParticipants$: Observable<User[]>) {}
}
