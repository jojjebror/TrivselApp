import { Component, OnInit, Input } from '@angular/core';

@Component({
	selector: 'ex-alert',
	templateUrl: './alert.component.html',
	styleUrls: ['./alert.component.scss']
})
export class AlertComponent implements OnInit {

	@Input() closeable: boolean;

	@Input() type: 'warning' | 'danger' | 'info' = 'info';
	
	constructor() { }

	ngOnInit(): void { }

}