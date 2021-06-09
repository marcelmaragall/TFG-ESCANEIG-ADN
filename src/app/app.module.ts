import 'reflect-metadata';
import '../polyfills';

import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule  } from '@angular/forms';
import { HttpClientModule, HttpClient, HTTP_INTERCEPTORS } from '@angular/common/http';
import { CoreModule } from './core/core.module';
import { SharedModule } from './shared/shared.module';
import { MaterialModule} from "./material/material.module";

import { AppRoutingModule } from './app-routing.module';

//INTERCEPTORS
import { JwtInterceptor } from "./helpers/jwt.interceptor";
import { ErrorInterceptor } from "./helpers/error.interceptor";

// NG Translate
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';

//import { HomeModule } from './home/home.module';
import { DetailModule } from './detail/detail.module';

import { AppComponent } from './app.component';
import { NavigationComponent } from './components/navigation/navigation.component'

// Components

import { PacientListComponent } from './components/pacient-list/pacient-list.component'
import { PacientDetallComponent } from './components/pacient-detall/pacient-detall.component'
import { AlertComponent } from './components/alert/alert.component'
import { HomeComponent } from "./home/home.component";
import { EditPatologiaComponent, PatologiaListComponent} from './components/patologia-list/patologia-list.component';
import { DiagnosticPacientComponent } from './components/diagnostic-pacient/diagnostic-pacient.component';
import { EscaneigComponent } from './components/escaneig/escaneig.component';


// Services
import { PacientService } from './services/pacient.service';
import { SequenciacioComponent } from './components/sequenciacio/sequenciacio.component';
import { DiagnosticPacientService } from "./services/diagnostic-pacient.service";
import {SequenciacioService} from "./services/sequenciacio.service";
import {EscanerService} from "./services/escaner.service";
import { SequenciacioDetallComponent } from './components/sequenciacio-detall/sequenciacio-detall.component';
import {EditGenComponent, GenListComponent} from './components/gen-list/gen-list.component';
import { PatologiaDetallComponent } from './components/patologia-detall/patologia-detall.component';
import { BuscadorPatologiesComponent } from './components/buscador-patologies/buscador-patologies.component';
import { FileUploadComponent } from "./components/file-upload/file-upload.component";
import { SequenciacioFormComponent } from './components/sequencia-form/sequencia-form.component';
import { EscanerListComponent } from './components/escaner-list/escaner-list.component';
import { NouEscanerComponent } from './components/nou-escaner/nou-escaner.component';
import { GenPatologiaUsuariComponent } from './components/gen-patologia-usuari/gen-patologia-usuari.component';
import { GenListDialogComponent } from './components/gen-list-dialog/gen-list-dialog.component';
import { BuscadorGensComponent } from './components/buscador-gens/buscador-gens.component';
import { PacientFormDialogComponent } from './components/pacient-form-dialog/pacient-form-dialog.component';
import { EscanerDetallComponent } from './components/escaner-detall/escaner-detall.component';
import {EditResultatComponent, ResultatListComponent} from './components/resultat-list/resultat-list.component';


// AoT requires an exported function for factories
export function HttpLoaderFactory(http: HttpClient): TranslateHttpLoader {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

@NgModule({
  declarations: [
    AppComponent,
    NavigationComponent,
    PacientListComponent,
    PacientDetallComponent,
    AlertComponent,
    HomeComponent,
    PatologiaListComponent,
    DiagnosticPacientComponent,
    SequenciacioComponent,
    EscaneigComponent,
    SequenciacioDetallComponent,
    GenListComponent,
    PatologiaDetallComponent,
    BuscadorPatologiesComponent,
    SequenciacioFormComponent,
    EscanerListComponent,
    NouEscanerComponent,
    GenPatologiaUsuariComponent,
    GenListDialogComponent,
    EditPatologiaComponent,
    EditResultatComponent,
    BuscadorGensComponent,
    EditGenComponent,
    PacientFormDialogComponent,
    EscanerDetallComponent,
    ResultatListComponent
    //FileUploadComponent,
    // SequenciaListComponent,
    // SequenciaFormComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    CoreModule,
    SharedModule,
    //HomeModule,
    DetailModule,
    AppRoutingModule,
    MaterialModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    })
  ],
  providers: [PacientService, DiagnosticPacientService,SequenciacioService, EscanerService,
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true }
  ],
  bootstrap: [AppComponent],
  entryComponents:[SequenciacioFormComponent, NouEscanerComponent, EditPatologiaComponent, EditGenComponent, PacientFormDialogComponent, EditResultatComponent]
})
export class AppModule {}
