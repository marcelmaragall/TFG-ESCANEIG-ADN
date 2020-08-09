import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Gen} from "../models/Gen";

@Injectable({
  providedIn: 'root'
})
export class GenService {

  API_URI = 'http://localhost:3000/api/gen';

  constructor(private http: HttpClient) { }


  getGen(id: number) {
    return this.http.get(`${this.API_URI}/${id}`)
  }

  getGenByMIM(mim: number) {
    return this.http.get(`${this.API_URI}/MIM/${mim}`)
  }

  getGens() {
    return this.http.get(`${this.API_URI}`)
  }

  getGensByUser(id: number) {
    return this.http.get(`${this.API_URI}/user/${id}`)
  }

  deleteGen(id: number) {
    return this.http.delete(`${this.API_URI}/${id}`)
  }

  saveGen(gen: Gen) {
    return this.http.post(`${this.API_URI}`, gen)
  }


}