import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { GoogleMapsComponent } from 'src/app/components/google-maps/google-maps.component';
import { Meteorite } from 'src/app/models/meteorite';
import { MeteoriteService } from 'src/app/services/meteorite.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-map-page',
  templateUrl: './map-page.component.html',
  styleUrls: ['./map-page.component.scss'],
})
export class MapPageComponent implements OnInit {
  title = 'starfall';
  selectedMeteorite: Meteorite;
  opened = false;
  favourites: string[] = [];
  mapLocation = {};

  addressForm = new FormGroup({
    address: new FormControl('', [
      Validators.required,
    ]),
  });

  constructor(private userService: UserService, private meteoriteService: MeteoriteService) { }

  ngOnInit(): void {
    if (this.userService.hasCurrentUser()) {
      this.meteoriteService.getFavourites(this.userService.currentUserValue.username).subscribe(res => {
        this.favourites = res;
      });
    }
  }

  updateCurrentMarker(marker: Meteorite): void {
    this.opened = true;
    this.selectedMeteorite = marker;
    if (this.favourites.length > 0) {
      if (this.favourites.includes(this.selectedMeteorite._id)) {
        this.selectedMeteorite.favourite = true;
      } else {
        this.selectedMeteorite.favourite = false;
      }
    }
  }

  updateFavourite(meteoriteId: string): void {
    this.favourites.push(meteoriteId);
    this.meteoriteService.updateFavourite(meteoriteId);
  }

  handleAddressChange($event): void {
    this.mapLocation = $event;
  }

  triggerFilterDrawer(): void {
    this.opened = !this.opened;
  }
}
