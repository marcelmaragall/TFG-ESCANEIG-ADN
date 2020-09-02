import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import  {Sequencia} from "../models/sequencia";
import {AppConfig} from "../../environments/environment";
import {map} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class SequenciaService {

  API_URI = 'http://localhost:3000/api/sequenciacio';

  constructor(private http: HttpClient) { }

  saveSequencia(sequencia: Sequencia){
    return this.http.post(`${this.API_URI}`,sequencia)
  }

  getSequenciacio(id: number) {
    return this.http.get<Sequencia>(`${this.API_URI}/${id}`)
  }

  update(id, params) {
    console.log("hahahahah")
    return this.http.put(`${this.API_URI}/${id}`, params)
  }


}
