import { commonComponents } from './common';
import { NavbarComponent } from './navbar/navbar.component';

/**
 * Components that are shared between multiple modules
 */
export const components: any[] = [
	...commonComponents,
	NavbarComponent
];