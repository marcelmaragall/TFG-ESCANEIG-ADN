import {Component, OnChanges, OnInit} from '@angular/core';
import {Sequenciacio} from "../../models/Sequenciaci";
import {Observable} from "rxjs";
import {ActivatedRoute} from "@angular/router";
import {SequenciacioService} from "../../services/sequenciacio.service";

@Component({
  selector: 'app-sequenciacio-detall',
  templateUrl: './sequenciacio-detall.component.html',
  styleUrls: ['./sequenciacio-detall.component.css']
})
export class SequenciacioDetallComponent implements OnInit, OnChanges {

  sequenciacio: Sequenciacio;

  constructor(private route: ActivatedRoute, private sequenciacioService: SequenciacioService) { }

  getSequenciacio(id: number): Observable<Sequenciacio> {
    // @ts-ignore
    return this.sequenciacioService.getSequenciacio<Sequenciacio>(id).subscribe(
      s => {
        this.sequenciacio = s;
      },
      err => console.error(err)
    );
  }

  ngOnInit(): void {
     this.route.params.subscribe(params => {
       this.getSequenciacio(params['id']);
       console.log(params['id']);
     });
  }

  ngOnChanges(): void {
  }


}
