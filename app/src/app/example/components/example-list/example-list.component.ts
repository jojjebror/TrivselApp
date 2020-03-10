import { Component, Input, ChangeDetectionStrategy } from '@angular/core';

import { Example } from '../../../shared/models';

@Component({
	selector: 'ex-example-list',
	templateUrl: './example-list.component.html',
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class ExampleListComponent {

	@Input() examples: Example[];

	constructor() { }
}