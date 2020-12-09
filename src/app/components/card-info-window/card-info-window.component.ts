import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { Meteorite } from '../../models/meteorite';

@Component({
  selector: 'app-card-info-window',
  templateUrl: './card-info-window.component.html',
  styleUrls: ['./card-info-window.component.scss']
})
export class CardInfoWindowComponent implements OnInit {
  isUserLoggedIn = false;
  @Input() selectedMeteorite: Meteorite;
  @Output() updateFavourite = new EventEmitter<string>();

  constructor(private userService: UserService) { }

  ngOnInit(): void {
    this.isUserLoggedIn = this.userService.hasCurrentUser()
  }

  emitFavourite(meteoriteId: string): void {
    this.selectedMeteorite.favourite = !this.selectedMeteorite.favourite;
    this.updateFavourite.emit(meteoriteId);
  }
}
