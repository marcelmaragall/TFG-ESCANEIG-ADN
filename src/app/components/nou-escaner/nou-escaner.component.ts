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
  ) { }


  @ViewChild('seqs') selectionList: MatSelectionList;
  @ViewChild('pats') selectionPList: MatSelectionList;
  @ViewChild('gens') selectionGList: MatSelectionList;

  gensList: Gen[] = [];
  diagnosticsList: Diagnostic[] = [];

  usuari_id : number;
  sequenciacio_id: number;
  patologies_ids: [];
  gens_ids: [];



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

  onSelectionPat(e){

//    this.selectionList.selectedOptions.deselect(this.selectionList.selectedOptions.selected[0]);
    this.patologies_ids = e.option.selectionList._value;

  }

  onSelectionGen(e){
    this.gens_ids = e.option.selectionList._value;
  }




}
