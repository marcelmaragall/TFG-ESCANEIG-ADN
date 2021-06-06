import {Component, Inject, Input, OnInit, ViewChild} from '@angular/core';
import {EscanerService} from "../../services/escaner.service";
import {Sequenciacio} from "../../models/Sequenciaci";
import {Gen} from "../../models/Gen";
import {Patologia} from "../../models/Patologia";
import {MAT_DIALOG_DATA} from '@angular/material/dialog';
import {PatologiaService} from "../../services/patologia.service";
import {AccountService} from "../../services/account.service";
import {Observable} from "rxjs";
import {Diagnostic} from "../../models/Diagnostic";
import {DiagnosticPacientService} from "../../services/diagnostic-pacient.service";
import {MatSelectionList} from "@angular/material/list";
import {GenService} from "../../services/gen.service";
import {CdkDragDrop, moveItemInArray, transferArrayItem} from '@angular/cdk/drag-drop';
import {GenPatologiaUsuariService} from "../../services/gen-patologia-usuari.service";
import {SelectionListHarnessFilters} from "@angular/material/list/testing";


@Component({
  selector: 'app-nou-escaner',
  templateUrl: './nou-escaner.component.html',
  styleUrls: ['./nou-escaner.component.css']
})
export class NouEscanerComponent implements OnInit {

  constructor(
    private escanerService: EscanerService,
    @Inject(MAT_DIALOG_DATA) public data: {sequenciacions: Sequenciacio[], pacient_id: number},
    private patologiaService: PatologiaService,
    private accountService: AccountService,
    private diagnosticService: DiagnosticPacientService,
    private uPatGenService: GenPatologiaUsuariService
  ) { }


  @ViewChild('seqs') selectionList: MatSelectionList;
  @ViewChild('pats') selectionPList: MatSelectionList;
  @ViewChild('gens') selectionGList: MatSelectionList;


  //llistes on es guarden tots els gens i patologies, seleccionats o no. A partir d'aquestes llistes es creen els llistats a l'html i es realitzen les seleccions.
  gensList: any[] = []; //tots els gens de l'usuari
  diagnosticsList: any[] = []; //totes les malalties del pacient


  gensSelectedOptions = [];
  compareFunction = (o1: any, o2: any)=> o1.id===o2.id;


  usuari_id : number;
  sequenciacio_id: number;


  //llistats amb els gens que s'envien al servidor
  gensFinals = [
  ];
  gensPatologiesFinals = [
  ];


  // llistat que emmagatzema les patologies seleccionades a partir de l'ultim event.
  patologies_seleccionades = [];

  drop(event: CdkDragDrop<string[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      //evitem repetits en una mateixa llista
      let pos = event.container.data.map(function(e) { return e['simbol']; }).indexOf(event.previousContainer.data[event.previousIndex]['simbol']);
//      let idx=event.container.data.indexOf(event.previousContainer.data[event.previousIndex]);
      if(pos != -1){
        return;
      }
      transferArrayItem(event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex);
    }
  }

  getGens(id: number) {
    this.accountService.getGensUser(id).subscribe(
      gens => {
        // @ts-ignore
        this.gensList = gens;
      },
      err => console.error(err)
    )
  }

  getDiagnostics(id: number): Observable<Diagnostic[]>{
    // @ts-ignore
    return this.diagnosticService.getDiagnostics<Diagnostic[]>(id).subscribe(
      d => {
        this.diagnosticsList = d;
      },
      err => console.error(err)
    );
  }

  ngOnInit(): void {
    this.usuari_id = this.accountService.userValue.id;
    this.getDiagnostics(this.data.pacient_id);
    this.getGens(this.usuari_id);
  }

  onSelectionSeq(e){
    this.sequenciacio_id = e.option.value;
  }

  async onSelectionPat(e) {
    /*Funció que s'executa quan l'usuari clica en alguna de les patologies del llistat de patologies.
    * Per la seleccio, busquem els gens associats i els marquem al llistat de gens, aixi com els fem
    * apareixer dins la caixa corresponent a la patologies en forma de llistat. Hem hagut d'envoltat
    * la funcio getGensByPatologiaAndUser en una funcio assincrona per tal de poder manipular el resultat
    * que retorna sense que el codi posterior s'executi. La linia amb la comanda resolve() fa que es resolgui
    * la promesa i que l'execucio prossegueixi amb el codi posterior a la funcio.
    * */

//    this.selectionList.selectedOptions.deselect(this.selectionList.selectedOptions.selected[0]);
    this.patologies_seleccionades = e.option.selectionList._value;
    let novesPatologies = [];
    for (const p of this.patologies_seleccionades) {
      let trobat = false;
      for (const el of this.gensPatologiesFinals) {
        if (el['id'] == p['id']) {
          trobat = true;
        }
      }
      if (!trobat) {
        novesPatologies.push(p);
      }
    }

    var self = this;
    function asyncProcess(pat) {
      return new Promise((resolve, reject) => {
        self.uPatGenService.getGensByPatologiaAndUser(self.usuari_id, pat['id']).subscribe(
          res => {
            if (res) {
              //si no fem una deep copy, hi ha aliasing i l'assignacio final no té cap efecte.
              let llistaSeleccions = JSON.parse(JSON.stringify(self.gensSelectedOptions));
              // @ts-ignore
              for (let i = 0; i < res.length; i++) {
                delete res[i].comentaris;
                let pos = self.gensFinals.map(function(e) { return e['simbol']; }).indexOf(res[i]['simbol']);
                if (pos == -1){
                  llistaSeleccions.push({id: res[i]['gen_id'], simbol: res[i]['simbol']})
                }
              }
              if (llistaSeleccions) {
                self.gensSelectedOptions = llistaSeleccions;
              }
            }

            self.gensPatologiesFinals.push({id: pat['id'], nom: pat['nom'], gens: res});
            resolve();
          },
          err => {

          }
        )
      })
    }

    for (const pat of novesPatologies) {
      await asyncProcess(pat).then(() => {})
    }
    this.desllistaPatologia();
  }


