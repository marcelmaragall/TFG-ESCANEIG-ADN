import {Component, OnInit} from '@angular/core';
import {PatologiaService} from "../../services/patologia.service.";
import {Patologia} from "../../models/Patologia";
import {AccountService} from "../../services/account.service";

@Component({
  selector: 'app-patologia-list',
  templateUrl: './patologia-list.component.html',
  styleUrls: ['./patologia-list.component.css']
})
export class PatologiaListComponent implements OnInit {

  constructor(private patologiaService: PatologiaService, private accountService: AccountService ) { }

  patologiesUsuari = [];
  patologiesIds = [];

  getPatologies(id: number) {
    this.accountService.getPatologiesUser(id).subscribe(
      pat => {
        // @ts-ignore
        this.patologiesUsuari = pat
      },
      err => console.error(err)
    )
  }


  ngOnInit(): void {
    let usuari_id = this.accountService.userValue.id;
    this.getPatologies(usuari_id);

/*
    new Def.Autocompleter.Search('disease',
      'https://clinicaltables.nlm.nih.gov/api/disease_names/v3/search?df=DiseaseName,ConceptID',
      {tableFormat: true, valueCols: [0], colHeaders: ['Name', 'Concept ID']});
*/

  }

}
