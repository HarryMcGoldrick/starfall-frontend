import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { User } from 'src/app/models/user';
import { LoginService } from '../../services/login-service.service';

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
      Validators.minLength(4)
    ]),
    password: new FormControl('', [
      Validators.required,
    ]),
  });

  constructor(private loginService: LoginService) { }


  ngOnInit(): void {
  }

  onSubmit() {
    // TODO add auth service and send request
    const user = new User();
    const { username, password } = this.loginForm.value;
    this.loginService.login(username, password).subscribe(res => console.log(res));
  }

}
