import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Escaneig} from "../models/Escaneig";

@Injectable({
  providedIn: 'root'
})
export class EscaneigService {

  constructor(private http: HttpClient) { }

  API_URI = 'http://localhost:3000/api/scan';

  getScan() {
    return this.http.get(`${this.API_URI}`)
  }

  getScansByPacient(id: number) {
    return this.http.get(`${this.API_URI}/pacient/${id}`)
  }

  getScansBySeq(id: number) {
    return this.http.get(`${this.API_URI}/seq/${id}`)
  }

  deleteScans(id: number) {
    return this.http.delete(`${this.API_URI}/${id}`)
  }

  saveScans(escaneig: Escaneig) {
    return this.http.post(`${this.API_URI}`, escaneig)
  }

}
