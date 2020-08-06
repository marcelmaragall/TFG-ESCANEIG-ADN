import { Component, Input, OnChanges, OnInit } from '@angular/core';
import { GenService } from "../../services/gen.service";
import {AccountService} from "../../services/account.service";
import {Gen} from "../../models/Gen";

var Def = require('autocomplete-lhc');


@Component({
  selector: 'app-gen-list',
  templateUrl: './gen-list.component.html',
  styleUrls: ['./gen-list.component.css']
})
export class GenListComponent implements OnInit {

  constructor(private genService: GenService, private accountService: AccountService) { }

  cercaActual = [];
  gensUsuari = [];
  gensIds = [];
  usuari_id : number;

  // @ts-ignore
  gen : Gen = {
    geneID: null,
    mimID: null,
    HGNC_ID: '',
    simbol: '',
    tipus: '',
    cromosoma: '',
    locus: '',
    descripcio: '',
    sinonims: ''
  };


  getGens(id: number) {
    this.accountService.getGensUser(id).subscribe(
      gens => {
        // @ts-ignore
        this.gensUsuari = gens;
        console.log(gens);
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

  guardaGens(){

    //
    // TODO també podem obtenir camp "Synonims", parsejarlo o no. es dona com un text amb els gens separats per '|'. Al carregar el camp de text des de BDD podriem parsejarlo i mostrar... I SI EL DEIXEM COM A TEXT? QUE SIGUI INFORMATIU, PERO NO INTERACTIU
    //


    if (this.cercaActual.length == 0) {
      //mostrar alerta, no hi ha gens seleccionats. O directament desactivar botone si no hi gens
    }
    for (let i=0; i<this.cercaActual.length;i++) {

      this.gen.geneID = this.cercaActual[i].GeneID;
      this.gen.HGNC_ID = this.cercaActual[i].HGNC_ID;
      this.gen.simbol = this.cercaActual[i].Symbol;
      this.gen.sinonims = this.cercaActual[i].Synonims;
      this.gen.descripcio = this.cercaActual[i].description;
      this.gen.locus = this.cercaActual[i].map_location;
      this.gen.tipus = this.cercaActual[i].type_of_gene;
      this.gen.cromosoma = this.cercaActual[i].chromosome;

      this.gen.mimID = this.checkMIM(this.cercaActual[i].dbXrefs);

      let genID;
      this.genService.saveGen(this.gen).subscribe(
        gen => {
          genID = gen;
        },
        err => console.error(err),
        () => {
          this.accountService.saveGenUser({gen_id: genID.id, usuari_id: this.usuari_id}).subscribe(
            res => {
              console.log(res);
            },
            err => {
              console.log(err);
            }
          )
        }
      );
    }
  }


  ngOnInit(): void {
    this.usuari_id = this.accountService.userValue.id;
    this.getGens(this.usuari_id);

    new Def.Autocompleter.Search('gens',
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
    });
  }

}
