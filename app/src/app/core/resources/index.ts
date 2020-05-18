import { UserResource } from './user.resource';
import { EventResource } from './event.resource';
import { DrinkResource } from './drink.resource';
import { HomeResource } from './home.resource';
import { ReceiptResource } from './receipt.resource';

export { UserResource } from './user.resource';
export { EventResource } from './event.resource';
export { DrinkResource } from './drink.resource';
export { HomeResource } from './home.resource';
export { ReceiptResource } from './receipt.resource';

export const resources = [
	EventResource,
	UserResource,
	DrinkResource,
	HomeResource,
	ReceiptResource,
];