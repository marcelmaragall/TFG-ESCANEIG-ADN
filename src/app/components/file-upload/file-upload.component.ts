import {Component, EventEmitter, Input, OnInit, Output, OnDestroy} from '@angular/core';
import { FileUploadService} from "../../services/file-upload.service";
import {Observable, Subscription} from "rxjs";

@Component({
  selector: 'app-file-upload',
  templateUrl: './file-upload.component.html',
  styleUrls: ['./file-upload.component.css']
})
export class FileUploadComponent implements OnInit, OnDestroy {

  constructor(private fileUploadService: FileUploadService) { }

  private eventsSubscription: Subscription;
  fileToUpload: File = null;

  @Input() sequenciaRegistrada: Observable<void>;
  @Output() newItemEvent = new EventEmitter<Boolean>();


  fitxerSeleccionat(){
    if (this.fileToUpload)
      this.newItemEvent.emit(true);
    else this.newItemEvent.emit(false);
  }

  handleFileInput(files: FileList) {
    this.fileToUpload = files.item(0);
    this.fitxerSeleccionat();
    console.log("HE POSAT UN FITXER DINS")
  }

  uploadFileToActivity(dades) {
    this.fileUploadService.postFile(this.fileToUpload, dades).subscribe(data => {
      // do something, if upload success
      console.log(data)
    }, error => {
      console.log(error);
      console.log("No s'han pogut pujar els fitxers");
    });
  }

  ngOnInit(): void {
    this.eventsSubscription = this.sequenciaRegistrada.subscribe((dades) => {
      this.uploadFileToActivity(dades);
    })
  }


  ngOnDestroy(): void {
    this.eventsSubscription.unsubscribe();
    console.log("destoy")
  }

}
