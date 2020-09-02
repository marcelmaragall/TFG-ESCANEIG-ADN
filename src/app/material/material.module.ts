import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule} from "@angular/material/form-field";
import { MatInputModule} from "@angular/material/input";
// import { MatDialogRef} from "@angular/material/dialog";

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    // MatDialogRef
  ],
  exports: [
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    // MatDialogRef
    ]
})
export class MaterialModule { }
