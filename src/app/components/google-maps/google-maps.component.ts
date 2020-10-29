import { Component, OnInit } from '@angular/core';

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
  markerOptions: google.maps.MarkerOptions = {draggable: false};
  markerPositions: google.maps.LatLngLiteral[] = [];

  constructor() { }

  ngOnInit(): void {
    this.height = window.innerHeight;
    this.width = window.innerWidth;
  }

  addMarker(event: google.maps.MouseEvent): void {
    this.markerPositions.push(event.latLng.toJSON());
  }

}
