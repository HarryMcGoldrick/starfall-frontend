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
import { MatIconModule } from '@angular/material/icon';
import { GooglePlaceModule } from 'ngx-google-places-autocomplete';
import { MatSliderModule } from '@angular/material/slider';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './pages/app/app.component';
import { GoogleMapsComponent } from './components/google-maps/google-maps.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { CardInfoWindowComponent } from './components/card-info-window/card-info-window.component';
import { RegistrationComponent } from './components/registration/registration.component';
import { MapPageComponent } from './pages/map-page/map-page.component';
import { LoginPageComponent } from './pages/login-page/login-page.component';
import { LoginFormComponent } from './components/login-form/login-form.component';
import { BasicAuthInterceptor } from './interceptors/basicAuthInterceptor';
import { UserPageComponent } from './pages/user-page/user-page.component';
import { CardFavouriteComponent } from './components/card-favourite/card-favourite.component';


@NgModule({
  declarations: [
    AppComponent,
    GoogleMapsComponent,
    NavbarComponent,
    CardInfoWindowComponent,
    RegistrationComponent,
    MapPageComponent,
    LoginPageComponent,
    LoginFormComponent,
    UserPageComponent,
    CardFavouriteComponent
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
    ReactiveFormsModule,
    MatIconModule,
    GooglePlaceModule,
    MatSliderModule
  ],
  providers: [{ provide: HTTP_INTERCEPTORS, useClass: BasicAuthInterceptor, multi: true }],
  bootstrap: [AppComponent]
})
export class AppModule { }
