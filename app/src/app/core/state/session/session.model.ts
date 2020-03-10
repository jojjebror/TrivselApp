import { User } from '../../../shared/models';

export interface SessionState {

	initialized: boolean;

	user: User;

}