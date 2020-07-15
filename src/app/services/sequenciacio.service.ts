import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'

import { Sequenciacio } from '../models/Sequenciaci'

@Injectable({
  providedIn: 'root'
})
export class SequenciacioService {

  API_URI = 'http://localhost:3000/api/sequenciacio';

  constructor(private http: HttpClient) {

  }

  getSequenciacio(id: number) {
    return this.http.get(`${this.API_URI}/${id}`)
  }

  getSequenciacionsByPacient(id: number) {
    return this.http.get(`${this.API_URI}/pacient/${id}`)
  }

  deleteSequenciacio(id: number) {
    return this.http.delete(`${this.API_URI}/${id}`)
  }

  saveSequencacio(sequenciacio: Sequenciacio) {
    return this.http.post(`${this.API_URI}`, sequenciacio)
  }


}
