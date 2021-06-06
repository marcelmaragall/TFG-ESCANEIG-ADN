import {Component, Inject, OnInit, ViewChild} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {Sequenciacio} from "../../models/Sequenciaci";
import {Gen} from "../../models/Gen";
import {FormControl} from "@angular/forms";
import {Observable} from "rxjs";
import {startWith, map} from "rxjs/operators";
import {GenPatologiaUsuariService} from "../../services/gen-patologia-usuari.service";
//todo: https://stackblitz.com/edit/angular-sx79hu?embed=1&file=app/multiselect-autocomplete-example.html   <---- D'on m'he inspirat

@Component({
  selector: 'app-gen-list-dialog',
  templateUrl: './gen-list-dialog.component.html',
  styleUrls: ['./gen-list-dialog.component.css']
})
export class GenListDialogComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public data: {gens: Gen[], usuari_id: number, patologia_id: number}, private associacionsService: GenPatologiaUsuariService, private dialogRef: MatDialogRef<GenListDialogComponent>)
  {}

  genControl = new FormControl();
  filteredGens: Observable<Gen[]>;
  lastFilter: string = '';
  selectedGens: Gen[] = new Array<Gen>();

  gens_ids: number[];

  onSelectionGen(e){
    this.gens_ids = e.option.selectionList._value;
  }

  ngOnInit(): void {
    this.filteredGens = this.genControl.valueChanges.pipe(
      startWith<string | Gen[]>(''),
      map(value => typeof value === 'string' ? value : this.lastFilter),
      map(filter => this.filter(filter))
    );
  }


  filter(filter: string): Gen[] {
    this.lastFilter = filter;
    if (filter) {
      return this.data.gens.filter(option => {
        return option.simbol.toLowerCase().indexOf(filter.toLowerCase()) >= 0
       //   || option.lastname.toLowerCase().indexOf(filter.toLowerCase()) >= 0; nous filtres en funcio del camp de l'objecte
      })
    } else {
      return this.data.gens.slice();
    }
  }

  displayFn(value: Gen[] | string): string | undefined {
    let displayValue: string;
    if (Array.isArray(value)) {
      displayValue = value[value.length - 1].simbol;
      return displayValue;
    }
  }

  optionClicked(event: Event, gen: Gen) {
    event.stopPropagation();
    this.toggleSelection(gen);
  }

  toggleSelection(gen: any) {
    gen.selected = !gen.selected;
    if (gen.selected) {
      this.selectedGens.push(gen);
    } else {
      const i = this.selectedGens.findIndex(value => value.simbol === gen.simbol);
      //const i = this.selectedGens.findIndex(value => value.simbol === gen.simbol && value.lastname === user.lastname);
      this.selectedGens.splice(i, 1);
    }

    this.genControl.setValue(this.selectedGens);
  }


  associaGens(){
    if (this.selectedGens){
      for (const g of this.selectedGens){
        let associacio = {
          gen_id: g['gen_id'],
          patologia_id: this.data.patologia_id,
          user_id: this.data.usuari_id,
          simbol: g['simbol']
        };

        this.associacionsService.saveGenByPatologiaAndUser(associacio).subscribe(
          res =>{
            if (res['text'] != 'existeix') {
              let g_associat = {
                'official_symbol': g.simbol,
                'locus': g.locus,
                'mimID': g.mimID,
                'comentaris': '',
                'id': g.id
              };
              this.associacionsService.gensAssociats.push(g_associat);
            }
          },
          err => {
            console.error(err)
          }
        )
      }
      this.dialogRef.close()
    }
  }




}
