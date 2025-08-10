import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
})
export class LoginComponent {
  constructor(public auth: AuthService, private router: Router) { }

  async loginGoogle() {
    await this.auth.loginGoogle();
    this.router.navigate(['/dashboard']);
  }
}
