import { Component, Input, OnInit } from '@angular/core';
import { Meteorite } from 'src/app/models/meteorite';

@Component({
  selector: 'app-card-favourite',
  templateUrl: './card-favourite.component.html',
  styleUrls: ['./card-favourite.component.scss']
})
export class CardFavouriteComponent implements OnInit {
  @Input() FavouriteMeteorite: Meteorite;

  constructor() { }

  ngOnInit(): void {
  }

}
