import {Component, Input, OnChanges, OnInit, ViewChild} from '@angular/core';
import {EscanerService} from "../../services/escaner.service";
import {Observable} from "rxjs";
import {Escaner} from "../../models/Escaner";
import {MatTableDataSource} from "@angular/material/table";
import {MatSort} from "@angular/material/sort";

@Component({
  selector: 'app-escaner-list',
  templateUrl: './escaner-list.component.html',
  styleUrls: ['./escaner-list.component.css']
})
export class EscanerListComponent implements OnInit, OnChanges {

  constructor(private escanerService: EscanerService) { }

  @Input() pacient_id: number;
  listData: MatTableDataSource<any>;
  displayedColumns: string[] = ['codi_scan', 'data', 'seq', 'actions'];
  @ViewChild(MatSort) sort: MatSort;

  getScansByPacient(id:number): Observable<Escaner[]> {

    // @ts-ignore
    return this.escanerService.getScansByPacient<Escaner[]>(id).subscribe(
      llista => {
        console.log(llista);
        //this.escanerService.scans = s;
        this.listData = new MatTableDataSource(llista);
        this.listData.sort = this.sort;

      },
      err => console.error(err)
    )
  }

  ngOnInit(): void {
    if (this.pacient_id) {
      this.getScansByPacient(this.pacient_id);
    }
  }

  ngOnChanges(): void {
    if (this.pacient_id) {
      console.log("biaaatch");
      this.getScansByPacient(this.pacient_id);
    }
  }

}
