import {Component, Inject, OnInit, ViewChild} from '@angular/core';

import { PacientService } from '../../services/pacient.service'
import {AccountService} from "../../services/account.service";
import {MatSort} from "@angular/material/sort";
import {MatPaginator} from "@angular/material/paginator";
import {MatTableDataSource} from "@angular/material/table";
import {MAT_DIALOG_DATA, MatDialog, MatDialogConfig, MatDialogRef} from "@angular/material/dialog";
import {PacientFormDialogComponent} from "../pacient-form-dialog/pacient-form-dialog.component";

@Component({
  selector: 'app-pacient-list',
  templateUrl: './pacient-list-a.component.html',
  styleUrls: ['./pacient-list.component.css']
})
export class PacientListComponent implements OnInit {

  pacients: any = [];
  usuari_id: number;

  displayedColumns: string[] = ['cognoms', 'nom', 'dni', 'actions'];
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(private pacientService: PacientService, private accountService: AccountService, private dialog: MatDialog) { }

  getPacients(){

    this.pacientService.pacients = new MatTableDataSource<any>();

    this.accountService.getPacientsUser(this.usuari_id).subscribe(
      pacs => {
        // @ts-ignore
        this.pacientService.pacients = new MatTableDataSource(pacs);
        this.pacientService.pacients.sort = this.sort;
        this.pacientService.pacients.paginator = this.paginator;
      },
      err => console.error(err)
    )
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.pacientService.pacients.filter = filterValue.trim().toLowerCase();

    if (this.pacientService.pacients.paginator) {
      this.pacientService.pacients.paginator.firstPage();
    }
  }

  onCreate(){
    this.pacientService.initializeFormGroup();
    this.openPacDialog(false);
  }

  onEdit(row){
    this.pacientService.populateForm(row);
    this.openPacDialog(true)

  }

  openPacDialog(editForm: boolean) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = false;
    dialogConfig.autoFocus = true;
    dialogConfig.width = "56%";
    dialogConfig.data = {
      edit: editForm
    };
    const dialogRef = this.dialog.open(PacientFormDialogComponent, dialogConfig);
  }

/*
  deletePacient(id: number) {
    this.pacientService.deletePacient(id)
      .subscribe(
        res=> {
          console.log(res);
          this.getPacients();
        },
        err => {
          console.log(err)
        }
      )
  }*/

  ngOnInit(): void {
    this.usuari_id = this.accountService.userValue.id;

    this.getPacients();
  }

}
