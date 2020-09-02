import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'

import { Pacient } from '../models/Pacient'
import {Observable} from "rxjs";
import {AppConfig} from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class PacientService {

  API_URI = 'http://localhost:3000/api/pacient';

  constructor(private http: HttpClient) {

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

}
