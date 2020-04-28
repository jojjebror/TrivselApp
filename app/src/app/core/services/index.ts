import { AuthenticationService } from './authentication.service';
import { AlertService } from './alert.service';


export { AuthenticationService } from './authentication.service';
export { AlertService } from './alert.service';


export const services = [
	AuthenticationService,
	AlertService
];

export { AuthenticationInterceptor } from './authentication.interceptor';