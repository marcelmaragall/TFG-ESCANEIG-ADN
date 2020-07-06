import { Component, OnInit } from '@angular/core';

import { PacientService } from '../../services/pacient.service'

@Component({
  selector: 'app-pacient-list',
  templateUrl: './pacient-list.component.html',
  styleUrls: ['./pacient-list.component.css']
})
export class PacientListComponent implements OnInit {

  pacients: any = [];

  constructor(private pacientService: PacientService) { }

  getPacients(){
    this.pacientService.getPacients().subscribe(
      res => {
        this.pacients = res;
      },
      err => console.error(err)
    )
  }

  ngOnInit(): void {
    this.getPacients();
  }

  deletePacient(id: number) {
    this.pacientService.deletePacient(id)
      .subscribe(
        res=> {
          console.log(res);
          this.getPacients();
        },
        err => {
          console.log(err)
        }
      )
  }
}
