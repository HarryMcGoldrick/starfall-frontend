import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Meteorite } from '../../models/meteorite';

@Component({
  selector: 'app-card-side-bar',
  templateUrl: './card-side-bar.component.html',
  styleUrls: ['./card-side-bar.component.scss']
})
export class CardSideBarComponent implements OnInit {
  @Input() selectedMeteorite: Meteorite;
  @Output() updateFavourite = new EventEmitter<string>();

  constructor() { }

  ngOnInit(): void {
  }

  emitFavourite(meteoriteId: string): void {
    this.selectedMeteorite.favourite = !this.selectedMeteorite.favourite;
    this.updateFavourite.emit(meteoriteId);
  }
}
