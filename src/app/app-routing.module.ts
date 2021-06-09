import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PageNotFoundComponent } from './shared/components';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule  } from '@angular/forms';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from "@angular/material/core";
import { MatGridListModule} from "@angular/material/grid-list";
import  {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import { BrowserModule } from '@angular/platform-browser';


//import { HomeRoutingModule } from './home/home-routing.module';
import { DetailRoutingModule } from './detail/detail-routing.module';
import {UsersRoutingModule} from './users/users-routing.module'

import { PacientListComponent } from './components/pacient-list/pacient-list.component'
import { PacientDetallComponent } from './components/pacient-detall/pacient-detall.component'

import { AuthGuard } from './helpers/auth.guard';
import {HomeComponent} from "./home/home.component";
import {SequenciacioDetallComponent} from "./components/sequenciacio-detall/sequenciacio-detall.component";
import {PatologiaListComponent} from "./components/patologia-list/patologia-list.component";
import {GenListComponent} from "./components/gen-list/gen-list.component";
import {PatologiaDetallComponent} from "./components/patologia-detall/patologia-detall.component";
import {SequenciacioFormComponent} from "./components/sequencia-form/sequencia-form.component";
import {FileUploadComponent} from "./components/file-upload/file-upload.component";
import {EscanerDetallComponent} from "./components/escaner-detall/escaner-detall.component";



const accountModule = () => import('./account/account.module').then(x => x.AccountModule);
const usersModule = () => import('./users/users.module').then(x => x.UsersModule);


const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    canActivate: [AuthGuard]
  },
  //quan entrem a /users/blablabala, tota la ruta que ve despres de /users/ esta definida al modul userModule
  {
    path:'users',
    loadChildren: usersModule,
    canActivate: [AuthGuard]
  },
  {
    path:'account',
    loadChildren: accountModule,
  },
  {
    path: 'pacients',
    component: PacientListComponent
  },
  {
    path: 'pacients/:id',
    component: PacientDetallComponent
  },
  {
    path: 'sequenciacions/:id',
    component: SequenciacioDetallComponent
  },
  {
    path: 'sequencia/:id',
    component: SequenciacioFormComponent
  },
  {
    path: 'sequencia',
    component: SequenciacioFormComponent
  },
  {
    path: 'gens',
    component: GenListComponent
  },
  {
    path: 'patologies',
    component: PatologiaListComponent
  },
  {
    path: 'patologies/:id',
    component: PatologiaDetallComponent
  },
  {
    path: 'escaners/:id',
    component: EscanerDetallComponent
  },
  {
    path: '**',
    component: PageNotFoundComponent
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes),
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatNativeDateModule,
    MatDatepickerModule,
    MatGridListModule,
    MatFormFieldModule,
    MatInputModule,
    BrowserAnimationsModule,
    //UsersRoutingModule
    //HomeRoutingModule,
    //DetailRoutingModule
  ],
  exports: [
    RouterModule,
  ],
  declarations: [
    // SequenciaFormComponent,
    FileUploadComponent
  ],
  providers: [
    MatDatepickerModule
  ]

})
export class AppRoutingModule { }
