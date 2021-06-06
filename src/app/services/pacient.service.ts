import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'

import { Pacient } from '../models/Pacient'
import {Observable} from "rxjs";
import {AppConfig} from "../../environments/environment";
import {MatTableDataSource} from "@angular/material/table";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {AccountService} from "./account.service";

@Injectable({
  providedIn: 'root'
})
export class PacientService {

  API_URI = 'http://localhost:3000/api/pacient';
  pacients: MatTableDataSource<any>;

  constructor(private http: HttpClient, private accountService: AccountService) {

  }

  getPacients() {
    return this.http.get(`${this.API_URI}`)
  }

  getPacient(id: number) {
    return this.http.get(`${this.API_URI}/${id}`)
  }

  deletePacient(id: number) {
    return this.http.delete(`${this.API_URI}/${id}`)
  }

  savePacient(pacient: Pacient) {
    return this.http.post(`${this.API_URI}`, pacient)
  }

  updatePacient(id: number, updatedPacient: Pacient): Observable<Pacient> {
    return this.http.put<Pacient>(`${this.API_URI}/${id}`, updatedPacient)
  }

  populateForm(pacient){
    delete pacient.created_at;
    this.pacientForm.setValue(pacient);
  }

  pacientForm = new FormGroup({
    id: new FormControl(),
    nom: new FormControl('', [Validators.required, Validators.maxLength(20)]),
    cognoms: new FormControl('',Validators.required),
    dni: new FormControl('',Validators.required),
    ce: new FormControl('',Validators.required),
    telefon: new FormControl(''),
    pais: new FormControl('',Validators.required),
    ciutat: new FormControl(''),
    address: new FormControl(''),
    altres_dades: new FormControl(),
    usuari: new FormControl()
  });

  initializeFormGroup() {
    this.pacientForm.setValue({
      id: null,
      nom: '',
      cognoms: '',
      dni: '',
      ce: '',
      telefon: '',
      pais: '',
      ciutat: '',
      address: '',
      altres_dades: '',
      usuari: this.accountService.userValue.id,
    });
  }

}
