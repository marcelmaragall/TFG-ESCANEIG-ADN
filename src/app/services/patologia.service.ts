import { Injectable } from '@angular/core';
import {Diagnostic} from "../models/Diagnostic";
import {HttpClient} from "@angular/common/http";
import {Patologia} from "../models/Patologia";

@Injectable({
  providedIn: 'root'
})
export class PatologiaService {

  API_URI = 'http://localhost:3000/api/patologia';

  constructor(private http: HttpClient) { }


  getPatologia(id: number) {
    console.log("seguimos")
    return this.http.get(`${this.API_URI}/${id}`)
  }

  getPatologies() {
    return this.http.get(`${this.API_URI}`)
  }

  getPatologiesByUser(id: number) {
    return this.http.get(`${this.API_URI}/user/${id}`)
  }

  deletePatologia(id: number) {
    return this.http.delete(`${this.API_URI}/${id}`)
  }

  savePatologia(patologia: any) {
    return this.http.post(`${this.API_URI}`, patologia)
  }


}
