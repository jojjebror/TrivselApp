import { commonComponents } from './common';
import { NavbarComponent } from './navbar/navbar.component';
import { LoaderComponent } from './loader/loader.component';
import { ConfirmDialogComponent } from './confirmDialog/confirmDialog.component';
import { EditDialogComponent } from './editDialog/editDialog.component';
import { AddDialogComponent } from './addDialog/addDialog.component';
import { ParticipantsDialogComponent } from './participantsDialog/participantsDialog.component';



/**
 * Components that are shared between multiple modules
 */
export const components: any[] = [
	...commonComponents,
	NavbarComponent,
	LoaderComponent,
	ConfirmDialogComponent,
	EditDialogComponent,
	AddDialogComponent,
	ParticipantsDialogComponent
];