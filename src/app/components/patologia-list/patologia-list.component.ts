import {Component, Input, OnChanges, OnInit} from '@angular/core';
import {PatologiaService} from "../../services/patologia.service";
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

  guardaPatologies(llistaPatologies: any[]){
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
  }

  ngOnChanges(): void {
    if (this.cercaActual) {
      console.log("MANICOMIOS1")
    }
  }

}
