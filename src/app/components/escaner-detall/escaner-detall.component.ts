import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {EscanerService} from "../../services/escaner.service";
import {SequenciacioService} from "../../services/sequenciacio.service";
import {PacientService} from "../../services/pacient.service";

@Component({
  selector: 'app-escaner-detall',
  templateUrl: './escaner-detall.component.html',
  styleUrls: ['./escaner-detall.component.css']
})
export class EscanerDetallComponent implements OnInit {

  constructor(private route: ActivatedRoute, private escanerService: EscanerService, private seqService: SequenciacioService, private pacService: PacientService) { }

  escaner_id: number;
  escaner: any;
  seq: any;
  pac: any
  allIsLoaded: boolean = false;

  ngOnInit(): void {
    this.route.params.subscribe(params => {
        this.escaner_id = params['id'];

        this.escanerService.getScan(this.escaner_id).subscribe(
          res => {
            this.escaner = res;
            this.seqService.getSequenciacio(res['seq']).subscribe(
              res => {
                this.seq = res;
                this.pacService.getPacient(res['pacient']).subscribe(
                  res => {
                    this.pac = res;
                    this.allIsLoaded = true;
                  });
              }
            )
          }
        )
      },
      err => {
        console.log("No s'ha pogut carregar la patologia")
      }
    );
  }

}
