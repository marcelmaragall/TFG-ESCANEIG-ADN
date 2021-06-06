import { Injectable } from '@angular/core';
import {Observable} from "rxjs";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import { FormBuilder, FormGroup } from '@angular/forms';



@Injectable({
  providedIn: 'root'
})
export class FileUploadService {

  API_URI = 'http://192.168.1.119:3000/api/addSeq';

  constructor(private http: HttpClient, private formBuilder: FormBuilder) { }

  postFile(fileToUpload: File, dades: Object) {
    // this.uploadForm = this.formBuilder.group({
    //
    // });
    const formData = new FormData();
    formData.append('file', fileToUpload);
    formData.append('DNI', dades['DNI']);
    formData.append('nom_sequencia', dades['nom_sequencia']);

    // var options = { content: formData};
    return this.http.post(this.API_URI, formData)
  }

}
