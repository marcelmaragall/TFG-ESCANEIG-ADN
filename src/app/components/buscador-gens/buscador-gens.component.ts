import {Component, EventEmitter, OnInit, Output} from '@angular/core';

var Def = require('autocomplete-lhc');


@Component({
  selector: 'app-buscador-gens',
  templateUrl: './buscador-gens.component.html',
  styleUrls: ['./buscador-gens.component.css']
})
export class BuscadorGensComponent implements OnInit {

  constructor() {
  }

  @Output() newItemEvent = new EventEmitter<any[]>();

  cercaActual = [];

  guardaGens() {
    console.log(this.cercaActual);
    this.newItemEvent.emit(this.cercaActual);
    //$('.autocomp_selected ul').empty();
  }

  ngOnInit(): void {

    new Def.Autocompleter.Search('gens',
      'https://clinicaltables.nlm.nih.gov/api/ncbi_genes/v3/search?&df=GeneID,HGNC_ID,Symbol,Synonyms,dbXrefs,chromosome,map_location,description,type_of_gene&ef=GeneID,HGNC_ID,Symbol,Synonyms,dbXrefs,chromosome,map_location,description,type_of_gene&cf=GeneID',
      {
        tableFormat: true,
        valueCols: [1],
        colHeaders: ['GeneID', 'HGNC_ID', 'Symbol', 'Synonyms', 'dbXrefs', 'chromosome', 'map_location', 'description', 'type_of_gene'],
        maxSelect: '*'
      });

    Def.Autocompleter.Event.observeListSelections('gens', () => {
      var gen = $('#gens')[0];
      var autocomp = gen.autocomp;
      var itemData = autocomp.getSelectedItemData();
      if (itemData) {
        var arrayLength = itemData.length;
        let cercaActual = [];
        for (var i = 0; i < arrayLength; i++) {
          console.log(itemData[i].data);
          cercaActual.push(itemData[i].data);
        }
        this.cercaActual = cercaActual;
      }
      console.log(this.cercaActual)
    });

    console.log(Def.Autocompleter)
  }

}
