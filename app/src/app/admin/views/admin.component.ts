import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import { AppState } from '../../core/state';

@Component({
  selector: 'ex-example',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss'],
})
export class AdminComponent implements OnInit {
  constructor(private store$: Store<AppState>) {}

  ngOnInit(): void {
    /* this.initialize(); */
  }
}
