import {Component, Inject, Input, OnInit, ViewChild} from '@angular/core';
import {MatSort} from "@angular/material/sort";
import {MatPaginator} from "@angular/material/paginator";
import {MatTableDataSource} from "@angular/material/table";
import {MAT_DIALOG_DATA, MatDialog, MatDialogConfig, MatDialogRef} from "@angular/material/dialog";
import {ResultatService} from "../../services/resultat.service";
import {EscanerService} from "../../services/escaner.service";
import {AccountService} from "../../services/account.service";

@Component({
  selector: 'app-resultat-list',
  templateUrl: './resultat-list.component.html',
  styleUrls: ['./resultat-list.component.css']
})
export class ResultatListComponent implements OnInit {

  constructor(private resultatService: ResultatService, private escanerService: EscanerService, private dialog: MatDialog) { }

  @Input() escaner_id : number;

  displayedColumns: string[] = ['codi_resultat', 'gen_simbol', 'nom_patologia', 'snp', 'actions'];
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;


  getResultats(id: number) {
    this.resultatService.resultatsEscaner = new MatTableDataSource();
    // @ts-ignore
    this.escanerService.getResultatsEscaner<any[]>(id).subscribe(
      res => {
        // @ts-ignore
        this.resultatService.resultatsEscaner = new MatTableDataSource(res);
        this.resultatService.resultatsEscaner.sort = this.sort;
        this.resultatService.resultatsEscaner.paginator = this.paginator;
      },
      err => console.error(err)
    )
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.resultatService.resultatsEscaner.filter = filterValue.trim().toLowerCase();

    if (this.resultatService.resultatsEscaner.paginator) {
      this.resultatService.resultatsEscaner.paginator.firstPage();
    }
  }

  descarregaResultat(row){

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
      codi: row.codi_resultat,
      res_id: row.id,
      comentaris: com
    };
    const dialogRef = this.dialog.open(EditResultatComponent, dialogConfig);

    dialogRef.afterClosed().subscribe(result => {
      //todo quedar pendent actualitzar el patologiaService.patologiesUsuari, pel camp comentaris que tenim en memoria.
      //podem fer un recorregut pero seria millor accedir per index via patologiesUsuari.data[i]
      //console.log(this.accountService.patologiaForm.value.comentaris)
      //console.log(this.patologiaService.patologiesUsuari.data[0])
    });

  }

  ngOnInit(): void {
    this.getResultats(this.escaner_id);
  }


}

@Component({
  selector: 'dialog-edit_resultat-comentari',
  template: `<div class="mt-3 mb-3 text-center">
    <h3>{{data.codi}}</h3>
  </div>
  <div class="row">
    <div class="col-md-10">
      <form [formGroup]="resultatService.resultatForm" class="normal-form">
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
export class EditResultatComponent {

  constructor(
    public dialogRef: MatDialogRef<any>,
    @Inject(MAT_DIALOG_DATA) public data: {res_id: number, codi: string, comentaris: string},
    private resultatService: ResultatService) {}

  ngOnInit(): void {
    //this.accountService.initializeFormGroup();
    this.resultatService.resultatForm
      .setValue({
        comentaris: this.data.comentaris,
      })
  }

  guardaComentari(){
    this.resultatService.updateResultat(this.data.res_id, this.resultatService.resultatForm.value).subscribe(
      res => {
        this.dialogRef.close();
      }
    );
  }

}
