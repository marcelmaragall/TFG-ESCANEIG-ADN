import { Component, OnInit } from '@angular/core';
import { MedgenService } from "../../services/medgen.service";
import {Gen} from "../../models/Gen";
import {Observable} from "rxjs";
import {Pacient} from "../../models/Pacient";
import {ActivatedRoute} from "@angular/router";
import {Patologia} from "../../models/Patologia";
import {PatologiaService} from "../../services/patologia.service.";
import {concatAll} from "rxjs/operators";
import {GenService} from "../../services/gen.service";


@Component({
  selector: 'app-patologia-detall',
  templateUrl: './patologia-detall.component.html',
  styleUrls: ['./patologia-detall.component.css']
})
export class PatologiaDetallComponent implements OnInit {

  constructor(private route: ActivatedRoute, private medgenService: MedgenService, private patologiaService: PatologiaService, private  genService: GenService) { }

  MIMList = [];
  gensAssociats : any[] = [];
  //gensAssociats : Gen[] = [];
  MIM : number;
  patologia : Patologia;



  getGens(): void {
    for (var i = 0; i < this.MIMList.length; i++) {
      this.genService.getGenByMIM(this.MIMList[i]).subscribe(
        gen => {
          this.gensAssociats.push(gen);
        },
        err => {
          console.log(err)
        }
      )
    }
    console.log(this.gensAssociats)
  }

  getGenMIMs(MedGenCUI: string): void {

    //1. buscar MIM a traves del codi de la malaltia a la nova taula mim2genes
    this.medgenService.getMIM(MedGenCUI).subscribe(
      mim => {
        // @ts-ignore
        this.MIM = mim;
        console.log("tenemo el MIM")
      },
      err => {
        this.MIM = null;
      },
      () => {

        console.log(this.MIM);
        //2. fer crida API https://api.omim.org/api/entry?mimNumber=104300&include=geneMap&format=json&apiKey=IO30VDphQGmHcyAGc87nQw

        let URL = "https://api.omim.org/api/entry?mimNumber="+this.MIM+"&include=geneMap&format=json&apiKey=IO30VDphQGmHcyAGc87nQw";
        const fetchPromise = fetch(URL);

        fetchPromise.then(response => {
          return response.json();
        }).then(body => {
          let entry = body.omim.entryList[0].entry;
          if (entry.phenotypeMapList) {
            //3. Extreure els MIMs
            for (var i = 0; i < entry.phenotypeMapList.length; i++) {
              let mim = entry.phenotypeMapList[i].phenotypeMap.mimNumber;
              this.MIMList.push(mim);
            }
            this.getGens();
          }
          else {
            console.log("no hi ha gens associats")
          }
        });
      }
    )
    //4. Cerca els gens a la base de dades a traves del MIM
  }

  getPatologia(id: number): Observable<Patologia> {
    // @ts-ignore
     return this.patologiaService.getPatologia<Patologia>(id).subscribe(
      p => {
        this.patologia = p;
        console.log("***")
        console.log(p)
        console.log("***")

      },
      err => {
        console.error(err)
      },
       () => {
         this.getGenMIMs(this.patologia.ncbid);
       }
    )
  }

    ngOnInit(): void {
      this.route.params.subscribe(params => {
      this.getPatologia(params['id']);
    },
          err => {
      console.log("No s'ha pogut carregar la patologia")
      }
    );
  }

}
