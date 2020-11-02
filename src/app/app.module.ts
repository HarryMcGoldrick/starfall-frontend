import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { GoogleMapsModule } from '@angular/google-maps';
import { FlexLayoutModule } from '@angular/flex-layout';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input/';
import { MatButtonModule } from '@angular/material/button';
import { ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './pages/app/app.component';
import { GoogleMapsComponent } from './components/google-maps/google-maps.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { CardSideBarComponent } from './components/card-side-bar/card-side-bar.component';
import { RegistrationComponent } from './components/registration/registration.component';
import { MapPageComponent } from './pages/map-page/map-page.component';
import { LoginPageComponent } from './pages/login-page/login-page.component';
import { LoginFormComponent } from './components/login-form/login-form.component';
import { BasicAuthInterceptor } from './interceptors/basicAuthInterceptor';


@NgModule({
  declarations: [
    AppComponent,
    GoogleMapsComponent,
    NavbarComponent,
    CardSideBarComponent,
    RegistrationComponent,
    MapPageComponent,
    LoginPageComponent,
    LoginFormComponent
    ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    GoogleMapsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatSidenavModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    FlexLayoutModule,
    MatButtonModule,
    ReactiveFormsModule
  ],
  providers: [{ provide: HTTP_INTERCEPTORS, useClass: BasicAuthInterceptor, multi: true } ],
  bootstrap: [AppComponent]
})
export class AppModule { }
