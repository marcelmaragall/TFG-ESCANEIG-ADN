import {Component, Inject, Input, OnChanges, OnInit, ViewChild} from '@angular/core';
import {PatologiaService} from "../../services/patologia.service";
import {Patologia} from "../../models/Patologia";
import {AccountService} from "../../services/account.service";
import {MatTable, MatTableDataSource} from "@angular/material/table";
import {MatPaginator} from "@angular/material/paginator";
import {MatSort} from "@angular/material/sort";
import {MAT_DIALOG_DATA, MatDialog, MatDialogConfig, MatDialogRef} from "@angular/material/dialog";
import {GenListDialogComponent} from "../gen-list-dialog/gen-list-dialog.component";
import {NotificacioService} from "../../services/notificacio.service";
import {GenPatologiaUsuariService} from "../../services/gen-patologia-usuari.service";

var Def = require('autocomplete-lhc');


@Component({
  selector: 'app-patologia-list',
  templateUrl: './patologia_list_a.component.html',
  styleUrls: ['./patologia-list.component.css']
})
export class PatologiaListComponent implements OnInit {

  constructor(private patologiaService: PatologiaService, private accountService: AccountService, private dialog: MatDialog, private notificacioService: NotificacioService, private genPatUService: GenPatologiaUsuariService) { }

  // @Input() idPatologia;
  // @Input() nomPatologia;

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

  deletePatologia(row: any){
    this.genPatUService.deleteGensByPatologiaAndUser(this.usuari_id, row.pat_id).subscribe(
      res => {
        this.accountService.deletePatologiaUser(row.pu_id).subscribe(
          res => {
            let index = -1;
            for (let i=0; i<this.patologiaService.patologiesUsuari.data.length; i++){
              if (this.patologiaService.patologiesUsuari.data[i].pu_id === row.pu_id) {
                index = i;
                console.log(i);
              }
            }
            if (index !== -1) {
              this.patologiaService.patologiesUsuari.data.splice(index, 1);
              this.patologiaService.patologiesUsuari.data = this.patologiaService.patologiesUsuari.data;
            }
            this.notificacioService.warn('! Deleted successfully');
          },
          err => {
            console.error(err);
          }
        );
      }
    );
  }


  guardaPatologies(llistaPatologies: any[]){

    for (let i=0; i<llistaPatologies.length;i++) {

      let p = {
        nom: llistaPatologies[i].text,
        ncbid: llistaPatologies[i].code
      };

      let patologiaID;
      // @ts-ignore
      this.patologiaService.savePatologia<any>(p).subscribe(
        res => {
          patologiaID = res.id;
          this.accountService.savePatologiaUser({patologia_id: res.id, usuari_id: this.usuari_id}).subscribe(
            res => {
                if (res['text'] != 'existeix') {
                  let data = this.patologiaService.patologiesUsuari.data;
                  p['pat_id'] = patologiaID;
                  p['pu_id'] = res['pu_id']
                  data.push(p);
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
    let com = row.comentaris;
    if (! row.com){
      com = ''
    }

    dialogConfig.data = {
      nom: row.nom,
      pu_id: row.pu_id,
      comentaris: com
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
        this.dialogRef.close();
      }
    );
  }

}
