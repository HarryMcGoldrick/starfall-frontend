import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user';
import { UserService } from 'src/app/services/user.service';
import { DataTableComponent } from '../data-table/data-table.component';
import { UserFavouritesComponent } from '../user-favourites/user-favourites.component';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  @Output() searchLocation = new EventEmitter<any>();
  @Output() enableFilterDrawer = new EventEmitter<void>();

  isMapPage = false;
  enableSearchBar = false;
  user: User;
  constructor(public userService: UserService, private router: Router, public dialog: MatDialog) { }

  ngOnInit(): void {
    // Prevents the navbar icon buttons being shown if not on the correct page
    if (window.location.href === 'http://localhost:4200/') {
      this.isMapPage = true;
    }
    this.userService.currentUser.subscribe(currentUser => {
      this.user = currentUser;
    });
  }

  triggerTableView() {
    this.dialog.open(DataTableComponent);
  }

  triggerFavouriteView() {
    this.dialog.open(UserFavouritesComponent);
  }

  triggerSearch(): void {
    this.enableSearchBar = !this.enableSearchBar;
  }

  triggerFilterBar(): void {
    this.enableFilterDrawer.emit()
  }

  // Send location to map page when user enters a location
  handleAddressChange($event): void {
    const location = { lat: $event.geometry.location.lat(), lng: $event.geometry.location.lng() };
    this.searchLocation.emit(location);
  }

  // Clears the local storage of user data and navigates to map page
  logout() {
    this.userService.removeCurrentUser();
    // Reload is necessary as navbar won't update automatically
    this.router.navigateByUrl('/').then(() => location.reload())
  }
}
