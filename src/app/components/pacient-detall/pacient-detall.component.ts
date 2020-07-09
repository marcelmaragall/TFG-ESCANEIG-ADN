import { Component, OnInit } from '@angular/core';
import {PacientService} from "../../services/pacient.service";
import {Pacient} from "../../models/Pacient";
import {Observable} from "rxjs";
import { Router, ActivatedRoute, ParamMap } from '@angular/router';


@Component({
  selector: 'app-pacient-detall',
  templateUrl: './pacient-detall.component.html',
  styleUrls: ['./pacient-detall.component.css']
})
export class PacientDetallComponent implements OnInit {

  constructor(private pacientService: PacientService, private route: ActivatedRoute) { }

  // @ts-ignore
  pacient : Pacient = {};

  getPacient(id: number): Observable<Pacient>{
    // @ts-ignore
    return this.pacientService.getPacient<Pacient>(id).subscribe(
      p => {
        this.pacient = p;
      },
      err => console.error(err)
    );

/*
  getPacient(id: number){
    // @ts-ignore
    this.pacientService.getPacient(id).subscribe(
      p => {
        // @ts-ignore
        this.pacient = p;
      },
      err => console.error(err)
    )
  }
*/
  }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.getPacient(params['id']);
      console.log(params['id']);
    });
  }

}
