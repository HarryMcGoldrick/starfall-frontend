import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  user: User;
  constructor(public userService: UserService) { }

  ngOnInit(): void {
    this.userService.currentUser.subscribe(currentUser => {
      this.user = currentUser;
    });
  }
}
