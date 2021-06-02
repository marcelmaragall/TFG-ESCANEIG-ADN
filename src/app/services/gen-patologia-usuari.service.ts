import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class GenPatologiaUsuariService {

  API_URI = 'http://localhost:3000/api/patologia-gen-usuari';


  constructor(private http: HttpClient) { }

  gensAssociats: any[] = [];


  getGensByPatologiaAndUser(usuari_id:number, patologia_id: number){
    return this.http.get(`${this.API_URI}/gens?user_id=${usuari_id}&pat_id=${patologia_id}`)
    //return this.http.get(`${this.API_URI}`)
  }

  saveGenByPatologiaAndUser(associacio: any){
    return this.http.post(`${this.API_URI}`, associacio);
  }







}
