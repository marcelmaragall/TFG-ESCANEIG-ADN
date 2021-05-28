import {Component, Input, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {Observable, Subject} from "rxjs";
import {SequenciacioService} from "../../services/sequenciacio.service";
import {DatePipe} from "@angular/common";
import {FormControl, Validators} from "@angular/forms";
import {NotificacioService} from "../../services/notificacio.service";
import {ProcessamentService} from "../../services/processament.service";

@Component({
  selector: 'app-sequencia-form',
  templateUrl: './sequencia-form.component.html',
  styleUrls: ['./sequencia-form.component.css']
})
export class SequenciacioFormComponent implements OnInit {

  constructor(
    private sequenciacioService: SequenciacioService,
    private notificacioService: NotificacioService,
    private processamentService: ProcessamentService,
  ) {}


  ngOnInit(): void {

// rebem l'id del pacient a traves del routerLink. + info a https://medium.com/ableneo/how-to-pass-data-between-routed-components-in-angular-2306308d8255
/*    this.pacient_id = history.state.data[0];
    this.DNI = history.state.data[1];


  this.route.params.subscribe(params => {
    // this.getSequenciacio(params['id']);
    if (params['id']){
      this.seq_id = params['id'];
      this.isAddMode = false;
    }
    else this.isAddMode = true;
  });


  this.form = this.formBuilder.group({
    nom: ['', Validators.required],
    cromossoma: ['', Validators.required],
    data: [null],
    laboratori: ['', Validators.required],
    descripcio: ['', Validators.required],
    estat: ['uploading'],
    pacient: this.pacient_id
  });


  if (!this.isAddMode) {
    this.sequenciaService.getSequenciacio(this.seq_id)
      .subscribe(x => {
        this.f.nom.setValue(x.nom);
        this.f.cromossoma.setValue(x.cromossoma);
        this.f.data.setValue(x.data);
        this.f.laboratori.setValue(x.laboratori);
        this.f.descripcio.setValue(x.descripcio);
        this.pacient_id = x.pacient
      });
   }*/

}

  onClear() {
    this.sequenciacioService.form.reset();
    this.sequenciacioService.initializeFormGroup();
  }

/*
  onSubmit() {
    this.submitted = true;

    // stop here if form is invalid
    if (this.form.invalid) {
      return;
    }

    if (this.isAddMode) {
      this.createSequencia();
    } else {
      this.updateSequencia();
    }
  }*/

  onSubmit() {
    if (this.sequenciacioService.form.valid) {

      //Si es guarda una data, la guardem en un format correcte, altrament el format per defecte es massa llarg
      if (this.sequenciacioService.form.value.data) {
        let pipe = new DatePipe('es');
        let dataFormatejada = pipe.transform(this.sequenciacioService.form.value.data, 'yyyy-MM-dd');
        this.sequenciacioService.form.value.data = dataFormatejada;
      }
      let trobat = false;
      let i = 0;
      while (i < this.sequenciacioService.sequenciacions.length && !trobat) {
        if (this.sequenciacioService.sequenciacions[i].nom === this.sequenciacioService.form.value.nom) {
          trobat = true;
        }
        i++;
      }
      if (trobat) {
        return  this.notificacioService.error('ERROR: nom de la seqüència ja existeix. Introduir nom únic.')
      }

      this.sequenciacioService.saveSequenciacio(this.sequenciacioService.form.value)
        .subscribe(
          data => {
          //data => {
            //Si el registre es crea amb exit a la base de dades, procedim a enviar la sequencia al servidor de sequencies
            const formData = new FormData();
            formData.append('DNI', this.sequenciacioService.pacient_dni);
            formData.append('nom_sequencia', this.sequenciacioService.form.value.nom);
            formData.append('file', this.sequenciacioService.form.value.fitxerSequencia._files[0],this.sequenciacioService.form.value.fitxerSequencia._files[0].name);

            this.enviarFitxerAServidor(formData, data['seq_id']);

            this.onClear();

          },
          error => {
            this.notificacioService.error('Error en les dades de la seqüència.');
            console.log(error);
          });
    }
  }


  enviarFitxerAServidor(dades, id_db){

    this.processamentService.addSeq(dades).subscribe(
      data => {
        this.notificacioService.success('Fitxer pujat. Indexant.');
        if (id_db) {
          //carreguem objecte creat a la vista de llista del component actual.
          this.sequenciacioService.form.value.id = id_db;
          this.sequenciacioService.sequenciacions.push(
            this.sequenciacioService.form.value
          )
        }
      },
      error => {
        //Si hi ha hagut problemes en la pujada de la sequencia, esborrem el registre de la base de dades.
        this.sequenciacioService.deleteSequenciacio(id_db).subscribe(
          data => {
            console.log("sequencia "+id_db+" esborrada")
          }
        );
        this.notificacioService.error('Error en la pujada de la seqüència.');

      }
    )
  }


  /*
  private updateSequencia() {
    this.sequenciaService.update(this.seq_id, this.form.value)
      .subscribe(
        data => {
          this.router.navigate(['pacients/'+this.pacient_id]);
        },
        error => {
          console.log(error);
        });
  }*/


}
