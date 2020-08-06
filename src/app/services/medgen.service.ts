import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Gen} from "../models/Gen";

@Injectable({
  providedIn: 'root'
})
export class MedgenService {

  API_URI = 'http://localhost:3000/api/medgen';

  constructor(private http: HttpClient) { }

  getMIM(MedGenCUI: string) {
    return this.http.get(`${this.API_URI}/${MedGenCUI}`)
  }
}



