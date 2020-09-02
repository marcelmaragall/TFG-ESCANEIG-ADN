import {Component, Input, OnInit} from '@angular/core';
import { SequenciaService} from "../../services/sequencia.service";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {first} from "rxjs/operators";
import {ActivatedRoute, Router} from "@angular/router";
import {Observable, Subject} from "rxjs";

@Component({
  selector: 'app-sequencia-form',
  templateUrl: './sequencia-form.component.html',
  styleUrls: ['./sequencia-form.component.css']
})
export class SequenciaFormComponent implements OnInit {

  form: FormGroup;
  id: number;
  //loading = false;
  isAddMode: boolean;
  submitted = false;
  seq_id: number;
  pacient_id : number;
  DNI: string;
  fitxerOK: boolean;

  eventSubject: Subject<void> = new Subject<void>();

  constructor(
    private sequenciaService: SequenciaService,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
  ) {}

  enviarFitxerAServidor(dades){
    this.eventSubject.next(dades);
  }

  hiHaFitxer(fitxer: boolean) {
    if (fitxer) {
      this.fitxerOK = true;
    }
    else this.fitxerOK = false;
  }

  ngOnInit(): void {

// rebem l'id del pacient a traves del routerLink. + info a https://medium.com/ableneo/how-to-pass-data-between-routed-components-in-angular-2306308d8255
    this.pacient_id = history.state.data[0];
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
   }

}

  // convenience getter for easy access to form fields
  get f() { return this.form.controls; }

  onClear() {
    // this.sequenciaService.form.reset();
    // this.sequenciaService.initializeFormGroup();
  }


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
  }

  onClose() {
    // this.sequenciaService.form.reset();
    // this.sequenciaService.initializeFormGroup();

    // this.dialogRef.close();
  }


  private createSequencia() {
    this.sequenciaService.saveSequencia(this.form.value)
      .subscribe(
        data => {
          //Si el registre es crea amb exit a la base de dades, procedim a enviar la sequencia al servidor de sequencies
          var dades = {"DNI" : this.DNI, "nom_sequencia" : this.form.controls['nom'].value};
          //Hem d'enviar sequencia, nom sequencia i DNI al servidor de sequencies
          this.enviarFitxerAServidor(dades);
          this.router.navigate(['pacients/'+this.pacient_id]);
        },
        error => {
          console.log(error);
        });
  }

  private updateSequencia() {
    this.sequenciaService.update(this.seq_id, this.form.value)
      .subscribe(
        data => {
          this.router.navigate(['pacients/'+this.pacient_id]);
        },
        error => {
          console.log(error);
        });
  }


}
