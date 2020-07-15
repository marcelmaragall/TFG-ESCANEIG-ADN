import {Component, OnInit, Input, OnChanges} from '@angular/core';
import {Observable} from "rxjs";
import {SequenciacioService} from "../../services/sequenciacio.service";
import { Sequenciacio } from '../../models/Sequenciaci';


@Component({
  selector: 'app-sequenciacio',
  templateUrl: './sequenciacio.component.html',
  styleUrls: ['./sequenciacio.component.css']
})
export class SequenciacioComponent implements OnInit, OnChanges {

  constructor( private seqService: SequenciacioService) { }

  @Input() pacient_id: number;

  sequenciacions: Sequenciacio[] = [];

  ngOnInit(): void {
  }

  getSequenciacionsByPacient(id: number): Observable<Sequenciacio[]> {

    // @ts-ignore
    return this.seqService.getSequenciacionsByPacient<Sequenciacio[]>(id).subscribe(
      s => {
        this.sequenciacions = s;
      },
      err => console.error(err)
    );
  }

  ngOnChanges() {
    if(this.pacient_id) {
      this.getSequenciacionsByPacient(this.pacient_id);
    }
  }

}

