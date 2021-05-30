import {Component, OnChanges, OnInit, Input} from '@angular/core';
import {EscanerService} from "../../services/escaner.service";
import {Escaner} from "../../models/Escaner";
import {Observable} from "rxjs";

@Component({
  selector: 'app-escaneig',
  templateUrl: './escaneig.component.html',
  styleUrls: ['./escaneig.component.css']
})
export class EscaneigComponent implements OnInit, OnChanges {

  constructor(private escaneigService: EscanerService) { }

  @Input() pacient_id: number;
  @Input() seq_id: number;

  scans: Escaner[] = [];

  getScansByPacient(id:number): Observable<Escaner[]> {

    // @ts-ignore
    return this.escaneigService.getScansByPacient<Escaner[]>(id).subscribe(
      s => {
        this.scans = s;
      },
      err => console.error(err)
    )
  }

  getScansBySeq(id:number): Observable<Escaner[]> {

    // @ts-ignore
    return this.escaneigService.getScansBySeq<Escaner[]>(id).subscribe(
      s => {
        this.scans = s;
      },
      err => console.error(err)
    )
  }


  ngOnInit(): void {
  }

  ngOnChanges(): void {
    if (this.pacient_id) {
      this.getScansByPacient(this.pacient_id);
    }
    if (this.seq_id) {
      this.getScansBySeq(this.seq_id)
    }
  }

}
