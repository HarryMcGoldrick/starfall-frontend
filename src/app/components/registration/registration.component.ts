import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent implements OnInit {
  isError: boolean = false;
  registerForm = new FormGroup({
    username: new FormControl('', [
      Validators.required,
      Validators.minLength(4)
    ]),
    password: new FormControl('', [
      Validators.required,
    ]),
  });

  constructor(private loginService: LoginService, private router: Router) { }

  ngOnInit(): void {
  }

  onSubmit() {
    const { username, password } = this.registerForm.value
    this.loginService.register(username, password).subscribe(res => {
      this.router.navigateByUrl("/login").then(() => location.reload());
    },
      error => {
        console.log(error);
        this.isError = true;
      })
  }
}