  desllistaPatologia() {
    /*Recorrem les patologies gensPatologiesFinals. Si hi ha alguna discordancia respecte la llista de patologies_seleccionades,
    * s'activa la variable booleana trobat i ens indica quin index de gensPatologiesFinals conté una patologia que actualment
    * no esta seleccionada. Apliquem l'operacio splice i deixem la llista gensPatologiesFinals amb el llistat correcte.*/
    let index = -1;
    for (let i = 0; i < this.gensPatologiesFinals.length; i++) {
      let trobat = false;
      let el = this.gensPatologiesFinals[i];
      for (let j = 0; j < this.patologies_seleccionades.length; j++) {
        if (el['id'] == this.patologies_seleccionades[j]['id']) {
          trobat = true;
        }
      }
      if (!trobat) {
        index = i;
      }
    }
    if (index != -1) {
      this.desllistaGensPatologia(index);
      this.gensPatologiesFinals.splice(index, 1)
    }
  }

  desllistaGensPatologia(index: number){
    /*Recorrem els gens de la malaltia seleccionada. Donat un gen, comprovem si la resta de malalties el contenen. Si el contenen
     *passem a comprovar si la llista de gensFinals independents el conté. Si no el conté, significa que el gen no està llistat
     *enlloc, i per tant el deselccionem de la llista de gens (gensSelectedOptions). Per altra banda, si el gen es troba present
     *en alguna patologia o en la llista de gens independents, llavors mantenim la seleccio (la checkbox). */

    for (const gen of this.gensPatologiesFinals[index]['gens']){
      let trobat = false;
      for (let i=0; i<this.gensPatologiesFinals.length; i++){
        if (i!=index){
          let pos = this.gensPatologiesFinals[i]['gens'].map(function(e) { return e['gen_id']; }).indexOf(gen['gen_id']);
          if (pos != -1) {
            trobat = true;
          }
        }
      }
      if (!trobat){
        let trobat_llista_independents = false;
        let pos = this.gensFinals.map(function(e) { return e['gen_id']; }).indexOf(gen['gen_id']);
        if (pos == -1){
          let index = -1;
          for (let i=0; i<this.gensSelectedOptions.length;i++){
            if (this.gensSelectedOptions[i]['id'] == gen['gen_id']) {
              index = i;
            }
          }
          if (index != -1) {
            let aux = JSON.parse(JSON.stringify(this.gensSelectedOptions));
            aux.splice(index,1);
            this.gensSelectedOptions = aux;
          }
        }
      }
    }
  }

  desllistaGens(gens_ids){
  /*Aquí el que fem és recorrer les llistes de patologies, i per cada patologia recorrem els seus gens. Si algun dels seus
   * gens no apareix a la llista de gens_ids, que son els gens marcats, llavors implica que l'usuari ha fet una deseleccio
   * i cal que s'esborri el gen del llistat de la patologia. Per cada patologia podem arribar a esborrar un gen, marcat
   * per la posicio 'index*/

    for (const p of this.gensPatologiesFinals) {
      let i=0;
      let index = -1;
      for (const gen_p of p['gens']){
        let trobat = false;
        for (const g of gens_ids){
          if (g['id'] == gen_p['gen_id']){
            trobat = true;
          }
        }
        if (!trobat) {
          index = i;
        }
        i++;
      }
      //el gen no esta seleccionat pero apareix al llistat de la malaltia. Corregim.
      if (index != -1){
        p['gens'].splice(index, 1);
      }
    }
  }

  onSelectionGen(e){
  /* Aquesta funcio rep com a input la seleccio/deseleccio del llistat de gens indpendents
   * L'element e.option_value no ens indica si es tracta d'una seleccio o desseleccio, simplement ens
   * avisa de l'element que s'ha clicat. Si l'element es present a la llista gensFinals, l'esborrem. Si
   * no hi és, l'afegim, a no ser que estigui present dins la llista d'alguna patologia. Si esta dins la llista
   * d'alguna patologia, significa que la caixeta esta marcada, i per tant el nostre click implica l'esborrat
   * d'aquest gen de totes les llistes. Si el gen està en alguna llista, posem trobat=true i no l'afegim a la llista
   * de gensFinals.
   * A més d'aixó, cridem la funció desllistaGens, a la qual li passem com a paràmetre els gens presents en la llista
    * de gens seleccionats amb la checkbox. */

    let gen_selection = e.option._value;
    let gens_ids = e.option.selectionList._value;
    let lista = JSON.parse(JSON.stringify(this.gensFinals));

    let pos = this.gensFinals.map(function(e) { return e['gen_id']; }).indexOf(gen_selection['id']);
    if (pos == -1){
        let trobat = false;
        for (const p of this.gensPatologiesFinals) {
          for (const gen_p of p['gens']){
            if (gen_p['gen_id'] == gen_selection['id']){
              trobat = true;
            }
          }
        }
        if (! trobat) {
          lista.push({gen_id: gen_selection['id'], simbol: gen_selection['simbol']});
          this.gensFinals = lista;
        }
    }
    else{
      lista.splice(pos,1);
      this.gensFinals = lista;
    }

    this.desllistaGens(gens_ids)
  }




}
