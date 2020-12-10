import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges, ViewChild } from '@angular/core';
import { GoogleMap, MapInfoWindow, MapMarker } from '@angular/google-maps';
import { Meteorite } from 'src/app/models/meteorite';
import { MeteoriteService } from '../../services/meteorite.service';
import { mapStyle } from './maps-style';

@Component({
  selector: 'app-google-maps',
  templateUrl: './google-maps.component.html',
  styleUrls: ['./google-maps.component.scss']
})
export class GoogleMapsComponent implements OnInit, OnChanges {
  @ViewChild(GoogleMap) googleMaps: google.maps.Map;
  @ViewChild(MapInfoWindow) infoWindow: MapInfoWindow;

  @Input() mapLocation;

  @Output() updateFavourite = new EventEmitter();

  selectedMeteorite: Meteorite;
  meteorites: Meteorite[] = [];

  height: number;
  width: number;
  zoom = 4;
  center: google.maps.LatLngLiteral = { lat: 24, lng: 12 };
  mapTypeStyle: google.maps.MapTypeStyle[] = mapStyle;
  mapOptions: google.maps.MapOptions = { styles: this.mapTypeStyle };
  markerOptions: google.maps.MarkerOptions = { draggable: false };
  infoWindowOptions: google.maps.InfoWindowOptions = { maxWidth: 400 };


  constructor(private meteoriteApi: MeteoriteService) { }

  ngOnInit(): void {
    this.height = window.innerHeight;
    this.width = window.innerWidth;

    // Get the meteorites as json and assign them as meteorite objects
    this.meteoriteApi.getAllMeteorites().subscribe(res => {
      res.forEach(meteorite => {
        const meteoriteRef = new Meteorite();
        Object.assign(meteoriteRef, meteorite);
        this.meteorites.push(meteoriteRef);
      });
    });
  }

  // Opens the google maps info window containing meteorite data
  openInfoWindow(meteorite: Meteorite, marker: MapMarker): void {
    this.selectedMeteorite = meteorite;
    this.infoWindow.open(marker);
  }

  ngOnChanges(changes: SimpleChanges): void {
    // When a location is entered on the search bar, pan to the selected location
    if (this.googleMaps && changes.mapLocation) {
      this.googleMaps.panTo(changes.mapLocation.currentValue);
      this.zoom = 10;
    }
  }

  updateMeteoritesWithFilter(formBody): void {
    // If radius is present then local filtering has been enabled therefore get the current lat lng of the map.
    if (formBody.radius) {
      const currentLocation = this.googleMaps.getCenter()
      formBody.lat = currentLocation.lat();
      formBody.lng = currentLocation.lng();
    }
    const queryString = this.createQueryStringFromObject(formBody)
    this.meteorites = [];
    // Get the meteorites as json that match the selected filters and assign them as meteorite objects
    this.meteoriteApi.getAllMeteoritesFiltered(queryString).subscribe(res => {
      res.forEach(meteorite => {
        const meteoriteRef = new Meteorite();
        Object.assign(meteoriteRef, meteorite);
        this.meteorites.push(meteoriteRef);
      });
    });
  }

  //Creates a query string using the formbody attributes, removes undefined or empty variables and parses them into the correct format
  createQueryStringFromObject(obj) {
    return Object.entries(obj).filter(([key]) => {
      if (obj[key] != '' || obj[key] != undefined) {
        return obj[key]
      }
    }).map(([key, val]) => `${key}=${val}`).join("&");
  }

  passFavouriteToParent(meteoriteId) {
    this.updateFavourite.emit(meteoriteId)
  }
}
