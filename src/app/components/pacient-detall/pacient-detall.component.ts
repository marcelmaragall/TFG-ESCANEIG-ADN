import { Component, OnInit, ViewChild} from '@angular/core';
import {PacientService} from "../../services/pacient.service";
import {PatologiaService} from "../../services/patologia.service.";
import {Pacient} from "../../models/Pacient";
import {Observable} from "rxjs";
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import {DiagnosticPacientComponent} from "../diagnostic-pacient/diagnostic-pacient.component";
import {DiagnosticPacientService} from "../../services/diagnostic-pacient.service";
import {Diagnostic} from "../../models/Diagnostic";
import {compareSegments} from "@angular/compiler-cli/ngcc/src/sourcemaps/segment_marker";
import {AccountService} from "../../services/account.service";


@Component({
  selector: 'app-pacient-detall',
  templateUrl: './pacient-detall.component.html',
  styleUrls: ['./pacient-detall.component.css']
})

export class PacientDetallComponent implements OnInit {

  constructor(private pacientService: PacientService, private patologiaService: PatologiaService, private diagnosticService: DiagnosticPacientService, private accountService: AccountService,private route: ActivatedRoute) { }

  // @ts-ignore
  pacient : Pacient = {};

  usuari_id : number;

  patologia: any = {
    nom: '',
    ncbid: '',
    descripcio: ''
  };

  diagnostic: Diagnostic = {
    pacient_id: null,
    patologia_id: null,
    nomPatologia: '',
    comentaris: '',
  };

  getPacient(id: number): Observable<Pacient>{
    // @ts-ignore
    return this.pacientService.getPacient<Pacient>(id).subscribe(
      p => {
        this.pacient = p;
      },
      err => console.error(err)
    );
  }

  guardaDiagnostics(llistaPatologies: any[]){
    for (let i=0; i<llistaPatologies.length;i++) {
      this.patologia.nom = llistaPatologies[i].text;
      this.patologia.ncbid = llistaPatologies[i].code;
      this.patologia.descripcio = '';
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
          console.log("la patologia es: "+llistaPatologies[i].text)
          // this.diagnosticService.savePatologiaPacient({patologia_id: patologiaID.id, pacient_id: this.pacient.id, nomPatologia: patologiaID.nom }).subscribe(
          this.diagnosticService.savePatologiaPacient(this.diagnostic).subscribe(
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
                }
              )
            }
          )
        }
      );
    }
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
