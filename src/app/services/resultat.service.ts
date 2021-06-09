import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {MatTableDataSource} from "@angular/material/table";
import {FormControl, FormGroup} from "@angular/forms";

@Injectable({
  providedIn: 'root'
})
export class ResultatService {

  API_URI = 'http://localhost:3000/api/resultat';

  constructor(private http: HttpClient) { }

  resultatsEscaner: MatTableDataSource<any>;


  getResultat(id: number) {
    return this.http.get(`${this.API_URI}/${id}`)
  }

  getResultats() {
    return this.http.get(`${this.API_URI}`)
  }

  deleteResultat(id: number) {
    return this.http.delete(`${this.API_URI}/${id}`)
  }

  saveResultat(resultat: any) {
    return this.http.post(`${this.API_URI}`, resultat)
  }


  updateResultat(id: number, resultat: any) {
    return this.http.put(`${this.API_URI}/${id}`, resultat)
  }


  resultatForm: FormGroup = new FormGroup({
    comentaris: new FormControl(),
  });

  initializeResultatFormGroup() {
    this.resultatForm.setValue({
      comentaris: '',
    });
  }

}
