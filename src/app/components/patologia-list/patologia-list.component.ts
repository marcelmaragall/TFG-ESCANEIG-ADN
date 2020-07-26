import {Component, Input, OnChanges, OnInit} from '@angular/core';
import {PatologiaService} from "../../services/patologia.service.";
import {Patologia} from "../../models/Patologia";
import {AccountService} from "../../services/account.service";
var Def = require('autocomplete-lhc');


@Component({
  selector: 'app-patologia-list',
  templateUrl: './patologia-list.component.html',
  styleUrls: ['./patologia-list.component.css']
})
export class PatologiaListComponent implements OnInit, OnChanges {

  constructor(private patologiaService: PatologiaService, private accountService: AccountService ) { }

  @Input() idPatologia;
  @Input() nomPatologia;

  patologia: any = {
    nom: '',
    ncbid: '',
    descripcio: ''
  };

  cercaActual = [];
  patologiesUsuari = [];
  patologiesIds = [];
  usuari_id : number;

  getPatologies(id: number) {
    this.accountService.getPatologiesUser(id).subscribe(
      pat => {
        // @ts-ignore
        this.patologiesUsuari = pat
      },
      err => console.error(err)
    )
  }

  guardaPatologies(){
    for (let i=0; i<this.cercaActual.length;i++) {
      this.patologia.nom = this.cercaActual[i].text;
      this.patologia.ncbid = this.cercaActual[i].code;
      this.patologia.descripcio = '';
      let patologiaID;
      this.patologiaService.savePatologia(this.patologia).subscribe(
        pat => {
          patologiaID = pat;
        },
        err => console.error(err),
        () => {
          this.accountService.savePatologiaUser({patologia_id: patologiaID.id, usuari_id: this.usuari_id}).subscribe(
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
    this.getPatologies(this.usuari_id);


    // let arbusto = new Def.Autocompleter.Search('disease',
    //   'https://clinicaltables.nlm.nih.gov/api/disease_names/v3/search?df=DiseaseName,ConceptID',
    //   {tableFormat: true, valueCols: [0], colHeaders: ['Name', 'Concept ID'], maxSelect: '*'});

/*
      new Def.Autocompleter.Search('genes',
        'https://clinicaltables.nlm.nih.gov/api/ncbi_genes/v3/search?sf=GeneID,HGNC_ID,Symbol,Synonyms,dbXrefs,chromosome,map_location,description,type_of_gene,na_symbol,na_name,Other_designations,Modification_date&df=GeneID,HGNC_ID,Symbol,Synonyms,dbXrefs,chromosome,map_location,description,type_of_gene,na_symbol,na_name,Other_designations,Modification_date,_code_system,_code (+ "terms" parameter)\n',
        {tableFormat: true, valueCols: [0], maxSelect: '*'});
        FUNCIONA CON GENES
*/



     new Def.Autocompleter.Search('disease',
       // 'https://clinicaltables.nlm.nih.gov/api/conditions/v3/search?ef=term_icd9_code',
       'https://clinicaltables.nlm.nih.gov/api/disease_names/v3/search?df=DiseaseName,ConceptID,chr',
       {tableFormat: true, valueCols: [0], colHeaders: ['Name', 'Concept ID', 'Chromosome'], maxSelect: '*'});

     Def.Autocompleter.Event.observeListSelections('disease', () => {
       var disease = $('#disease')[0];
       var autocomp = disease.autocomp;
       var itemData = autocomp.getSelectedItemData();
       console.log(itemData);

       // $('#icd9_code')[0].value = itemData && itemData[0].data ?
       //   itemData[0].data.term_icd9_code  : '';

       $('#code')[0].value = itemData && itemData[0].code ?
         itemData[0].code  : '';
       if (itemData) {
         var arrayLength = itemData.length;
         let cercaActual = [];
         for (var i = 0; i < arrayLength; i++) {
           console.log(itemData[i]);
           cercaActual.push(itemData[i]);
         }
         this.cercaActual = cercaActual;
       }
     });
  }

  ngOnChanges(): void {
    if (this.cercaActual) {
      console.log("MANICOMIOS1")
    }
  }

}
