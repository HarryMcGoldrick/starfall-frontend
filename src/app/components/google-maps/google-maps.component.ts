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

  // TODO markerIcon: google.maps.Icon = { add nicer marker
  //   url: 'assets/meteorite-maps-marker.png',
  //   scaledSize: new google.maps.Size(32, 32)
  // };

  constructor(private meteoriteApi: MeteoriteService) { }

  ngOnInit(): void {
    this.height = window.innerHeight;
    this.width = window.innerWidth;
    this.meteoriteApi.getAllMeteorites().subscribe(res => {
      res.forEach(meteorite => {
        const meteoriteRef = new Meteorite();
        Object.assign(meteoriteRef, meteorite);
        this.meteorites.push(meteoriteRef);
      });
    });
  }

  openInfoWindow(meteorite: Meteorite, marker: MapMarker): void {
    this.selectedMeteorite = meteorite;
    this.infoWindow.open(marker);
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (this.googleMaps && changes.mapLocation) {
      // this.center = changes.mapLocation.currentValue;
      this.googleMaps.panTo(changes.mapLocation.currentValue);
      this.zoom = 10;
    }
  }
}
