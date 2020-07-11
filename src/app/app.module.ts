import 'reflect-metadata';
import '../polyfills';

import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule  } from '@angular/forms';
import { HttpClientModule, HttpClient, HTTP_INTERCEPTORS } from '@angular/common/http';
import { CoreModule } from './core/core.module';
import { SharedModule } from './shared/shared.module';

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
import { PacientFormComponent } from './components/pacient-form/pacient-form.component'
import { PacientDetallComponent } from './components/pacient-detall/pacient-detall.component'
import { AlertComponent } from './components/alert/alert.component'
import {HomeComponent} from "./home/home.component";
import { PatologiaListComponent } from './components/patologia-list/patologia-list.component';
import { DiagnosticPacientComponent } from './components/diagnostic-pacient/diagnostic-pacient.component';


// Services
import { PacientService } from './services/pacient.service';


// AoT requires an exported function for factories
export function HttpLoaderFactory(http: HttpClient): TranslateHttpLoader {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

@NgModule({
  declarations: [
    AppComponent,
    NavigationComponent,
    PacientListComponent,
    PacientFormComponent,
    PacientDetallComponent,
    AlertComponent,
    HomeComponent,
    PatologiaListComponent,
    DiagnosticPacientComponent,
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
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    })
  ],
  providers: [PacientService,
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
