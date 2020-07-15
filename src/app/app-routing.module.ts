import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PageNotFoundComponent } from './shared/components';

//import { HomeRoutingModule } from './home/home-routing.module';
import { DetailRoutingModule } from './detail/detail-routing.module';
import {UsersRoutingModule} from './users/users-routing.module'

import { PacientListComponent } from './components/pacient-list/pacient-list.component'
import { PacientFormComponent } from './components/pacient-form/pacient-form.component'
import { PacientDetallComponent } from './components/pacient-detall/pacient-detall.component'

import { AuthGuard } from './helpers/auth.guard';
import {HomeComponent} from "./home/home.component";
import {SequenciacioDetallComponent} from "./components/sequenciacio-detall/sequenciacio-detall.component";
import {PatologiaListComponent} from "./components/patologia-list/patologia-list.component";


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
    path: 'pacients/add',
    component: PacientFormComponent
  },
  {
    path: 'pacients/edit/:id',
    component: PacientFormComponent
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
    path: 'gens',
    component: PacientListComponent
  },
  {
    path: 'patologies',
    component: PatologiaListComponent
  },
  {
    path: '**',
    component: PageNotFoundComponent
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes),
    //UsersRoutingModule
    //HomeRoutingModule,
    //DetailRoutingModule
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
