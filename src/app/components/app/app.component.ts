import { Component, OnInit } from '@angular/core';
import { Meteorite } from 'src/app/models/meteorites';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'starfall';
  selectedMeteorite: Meteorite;
  constructor() { }

  ngOnInit(): void {
  }

  updateCurrentMarker(marker: Meteorite): void {
    this.selectedMeteorite = marker;
  }
}
