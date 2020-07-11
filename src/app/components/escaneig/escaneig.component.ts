import {Component, OnChanges, OnInit, Input} from '@angular/core';
import {EscaneigService} from "../../services/escaneig.service";
import {Escaneig} from "../../models/Escaneig";
import {Observable} from "rxjs";

@Component({
  selector: 'app-escaneig',
  templateUrl: './escaneig.component.html',
  styleUrls: ['./escaneig.component.css']
})
export class EscaneigComponent implements OnInit, OnChanges {

  constructor(private escaneigService: EscaneigService) { }

  @Input() pacient_id: number;

  scans: Escaneig[] = [];

  getScans(id:number): Observable<Escaneig[]> {

    // @ts-ignore
    return this.escaneigService.getScans<Escaneig[]>(id).subscribe(
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
      this.getScans(this.pacient_id);
    }
  }

}
