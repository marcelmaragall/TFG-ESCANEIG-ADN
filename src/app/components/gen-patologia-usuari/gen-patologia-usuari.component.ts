import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {GenPatologiaUsuariService} from "../../services/gen-patologia-usuari.service";
import {Gen} from "../../models/Gen";
import {GenService} from "../../services/gen.service";
import {Observable} from "rxjs";
import {MatDialog, MatDialogConfig} from "@angular/material/dialog";
import {NouEscanerComponent} from "../nou-escaner/nou-escaner.component";
import {GenListComponent} from "../gen-list/gen-list.component";
import {GenListDialogComponent} from "../gen-list-dialog/gen-list-dialog.component";
import {AccountService} from "../../services/account.service";

@Component({
  selector: 'app-gen-patologia-usuari',
  templateUrl: './gen-patologia-usuari.component.html',
  styleUrls: ['./gen-patologia-usuari.component.css']
})
export class GenPatologiaUsuariComponent implements OnInit, OnDestroy {

  constructor(private genPatUService: GenPatologiaUsuariService, private genService: GenService, private dialog: MatDialog, private accountService: AccountService) { }

  @Input() usuari_id: number;
  @Input() patologia_id: number;

  // @ts-ignore
  getGens(usuari_id: number, patologia_id: number): Observable<Gen[]> {
    // @ts-ignore
    this.genPatUService.getGensByPatologiaAndUser<Gen[]>(usuari_id, patologia_id).subscribe(
      gens => {
        console.log("walter");
        console.log(gens);
        for (let i=0; i < gens.length; i++) {
          // @ts-ignore
          this.genService.getGen<Gen[]>(gens[i].gen_id).subscribe(
            gen => {
              let g = {
                'official_symbol': gen.simbol,
                'locus': gen.locus,
                'mimID': gen.mimID,
                'comentaris': gens[i].comentaris,
                'id': gen.id
              };
              this.genPatUService.gensAssociats.push(g);
            }
          );
          console.log(i);
        }
        console.log("bamos a repassar")
        console.log(this.genPatUService.gensAssociats)
      },
      err => {}
    )
  }

  openGenDialog(){
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = false;
    dialogConfig.autoFocus = true;
    dialogConfig.width = "44%";
    let gens = this.accountService.getGensUser(this.usuari_id).subscribe(
      gens => {
        //gens.map(obj=>({}))
        // @ts-ignore
        for(const element of gens) {
          element.selected = false;
        }
        dialogConfig.data = {
          patologia_id: this.patologia_id,
          usuari_id: this.usuari_id,
          gens: gens
        };
        const dialogRef = this.dialog.open(GenListDialogComponent, dialogConfig);
      },
      err => console.error(err)
    );
  }

  ngOnInit(): void {
    this.getGens(this.usuari_id, this.patologia_id);
  }

  ngOnDestroy(): void {
    this.genPatUService.gensAssociats = [];
  }

}
