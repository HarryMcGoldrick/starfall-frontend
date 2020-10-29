import { Component, OnInit } from '@angular/core';
import { map } from 'rxjs/operators';
import { Meteorite } from 'src/app/models/meteorites';
import { MeteoriteService } from '../../services/meteorite-service.service';
import { mapStyle } from './maps-style';

@Component({
  selector: 'app-google-maps',
  templateUrl: './google-maps.component.html',
  styleUrls: ['./google-maps.component.scss']
})
export class GoogleMapsComponent implements OnInit {
  height: number;
  width: number;
  center: google.maps.LatLngLiteral = {lat: 24, lng: 12};
  zoom = 4;
  mapTypeStyle: google.maps.MapTypeStyle[] = mapStyle;
  mapOptions: google.maps.MapOptions = {styles: this.mapTypeStyle};
  // markerIcon: google.maps.Icon = {
  //   url: 'assets/meteorite-maps-marker.png',
  //   scaledSize: new google.maps.Size(32, 32)

  // };
  markerOptions: google.maps.MarkerOptions = {draggable: false};
  markerPositions: google.maps.LatLng[] = [];

  constructor(private meteoriteApi: MeteoriteService) { }

  ngOnInit(): void {
    this.height = window.innerHeight;
    this.width = window.innerWidth;
    this.meteoriteApi.getAllMeteorites().subscribe(res => {
      res.forEach(meteorite => {
        const meteoriteRef = new Meteorite();
        Object.assign(meteoriteRef, meteorite);
        this.markerPositions.push(meteoriteRef.getLatLang(meteoriteRef.GeoLocation));
      });
    });
  }

  addMarker(event: google.maps.MouseEvent): void {
    this.markerPositions.push(event.latLng);
  }

}
