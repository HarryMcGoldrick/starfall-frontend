import { Component, Input, OnInit } from '@angular/core';
import { Meteorite } from '../../models/meteorite';

@Component({
  selector: 'app-card-side-bar',
  templateUrl: './card-side-bar.component.html',
  styleUrls: ['./card-side-bar.component.scss']
})
export class CardSideBarComponent implements OnInit {
  @Input() selectedMeteorite: Meteorite;

  constructor() { }

  ngOnInit(): void {
  }

}
