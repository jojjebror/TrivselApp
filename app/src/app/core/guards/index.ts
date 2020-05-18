import { AuthenticationGuard } from './authentication.guard';
import { RoleGuard } from './role.guard'

export { AuthenticationGuard } from './authentication.guard';
export { RoleGuard } from './role.guard';


export const guards = [
	AuthenticationGuard,
	RoleGuard
];