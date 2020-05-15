import { commonComponents } from './common';
import { NavbarComponent } from './navbar/navbar.component';
import { LoaderComponent } from './loader/loader.component';
import { ConfirmDialogComponent } from '../dialogs/confirmDialog/confirmDialog.component';
import { EditDialogComponent } from '../dialogs/editDialog/editDialog.component';
import { AddDialogComponent } from '../dialogs/addDialog/addDialog.component';
import { ParticipantsDialogComponent } from '../dialogs/participantsDialog/participantsDialog.component';
import { EditOfficeDetailsDialogComponent } from '../dialogs/editOfficeDetailsDialog/editOfficeDetailsDialog.component';
import { NewOfficeDialogComponent } from '../dialogs/newOfficeDialog/newOfficeDialog.component';



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
	ParticipantsDialogComponent,
	EditOfficeDetailsDialogComponent,
	NewOfficeDialogComponent
];