import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { GoogleMapsModule } from '@angular/google-maps';
import { FlexLayoutModule } from '@angular/flex-layout';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { GooglePlaceModule } from 'ngx-google-places-autocomplete';
import { AppRoutingModule } from './app-routing.module';
import { ReactiveFormsModule } from '@angular/forms';

/* Material Imports */
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input/';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSliderModule } from '@angular/material/slider';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatMomentDateModule, MAT_MOMENT_DATE_ADAPTER_OPTIONS } from '@angular/material-moment-adapter'
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatMenuModule } from '@angular/material/menu';
import { MatDialogModule } from '@angular/material/dialog';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

/* User Imports */
import { AppComponent } from './pages/app/app.component';
import { GoogleMapsComponent } from './components/google-maps/google-maps.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { CardInfoWindowComponent } from './components/card-info-window/card-info-window.component';
import { RegistrationComponent } from './components/registration/registration.component';
import { MapPageComponent } from './pages/map-page/map-page.component';
import { LoginPageComponent } from './pages/login-page/login-page.component';
import { LoginFormComponent } from './components/login-form/login-form.component';
import { BasicAuthInterceptor } from './interceptors/basicAuthInterceptor';
import { CardFavouriteComponent } from './components/card-favourite/card-favourite.component';
import { MapFilterComponent } from './components/map-filter/map-filter.component';
import { DataTableComponent } from './components/data-table/data-table.component';
import { UserFavouritesComponent } from './components/user-favourites/user-favourites.component';
import { RegistrationPageComponent } from './pages/registration-page/registration-page.component';


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
    UserFavouritesComponent,
    CardFavouriteComponent,
    MapFilterComponent,
    DataTableComponent,
    RegistrationPageComponent,
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
    MatSliderModule,
    MatSelectModule,
    MatDatepickerModule,
    MatMomentDateModule,
    MatSlideToggleModule,
    MatAutocompleteModule,
    MatMenuModule,
    MatDialogModule,
    MatTableModule,
    MatPaginatorModule,
    MatProgressSpinnerModule
  ],
  // Enable use of the auth interceptor and standardise the moment date format to UTC
  providers: [{ provide: HTTP_INTERCEPTORS, useClass: BasicAuthInterceptor, multi: true }, { provide: MAT_MOMENT_DATE_ADAPTER_OPTIONS, useValue: { useUtc: true } }],
  bootstrap: [AppComponent]
})
export class AppModule { }
