import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Meteorite } from '../../models/meteorite';

@Component({
  selector: 'app-card-info-window',
  templateUrl: './card-info-window.component.html',
  styleUrls: ['./card-info-window.component.scss']
})
export class CardInfoWindowComponent implements OnInit {
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
