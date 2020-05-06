import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { components } from './components';
import { directives } from './directives';
import { pipes } from './pipes';

import { SharedMaterialModule } from './shared-material.module';
import { getSwedishPaginatorIntl } from '../shared/swedish-paginator-intl';
import { MatPaginatorIntl } from '@angular/material';
import { ConfirmDialogComponent } from './components/confirmDialog/confirmDialog.component';
import { EditDialogComponent } from './components/editDialog/editDialog.component';
import { AddDialogComponent } from './components/addDialog/addDialog.component';


/**
 * Contains all shared stuff for the application. This module
 * should be imported in all other app modules.
 */
@NgModule({
  imports: [CommonModule, FormsModule, ReactiveFormsModule, SharedMaterialModule],
  exports: [CommonModule, FormsModule, ReactiveFormsModule, SharedMaterialModule, ...components, ...directives, ...pipes],
  declarations: [...components, ...directives, ...pipes],
  providers: [{ provide: MatPaginatorIntl, useValue: getSwedishPaginatorIntl() }],
  entryComponents: [ConfirmDialogComponent, EditDialogComponent, AddDialogComponent],
})
export class SharedModule {}
