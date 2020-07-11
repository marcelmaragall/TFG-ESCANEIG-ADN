import {Component, OnInit, Input, OnChanges} from '@angular/core';
import {Observable} from "rxjs";
import { DiagnosticPacientService } from '../../services/diagnostic-pacient.service'
import {Diagnostic} from "../../models/Diagnostic";

@Component({
  selector: 'app-diagnostic-pacient',
  templateUrl: './diagnostic-pacient.component.html',
  styleUrls: ['./diagnostic-pacient.component.css']
})
export class DiagnosticPacientComponent implements OnInit, OnChanges {

  constructor(private diagnosticService : DiagnosticPacientService) { }

  @Input() pacient_id: number;

  diagnostics : any[];

  getDiagnostics(id: number): Observable<Diagnostic[]> {
    // @ts-ignore
    return this.diagnosticService.getDiagnostics<Diagnostic[]>(id).subscribe(
      d => {
        this.diagnostics = d;
      },
      err => console.error(err)
    );
  }

    ngOnInit(): void {
      //this.getDiagnostics(this.pacient_id);
    }

    ngOnChanges() {
    if(this.pacient_id) {
      this.getDiagnostics(this.pacient_id);
    }
  }

}
