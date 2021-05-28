import {
  Component,
  OnInit,
  Output,
  EventEmitter,
  Input,
  OnChanges,
} from '@angular/core';
import {Router, NavigationEnd,ActivatedRoute} from '@angular/router';


var Def = require('autocomplete-lhc');

@Component({
  selector: 'app-buscador-patologies',
  templateUrl: './buscador-patologies.component.html',
  styleUrls: ['./buscador-patologies.component.css']
})
export class BuscadorPatologiesComponent implements OnInit {

  constructor() { }


  @Output() newItemEvent = new EventEmitter<any[]>();

  cercaActual = [];

  guardaPatologies() {
    console.log(this.cercaActual)
    this.newItemEvent.emit(this.cercaActual);
    //$('.autocomp_selected ul').empty();
  }

  ngOnInit(): void {

    new Def.Autocompleter.Search('disease',
      'https://clinicaltables.nlm.nih.gov/api/disease_names/v3/search?df=DiseaseName,ConceptID',
      {tableFormat: true, valueCols: [0], colHeaders: ['Name', 'Concept ID'], maxSelect: '*'});

    Def.Autocompleter.Event.observeListSelections('disease', () => {
      var disease = $('#disease')[0];
      var autocomp = disease.autocomp;
      var itemData = autocomp.getSelectedItemData();
      console.log("!!!!");
      console.log(autocomp);
      console.log(itemData);
      if (itemData) {
        var arrayLength = itemData.length;
        let cercaActual = [];
        for (var i = 0; i < arrayLength; i++) {
          if (itemData[i].code) {
            cercaActual.push(itemData[i]);
          }
        }
        this.cercaActual = cercaActual;
      }
    });

    console.log(Def.Autocompleter)
  }


}
