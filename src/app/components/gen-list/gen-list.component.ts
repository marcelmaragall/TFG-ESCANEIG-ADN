import {Component, Inject, Input, OnChanges, OnInit, ViewChild} from '@angular/core';
import { GenService } from "../../services/gen.service";
import {AccountService} from "../../services/account.service";
import {Gen} from "../../models/Gen";
import {MatSort} from "@angular/material/sort";
import {MatPaginator} from "@angular/material/paginator";
import {MatTableDataSource} from "@angular/material/table";
import {NotificacioService} from "../../services/notificacio.service";
import {MAT_DIALOG_DATA, MatDialog, MatDialogConfig, MatDialogRef} from "@angular/material/dialog";
import {EditPatologiaComponent} from "../patologia-list/patologia-list.component";

var Def = require('autocomplete-lhc');


@Component({
  selector: 'app-gen-list',
  templateUrl: './gen-list-a.component.html',
  styleUrls: ['./gen-list.component.css']
})
export class GenListComponent implements OnInit {

  constructor(private genService: GenService, private accountService: AccountService, private notificacioService: NotificacioService, private dialog: MatDialog) { }

  usuari_id : number;

  displayedColumns: string[] = ['simbol', 'cromosoma', 'locus', 'descripcio', 'actions'];
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;


  getGens(id: number) {

    this.genService.gensUsuari = new MatTableDataSource<any>();
    this.accountService.getGensUser(id).subscribe(
      gens => {
        // @ts-ignore
        //this.gensUsuari = gens;
        this.genService.gensUsuari = new MatTableDataSource(gens);
        this.genService.gensUsuari.sort = this.sort;
        this.genService.gensUsuari.paginator = this.paginator;

      },
      err => console.error(err)
    )
  }

  checkMIM(refs: string){
    if (refs) {
      let mim = refs.match(/MIM:\d+/);
      if (mim == null) return null;
      else return Number(mim[0].match(/\d+/)[0]);
    }
    else return null;
  }

  guardaGens(llistaGens: any[]){

    //
    // TODO també podem obtenir camp "Synonims", parsejarlo o no. es dona com un text amb els gens separats per '|'. Al carregar el camp de text des de BDD podriem parsejarlo i mostrar... I SI EL DEIXEM COM A TEXT? QUE SIGUI INFORMATIU, PERO NO INTERACTIU
    //


    if (llistaGens.length == 0) {
      //mostrar alerta, no hi ha gens seleccionats. O directament desactivar botone si no hi gens
    }
    for (let i=0; i<llistaGens.length;i++) {

      let mimId = this.checkMIM(llistaGens[i].dbXrefs);
      let g = {
        geneID: llistaGens[i].GeneID,
        simbol: llistaGens[i].Symbol,
        descripcio: llistaGens[i].description,
        locus: llistaGens[i].map_location,
        cromosoma: llistaGens[i].chromosome,
        HGNC_ID: llistaGens[i].HGNC_ID,
        sinonims: llistaGens[i].Synonims,
        tipus: llistaGens[i].type_of_gene,
        mimID: mimId
      };

      let genID;
      this.genService.saveGen(g).subscribe(
        gen => {
          genID = gen;
        },
        err => console.error(err),
        () => {
          this.accountService.saveGenUser({gen_id: genID.id, usuari_id: this.usuari_id}).subscribe(
            res => {
              if (res['text'] != 'existeix') {
                const data = this.genService.gensUsuari.data;
                g['gu_id'] = res['gu_id'];
                g['gen_id'] = res[genID.id];
                data.push(g);
                this.genService.gensUsuari.data = data;
              }
              },
              err => {
              console.log(err);
            }
          )
        }
      );
    }
  }

  deleteGen(row: any){
      this.accountService.deleteGenUser(row.gu_id).subscribe(
        res => {
          let index = -1;
          for (let i=0; i<this.genService.gensUsuari.data.length; i++){
            if (this.genService.gensUsuari.data[i].gu_id === row.gu_id) {
              index = i;
              console.log(i);
            }
          }
          if (index !== -1) {
            this.genService.gensUsuari.data.splice(index, 1);
            this.genService.gensUsuari.data = this.genService.gensUsuari.data;
          }
          this.notificacioService.warn('! Deleted successfully');
        },
        err => {
          console.error(err);
        }
      );
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.genService.gensUsuari.filter = filterValue.trim().toLowerCase();

    if (this.genService.gensUsuari.paginator) {
      this.genService.gensUsuari.paginator.firstPage();
    }
  }

  openEditDialog(row){
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = false;
    dialogConfig.autoFocus = true;
    dialogConfig.width = "60%";
    let com = row.comentaris;
    if (! com){
      com = '';
    }
    dialogConfig.data = {
      simbol: row.simbol,
      gu_id: row.gu_id,
      comentaris: com
    };
    const dialogRef = this.dialog.open(EditGenComponent, dialogConfig);

    dialogRef.afterClosed().subscribe(result => {
    });

  }


  ngOnInit(): void {
    this.usuari_id = this.accountService.userValue.id;
    this.getGens(this.usuari_id);

/*    new Def.Autocompleter.Search('gens',
      'https://clinicaltables.nlm.nih.gov/api/ncbi_genes/v3/search?&df=GeneID,HGNC_ID,Symbol,Synonyms,dbXrefs,chromosome,map_location,description,type_of_gene&ef=GeneID,HGNC_ID,Symbol,Synonyms,dbXrefs,chromosome,map_location,description,type_of_gene&cf=GeneID',
      {tableFormat: true, valueCols: [1], colHeaders: ['GeneID','HGNC_ID','Symbol','Synonyms','dbXrefs','chromosome','map_location','description','type_of_gene'],  maxSelect: '*'});

    Def.Autocompleter.Event.observeListSelections('gens', () => {
      var gen = $('#gens')[0];
      var autocomp = gen.autocomp;
      var itemData = autocomp.getSelectedItemData();
      if (itemData) {
        var arrayLength = itemData.length;
        let cercaActual = [];
        for (var i = 0; i < arrayLength; i++) {
          console.log(itemData[i].data);
          cercaActual.push(itemData[i].data);
        }
        this.cercaActual = cercaActual;
      }
      console.log(this.cercaActual)
    });*/
  }

}

@Component({
  selector: 'dialog-edit_gen_comentari',
  template: `<div class="mt-3 mb-3 text-center">
    <h3>{{data.simbol}}</h3>
  </div>
  <div class="row">
    <div class="col-md-10">
      <form [formGroup]="accountService.genForm" class="normal-form">
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
export class EditGenComponent {

  constructor(
    public dialogRef: MatDialogRef<any>,
    @Inject(MAT_DIALOG_DATA) public data: {gu_id: number, simbol: string, comentaris: string},
    private accountService: AccountService) {}

  ngOnInit(): void {
    //this.accountService.initializeFormGroup();
    this.accountService.genForm
      .setValue({
        comentaris: this.data.comentaris,
      })
  }

  guardaComentari(){
    this.accountService.updateGenUser(this.accountService.genForm.value, this.data.gu_id).subscribe(
      res => {
        this.dialogRef.close();
      }
    );
  }

}

