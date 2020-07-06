import {Component, HostBinding, OnInit} from '@angular/core';
import {PacientService} from "../../services/pacient.service";
import {Pacient} from "../../models/Pacient";
import { FormGroup, FormControl, Validators } from '@angular/forms'
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-pacient-form',
  templateUrl: './pacient-form.component.html',
  styleUrls: ['./pacient-form.component.css']
})
export class PacientFormComponent implements OnInit {

  //El que aixo permet es que el component, per defecte, inclogui la classe row en l'element del DOM mes extern del component.
  @HostBinding('class') classes = 'row';

  pacient: any = {
    nom: '',
    cognoms: '',
    dni: '',
    ce: '',
    telefon: '',
    pais: '',
    ciutat: '',
    address: '',
    usuari: 1
  };

  nouPacient = new FormGroup({
    nom: new FormControl('', [Validators.required, Validators.maxLength(20)]),
    cognoms: new FormControl('',Validators.required),
    dni: new FormControl('',Validators.required),
    ce: new FormControl('',Validators.required),
    telefon: new FormControl(''),
    pais: new FormControl('',Validators.required),
    ciutat: new FormControl(''),
    address: new FormControl(''),
  });

  constructor(private pacientService: PacientService, private router: Router, private activatedRoute: ActivatedRoute) { }

  // en aquest mètode mirem en primer lloc si la url conté parametres. Si es el cas, llavors es que estem entrant en mode "edit", i hem de carregar la info del pacient i posar el boolea edit = true per tal de cridar el metode Update del service
  ngOnInit(): void {
    const params = this.activatedRoute.snapshot.params;
    if (params.id){
      this.pacientService.getPacient(params.id)
        .subscribe(
          res => {
            console.log(res);
            this.pacient = res;
            this.edit = true;
          },
          err => {
            console.log(err)
          }
        )
    }
  }

  edit: boolean = false;

  saveNewPacient() {

    this.pacientService.savePacient(this.pacient)
      .subscribe(
        res => {
          console.log(res);
          this.router.navigate(['/pacients']);
        },
        err => console.log(err)
      );
    console.log(this.pacient);
  }

  updatePacient() {
    delete this.pacient.created_at;
    this.pacientService.updatePacient(this.pacient.id, this.pacient)
      .subscribe(
        res => {
          this.router.navigate(['/pacients']);
        },
        err => {
          console.log(err)
        }
      )
  }

}
