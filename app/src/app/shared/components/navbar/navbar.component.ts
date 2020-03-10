import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
	selector: 'ex-navbar',
	templateUrl: './navbar.component.html',
	styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

	@Output() menuToggle = new EventEmitter<boolean>();

	constructor() { }

	ngOnInit(): void { }
}