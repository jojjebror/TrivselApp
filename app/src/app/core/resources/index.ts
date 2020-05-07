import { ExampleResource } from './example.resource';
import { UserResource } from './user.resource';
import { EventResource } from './event.resource';
import { DrinkResource } from './drink.resource';
import { ReceiptResource } from './receipt.resource';

export { ExampleResource } from './example.resource';
export { UserResource } from './user.resource';
export { EventResource } from './event.resource';
export { ReceiptResource } from './receipt.resource';

export const resources = [
	ExampleResource,
	EventResource,
	UserResource,
	DrinkResource,
	ReceiptResource,
];