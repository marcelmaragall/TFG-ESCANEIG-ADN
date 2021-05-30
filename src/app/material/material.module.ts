import {NgModule} from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatDialogModule } from '@angular/material/dialog';
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {MatButtonModule} from '@angular/material/button';
import {MatButtonToggleModule} from '@angular/material/button-toggle';
import {MatDialogRef} from "@angular/material/dialog";
import {MatIconModule} from '@angular/material/icon';
import {MatGridListModule} from '@angular/material/grid-list';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatNativeDateModule} from "@angular/material/core";
import {MaterialFileInputModule} from "ngx-material-file-input";
import {MatSnackBarModule} from "@angular/material/snack-bar";
import {MatTableModule} from "@angular/material/table";
import {MatSortModule} from "@angular/material/sort";
import {MatPaginatorModule} from "@angular/material/paginator";
import {MatListModule} from '@angular/material/list';
import {DragDropModule} from '@angular/cdk/drag-drop';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatCheckboxModule} from "@angular/material/checkbox";

import { registerLocaleData } from '@angular/common';
import localePy from '@angular/common/locales/es-PY';
registerLocaleData(localePy, 'es');


@NgModule({
  declarations: [],
  imports: [
    // CommonModule,
    // MatDialogModule,
    // MatFormFieldModule,
    // MatInputModule,
    // MatDialogRef
  ],
  exports: [
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatDialogRef,
    MatButtonModule,
    MatButtonToggleModule,
    MatIconModule,
    MatGridListModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MaterialFileInputModule,
    MatSnackBarModule,
    MatTableModule,
    MatSortModule,
    MatPaginatorModule,
    MatListModule,
    DragDropModule,
    MatAutocompleteModule,
    MatCheckboxModule
    //MatList,
    //MatListOption
    ]
})
export class MaterialModule { }
