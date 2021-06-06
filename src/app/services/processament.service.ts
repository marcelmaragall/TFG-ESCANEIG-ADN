import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class ProcessamentService {

  API_URI = 'http://192.168.1.119:3000/api';

  constructor(private http: HttpClient) { }


  addSeq(form: any){
    return this.http.post(`${this.API_URI}/addSeq`, form)
  }

  scanSeq(form: any){
    return this.http.post(`${this.API_URI}/snpScanSeq`, form)

  }

}
