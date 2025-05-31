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
  public user: User | null = null;
  private sub!: Subscription;

  constructor(
    public auth: AuthService
  ) { }

  ngOnInit(): void {
    this.sub = this.auth.user$.subscribe(user => {
      this.user = user;
    });    
  }

  loginGoogle() {
    this.auth.loginGoogle();
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }
}
