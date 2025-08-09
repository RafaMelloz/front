import { Component } from '@angular/core';
import { User } from '@angular/fire/auth';
import { AuthService } from '../../services/auth.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-login',
  imports: [],
  templateUrl: './login.component.html',
})

export class LoginComponent {

  constructor(
    public auth: AuthService
  ) { }

  loginGoogle() {
    this.auth.loginGoogle();
  }

  ngOnDestroy(): void {
  }
}
