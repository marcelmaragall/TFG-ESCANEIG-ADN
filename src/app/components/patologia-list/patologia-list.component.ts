import {Component, Inject, Input, OnChanges, OnInit, ViewChild} from '@angular/core';
import {PatologiaService} from "../../services/patologia.service";
import {Patologia} from "../../models/Patologia";
import {AccountService} from "../../services/account.service";
import {MatTable, MatTableDataSource} from "@angular/material/table";
import {MatPaginator} from "@angular/material/paginator";
import {MatSort} from "@angular/material/sort";
import {MAT_DIALOG_DATA, MatDialog, MatDialogConfig, MatDialogRef} from "@angular/material/dialog";
import {GenListDialogComponent} from "../gen-list-dialog/gen-list-dialog.component";

var Def = require('autocomplete-lhc');


@Component({
  selector: 'app-patologia-list',
  templateUrl: './patologia_list_a.component.html',
  styleUrls: ['./patologia-list.component.css']
})
export class PatologiaListComponent implements OnInit {

  constructor(private patologiaService: PatologiaService, private accountService: AccountService, private dialog: MatDialog) { }

  @Input() idPatologia;
  @Input() nomPatologia;

  patologia: any = {
    nom: '',
    ncbid: '',
  };



  //patologiesUsuari: MatTableDataSource<any>;
  usuari_id : number;

  displayedColumns: string[] = ['nom', 'ncbid', 'actions'];
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;


  getPatologies(id: number) {
    this.patologiaService.patologiesUsuari = new MatTableDataSource();
    // @ts-ignore
    this.accountService.getPatologiesUser<any[]>(id).subscribe(
      pat => {
        // @ts-ignore
        this.patologiaService.patologiesUsuari = new MatTableDataSource(pat);
        this.patologiaService.patologiesUsuari.sort = this.sort;
        this.patologiaService.patologiesUsuari.paginator = this.paginator;
      },
      err => console.error(err)
    )
  }


  guardaPatologies(llistaPatologies: any[]){
    for (let i=0; i<llistaPatologies.length;i++) {
      this.patologia.nom = llistaPatologies[i].text;
      this.patologia.ncbid = llistaPatologies[i].code;
      let patologiaID;
      // @ts-ignore
      this.patologiaService.savePatologia<any>(this.patologia).subscribe(
        res => {
          patologiaID = res.id;
          this.accountService.savePatologiaUser({patologia_id: res.id, usuari_id: this.usuari_id}).subscribe(
            res => {
                if (res['text'] != 'existeix') {

                  let data = this.patologiaService.patologiesUsuari.data;
                  data.push({
                    pu_id: res['pu_id'],
                    pat_id: patologiaID,
                    nom: this.patologia.nom,
                    ncbid: this.patologia.ncbid
                  });
                  this.patologiaService.patologiesUsuari.data = data;
               }
            },
            err => {
              console.log(err);
            }
          )
        },
        err => console.error(err),
        () => {

        }
      );
    }
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.patologiaService.patologiesUsuari.filter = filterValue.trim().toLowerCase();

    if (this.patologiaService.patologiesUsuari.paginator) {
      this.patologiaService.patologiesUsuari.paginator.firstPage();
    }
  }

  openEditDialog(row){
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = false;
    dialogConfig.autoFocus = true;
    dialogConfig.width = "60%";
    dialogConfig.data = {
      nom: row.nom,
      pu_id: row.pu_id,
      comentaris: row.comentaris
    };
    const dialogRef = this.dialog.open(EditPatologiaComponent, dialogConfig);

    dialogRef.afterClosed().subscribe(result => {
      //todo quedar pendent actualitzar el patologiaService.patologiesUsuari, pel camp comentaris que tenim en memoria.
      //podem fer un recorregut pero seria millor accedir per index via patologiesUsuari.data[i]
      //console.log(this.accountService.patologiaForm.value.comentaris)
      //console.log(this.patologiaService.patologiesUsuari.data[0])
    });

  }

  ngOnInit(): void {
    this.usuari_id = this.accountService.userValue.id;
    this.getPatologies(this.usuari_id);
  }

}

@Component({
  selector: 'dialog-edit_patologia_comentari',
  template: `<div class="mt-3 mb-3 text-center">
    <h3>{{data.nom}}</h3>
  </div>
  <div class="row">
    <div class="col-md-10">
      <form [formGroup]="accountService.patologiaForm" class="normal-form">
        <mat-form-field appearance="fill" style="width: 600px; height: 300px">
          <mat-label>Comentari</mat-label>
          <!--<input formControlName="comentaris" matInput placeholder="Comentaris">-->
        <textarea style="height: 200px" class="comentari" formControlName="comentaris" matInput placeholder="Comentaris"></textarea>
        </mat-form-field>
      </form>
    </div>
    <div class="col-md-2">
      <button class="btn btn-success" (click)="guardaComentari()" onclick="this.blur();"> Guarda </button>
    </div>
  </div>`
})
export class EditPatologiaComponent {

  constructor(
    public dialogRef: MatDialogRef<any>,
    @Inject(MAT_DIALOG_DATA) public data: {pu_id: number, nom: string, comentaris: string},
    private accountService: AccountService) {}

  ngOnInit(): void {
    //this.accountService.initializeFormGroup();
    this.accountService.patologiaForm
      .setValue({
        comentaris: this.data.comentaris,
      })
  }

  guardaComentari(){
    this.accountService.updatePatologiaUser(this.accountService.patologiaForm.value, this.data.pu_id).subscribe(
      res => {
        console.log("restaurante")

        this.dialogRef.close();
      }
    );
  }

}
