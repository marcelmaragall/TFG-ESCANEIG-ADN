import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PageNotFoundComponent } from './shared/components';

import { HomeRoutingModule } from './home/home-routing.module';
import { DetailRoutingModule } from './detail/detail-routing.module';

import { PacientListComponent } from './components/pacient-list/pacient-list.component'
import { PacientFormComponent } from './components/pacient-form/pacient-form.component'
import { PacientDetallComponent } from './components/pacient-detall/pacient-detall.component'


const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
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
    path: 'gens',
    component: PacientListComponent
  },
  {
    path: 'patologies',
    component: PacientListComponent
  },
  {
    path: '**',
    component: PageNotFoundComponent
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes),
    HomeRoutingModule,
    DetailRoutingModule
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
