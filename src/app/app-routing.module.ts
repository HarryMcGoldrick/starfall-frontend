import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from './guards/auth.guard';
import { LoginPageComponent } from './pages/login-page/login-page.component';
import { MapPageComponent } from './pages/map-page/map-page.component';
import { RegistrationPageComponent } from './pages/registration-page/registration-page.component';

const routes: Routes = [
  { path: '', component: MapPageComponent },
  { path: 'login', component: LoginPageComponent, canActivate: [AuthGuard] },
  { path: 'register', component: RegistrationPageComponent, canActivate: [AuthGuard] },
  { path: '**', component: MapPageComponent } // Redirects to main page on 404
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
