import { NgModule } from '@angular/core';
import {
  MatButtonModule,
  MatCardModule,
  MatInputModule,
  MatToolbarModule,
  MatSnackBarModule,
  MatFormFieldModule,
  MatDatepickerModule,
  MatSelectModule,
  MatNativeDateModule,
  MatSortModule,
  MatTableModule,
  MatCheckboxModule,
  MatDialogModule,
  MatIconModule
} from '@angular/material';
const materials = [
  MatToolbarModule,
  MatCardModule,
  MatInputModule,
  MatButtonModule,
  MatSnackBarModule,
  MatFormFieldModule,
  MatDatepickerModule,
  MatSelectModule,
  MatNativeDateModule,
  MatSortModule,
  MatTableModule,
  MatCheckboxModule,
  MatDialogModule,
  MatIconModule
];

@NgModule({
    imports: [
      ...materials
    ],
    exports: [
      ...materials
    ],
    declarations: []
  })

export class MaterialModule { }
