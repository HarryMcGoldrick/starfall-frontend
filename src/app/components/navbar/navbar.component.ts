import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user';
import { UserService } from 'src/app/services/user.service';

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
  constructor(public userService: UserService, private router: Router) { }

  ngOnInit(): void {
    if (window.location.href === 'http://localhost:4200/') {
      this.isMapPage = true;
    }
    this.userService.currentUser.subscribe(currentUser => {
      this.user = currentUser;
    });
  }

  triggerSearch(): void {
    this.enableSearchBar = !this.enableSearchBar;
  }

  triggerFilterBar(): void {
    this.enableFilterDrawer.emit()
  }

  handleAddressChange($event): void {
    const location = { lat: $event.geometry.location.lat(), lng: $event.geometry.location.lng() };
    this.searchLocation.emit(location);
  }

  logout() {
    this.userService.removeCurrentUser();
    this.router.navigateByUrl('/')
    location.reload();
  }
}
