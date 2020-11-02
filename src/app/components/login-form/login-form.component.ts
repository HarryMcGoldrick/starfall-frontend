import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.scss']
})
export class LoginFormComponent implements OnInit {
  // TODO better validation
  loginForm = new FormGroup({
    username: new FormControl('', [
      Validators.required,
      Validators.minLength(5)
    ]),
    password: new FormControl('', [
      Validators.required,
    ]),
  });

  constructor() { }

  ngOnInit(): void {
  }

  onSubmit() {
    // TODO add auth service and send request
  }

}
