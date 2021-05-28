import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { Sequenciacio } from '../models/Sequenciacio'
import {RxReactiveFormsModule, RxwebValidators} from "@rxweb/reactive-form-validators";

@Injectable({
  providedIn: 'root'
})
export class SequenciacioService {

  API_URI = 'http://localhost:3000/api/sequenciacio';

  sequenciacions: Sequenciacio[] = [];
  pacient_id: number;
  pacient_dni: string;

  constructor(private http: HttpClient) {

  }

  getSequenciacio(id: number) {
    return this.http.get(`${this.API_URI}/${id}`)
  }

  getSequenciacionsByPacient(id: number, dni: string) {
    this.pacient_id = id;
    this.pacient_dni = dni;
    return this.http.get(`${this.API_URI}/pacient/${id}`)
  }

  deleteSequenciacio(id: number) {
    return this.http.delete(`${this.API_URI}/${id}`)
  }

  saveSequenciacio(sequenciacio: Sequenciacio) {
    let body = JSON.parse(JSON.stringify(sequenciacio));
    delete body.fitxerSequencia;
    return this.http.post(`${this.API_URI}`, body)
  }

  form: FormGroup = new FormGroup({
    id: new FormControl(),
    nom: new FormControl('', [Validators.required, Validators.pattern("^[a-zA-Z0-9_]*$")]),
    laboratori: new FormControl(''),
    cromossoma: new FormControl(''),
    comentari: new FormControl(''),
    data: new FormControl(''),
    estat: new FormControl(''),
    pacient: new FormControl(),
    fitxerSequencia: new FormControl('', [Validators.required]),
    //fitxerSequencia: ['',[RxwebValidators.extension({extensions:["fasta","FASTA"]})]]
  });

  initializeFormGroup() {
    this.form.setValue({
      id: null,
      nom: '',
      laboratori: '',
      cromossoma: '',
      comentari: '',
      data: null,
      estat: 'indexing',
      pacient: this.pacient_id,
      fitxerSequencia: null
    });
  }


}
