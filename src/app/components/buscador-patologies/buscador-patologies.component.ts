import { Component, OnInit } from '@angular/core';
var Def = require('autocomplete-lhc');

@Component({
  selector: 'app-buscador-patologies',
  templateUrl: './buscador-patologies.component.html',
  styleUrls: ['./buscador-patologies.component.css']
})
export class BuscadorPatologiesComponent implements OnInit {

  constructor() { }

  cercaActual = [];

  boton(): void {

  }

  ngOnInit(): void {

    new Def.Autocompleter.Search('disease',
      // 'https://clinicaltables.nlm.nih.gov/api/conditions/v3/search?ef=term_icd9_code',
      'https://clinicaltables.nlm.nih.gov/api/disease_names/v3/search?df=DiseaseName,ConceptID,chr',
      {tableFormat: true, valueCols: [0], colHeaders: ['Name', 'Concept ID', 'Chromosome'], maxSelect: '*'});

    Def.Autocompleter.Event.observeListSelections('disease', () => {
      var disease = $('#disease')[0];
      var autocomp = disease.autocomp;
      var itemData = autocomp.getSelectedItemData();
      console.log(itemData);
      console.log("carallo");

      // $('#icd9_code')[0].value = itemData && itemData[0].data ?
      //   itemData[0].data.term_icd9_code  : '';

      $('#code')[0].value = itemData && itemData[0].code ?
        itemData[0].code  : '';
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
