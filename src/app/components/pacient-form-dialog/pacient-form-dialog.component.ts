import {Component, Inject, OnInit} from '@angular/core';
import {PacientService} from "../../services/pacient.service";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {AccountService} from "../../services/account.service";
import {NotificacioService} from "../../services/notificacio.service";

@Component({
  selector: 'app-pacient-form-dialog',
  templateUrl: './pacient-form-dialog.component.html',
  styleUrls: ['./pacient-form-dialog.component.css']
})
export class PacientFormDialogComponent implements OnInit {

  constructor(private pacientService: PacientService,
              private dialogRef: MatDialogRef<PacientFormDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public data: {edit: boolean},
              private accountService: AccountService,
              private notificacioService: NotificacioService
  ) { }

  edit: boolean = false;


  ngOnInit(): void {
  }

  saveNewPacient() {

    this.pacientService.savePacient(this.pacientService.pacientForm.value)
      .subscribe(
        res => {
          if (res['text'] !== 'existeix') {
            this.pacientService.pacientForm.value.id = res['id'];
            let data = this.pacientService.pacients.data;
            data.push(this.pacientService.pacientForm.value);
            this.pacientService.pacients.data = data;
            this.dialogRef.close();
            this.notificacioService.success('Pacient creat');

          }
          else {
            this.notificacioService.warn('! DNI existent en un altre pacient');
            this.pacientService.initializeFormGroup();
          }
        },
        err => console.log(err)
      );
  }

  updatePacient() {
    this.pacientService.updatePacient(this.pacientService.pacientForm.value.id, this.pacientService.pacientForm.value)
      .subscribe(
        res => {
          console.log("pacient edited");
          this.dialogRef.close();
        },
        err => {
          console.log(err)
        }
      )
  }

}
