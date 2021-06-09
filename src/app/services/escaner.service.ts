import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Escaner} from "../models/Escaner";

@Injectable({
  providedIn: 'root'
})
export class EscanerService {

  constructor(private http: HttpClient) { }

  scans: Escaner[] = [];

  API_URI = 'http://localhost:3000/api/scan';

  getScan(id: number) {
    return this.http.get(`${this.API_URI}/${id}`)
  }

  getResultatsEscaner(id: number){
    return this.http.get(`${this.API_URI}/resultat/${id}`)
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

  saveScan(escaneig: any) {
    return this.http.post(`${this.API_URI}`, escaneig)
  }

  update(id, params) {
    return this.http.put(`${this.API_URI}/${id}`, params)
  }

}
