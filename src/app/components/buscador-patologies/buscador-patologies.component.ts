import { Component, OnInit } from '@angular/core';
var Def = require('autocomplete-lhc');

@Component({
  selector: 'app-buscador-patologies',
  templateUrl: './buscador-patologies.component.html',
  styleUrls: ['./buscador-patologies.component.css']
})
export class BuscadorPatologiesComponent implements OnInit {

  constructor() { }

  @Input

  cercaActual = [];

  boton(): void {

  }

  ngOnInit(): void {

    new Def.Autocompleter.Search('disease',
      'https://clinicaltables.nlm.nih.gov/api/disease_names/v3/search?df=DiseaseName,ConceptID,chr',
      {tableFormat: true, valueCols: [0], colHeaders: ['Name', 'Concept ID', 'Chromosome'], maxSelect: '*'});

    Def.Autocompleter.Event.observeListSelections('disease', () => {
      var disease = $('#disease')[0];
      var autocomp = disease.autocomp;
      var itemData = autocomp.getSelectedItemData();
      console.log(itemData);

      if (itemData) {
        var arrayLength = itemData.length;
        let cercaActual = [];
        for (var i = 0; i < arrayLength; i++) {
          console.log(itemData[i]);
          cercaActual.push(itemData[i]);
        }
        this.cercaActual = cercaActual;
      }
    });

  }

}
