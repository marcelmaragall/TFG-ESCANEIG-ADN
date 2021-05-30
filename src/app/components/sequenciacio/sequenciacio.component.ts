import {Component, OnInit, Input, OnChanges, Output, EventEmitter} from '@angular/core';
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
  @Input() DNI: string;
  @Output() sequenciacions: EventEmitter<Sequenciacio[]> = new EventEmitter();

  //sequenciacions: Sequenciacio[] = [];

  ngOnInit(): void {

  }

  getSequenciacionsByPacient(id: number, dni: string) {

     // @ts-ignore
     this.seqService.getSequenciacionsByPacient<Sequenciacio[]>(id, dni).subscribe(
       s => {
         this.seqService.sequenciacions = s;
         this.sequenciacions.emit(s)
       },
       err => console.error(err)
     );
   }


  ngOnChanges() {
    if(this.pacient_id) {
      this.getSequenciacionsByPacient(this.pacient_id, this.DNI);
    }
  }

}

