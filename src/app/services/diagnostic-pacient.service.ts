import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'

import { Diagnostic } from '../models/Diagnostic'

@Injectable({
  providedIn: 'root'
})
export class DiagnosticPacientService {

  API_URI = 'http://localhost:3000/api/diagnostic';

  constructor(private http: HttpClient) {

  }

  getDiagnostic() {
    return this.http.get(`${this.API_URI}`)
  }

  getDiagnostics(id: number) {
    return this.http.get(`${this.API_URI}/${id}`)
  }

  deleteDiagnostic(id: number) {
    return this.http.delete(`${this.API_URI}/${id}`)
  }

  saveDiagnostic(diagnostic: Diagnostic) {
    return this.http.post(`${this.API_URI}`, diagnostic)
  }


}
