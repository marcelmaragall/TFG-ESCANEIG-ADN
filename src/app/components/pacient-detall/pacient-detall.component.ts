//Core
import { Component, OnInit, ViewChild} from '@angular/core';
import {Observable, Subject} from "rxjs";
import { Router, ActivatedRoute, ParamMap } from '@angular/router';

//Models
import {Diagnostic} from "../../models/Diagnostic";
import {Pacient} from "../../models/Pacient";

//Components
import {SequenciacioFormComponent} from "../sequencia-form/sequencia-form.component";
import {DiagnosticPacientComponent} from "../diagnostic-pacient/diagnostic-pacient.component";

//Services
import {DiagnosticPacientService} from "../../services/diagnostic-pacient.service";
import {AccountService} from "../../services/account.service";
import {PacientService} from "../../services/pacient.service";
import {PatologiaService} from "../../services/patologia.service";
import {SequenciacioService} from "../../services/sequenciacio.service";

//Material
import {MatDialog, MatDialogConfig} from "@angular/material/dialog";
import {NouEscanerComponent} from "../nou-escaner/nou-escaner.component";
import {Sequenciacio} from "../../models/Sequenciaci";



@Component({
  selector: 'app-pacient-detall',
  templateUrl: './a_pacient_detall.component.html',
  styleUrls: ['./pacient-detall.component.css']
})

export class PacientDetallComponent implements OnInit {

  constructor(private pacientService: PacientService, private patologiaService: PatologiaService, private diagnosticService: DiagnosticPacientService, private accountService: AccountService,private route: ActivatedRoute, private dialog: MatDialog, private seqService: SequenciacioService) { }

  // @ts-ignore
  pacient : Pacient = {};

  usuari_id : number;

  patologia: any = {
    nom: '',
    ncbid: '',
  };

  diagnostic: Diagnostic = {
    pacient_id: null,
    patologia_id: null,
    nomPatologia: '',
    comentaris: '',
  };

  sequenciacions: Sequenciacio[];

  resetDiagnosticsComp : boolean;
  pacientIsLoaded: boolean;

  //resetFormSubject: Subject<boolean> = new Subject<boolean>();
  resetChildForm(){
    //this.resetFormSubject.next(true);
  }


  getPacient(id: number): Observable<Pacient>{
    // @ts-ignore
    return this.pacientService.getPacient<Pacient>(id).subscribe(
      p => {
        this.pacient = p;
        this.pacientIsLoaded = true;
      },
      err => console.error(err)
    );
  }

  guardaDiagnostics(llistaPatologies: any[]){
    for (let i=0; i<llistaPatologies.length;i++) {
      this.patologia.nom = llistaPatologies[i].text;
      this.patologia.ncbid = llistaPatologies[i].code;
      let patologiaID;
      this.patologiaService.savePatologia(this.patologia).subscribe(
        pat => {
          patologiaID = pat;
        },
        err => console.error(err),
        () => {
          this.diagnostic.pacient_id = this.pacient.id;
          this.diagnostic.patologia_id = patologiaID.id;
          this.diagnostic.nomPatologia = llistaPatologies[i].text;
          //TODO afegir data diagnostik
          console.log("la patologia es: "+llistaPatologies[i].text)
          // this.diagnosticService.savePatologiaPacient({patologia_id: patologiaID.id, pacient_id: this.pacient.id, nomPatologia: patologiaID.nom }).subscribe(
          this.diagnosticService.saveDiagnostic(this.diagnostic).subscribe(
            res => {
              console.log(res);
            },
            err => {
              console.log(err);
            },
            () => {
              this.accountService.savePatologiaUser({patologia_id: patologiaID.id, usuari_id: this.usuari_id}).subscribe(
                res => {
                  console.log(res);
                },
                err => {
                  console.log(err);
                },
                () => {
                  if (this.resetDiagnosticsComp) {
                    this.resetDiagnosticsComp = false;
                  } else {
                    this.resetDiagnosticsComp = true;
                  }
                }
              )
            }
          )
        }
      );
    }
  }

  sequenciacionsHandler(seqs: any[]){
    console.log(seqs);
    this.sequenciacions = seqs;
  }

  openSeqDialog() {
    this.seqService.initializeFormGroup();
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = false;
    dialogConfig.autoFocus = true;
    dialogConfig.width = "60%";
    const dialogRef = this.dialog.open(SequenciacioFormComponent, dialogConfig);

    // dialogRef.afterClosed().subscribe(result => {
    //   console.log(`Dialog result: ${result}`);
    // });
  }

  openScanDialog() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = false;
    dialogConfig.autoFocus = true;
    dialogConfig.width = "88%";
    let indexedSeqs = [];
    for (let i=0; i< this.sequenciacions.length;i++) {
      if (this.sequenciacions[i].estat == 'done') {
        indexedSeqs.push(this.sequenciacions[i])
      }
    }
    dialogConfig.data = {
      sequenciacions: indexedSeqs,
      pacient_id: this.pacient.id
    };
    const dialogRef = this.dialog.open(NouEscanerComponent, dialogConfig);

    // dialogRef.afterClosed().subscribe(result => {
    //   console.log(`Dialog result: ${result}`);
    // });
  }

  ngOnInit(): void {
    this.usuari_id = this.accountService.userValue.id;
    this.route.params.subscribe(params => {
      this.getPacient(params['id']);
      console.log(params['id']);
    });
  }

  // ngAfterViewInit(): void {
  //   this.diagnostics.getDiagnostics(this.pacient.id)
  // }
}
