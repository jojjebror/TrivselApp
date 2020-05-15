import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import { AppState } from '../../core/state';
import { Example } from '../../shared/models';

import * as fromExamples from '../state/examples';

@Component({
	selector: 'ex-example',
	templateUrl: './admin.component.html',
	styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {

	examples$: Observable<Example[]>;

	constructor(private store$: Store<AppState>) { }

	ngOnInit(): void {
		/* this.initializeExamples(); */
	}

	/* createExample(example: Example): void {
		this.store$.dispatch(new fromExamples.Create(example));
	}

	private initializeExamples(): void {
		this.store$.dispatch(new fromExamples.Load());
		this.examples$ = this.store$.select(fromExamples.selectExamples);
	} */
}