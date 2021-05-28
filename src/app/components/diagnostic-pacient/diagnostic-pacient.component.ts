import {Component, OnInit, Input, OnChanges, SimpleChanges} from '@angular/core';
import {Observable, Subject} from "rxjs";
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
  @Input() resetComp:  boolean;

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
    if (this.pacient_id) {
      this.getDiagnostics(this.pacient_id);
      console.log("updated diagnostics form for pacient: "+this.pacient_id)
    }
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['resetComp'] !== undefined) {
      this.getDiagnostics(this.pacient_id);
      this.resetComp = false;
    }
  }

}
