import { Component, OnInit } from '@angular/core';
import { Meteorite } from 'src/app/models/meteorite';

@Component({
  selector: 'app-map-page',
  templateUrl: './map-page.component.html',
  styleUrls: ['./map-page.component.scss']
})
export class MapPageComponent implements OnInit {
  title = 'starfall';
  selectedMeteorite: Meteorite;
  opened = true;
  constructor() { }

  ngOnInit(): void { }

  updateCurrentMarker(marker: Meteorite): void {
    this.selectedMeteorite = marker;
  }

}
