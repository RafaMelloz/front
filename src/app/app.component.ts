import { Component, OnInit } from '@angular/core';
import { LoginComponent } from './pages/login/login.component';
import { AuthService } from './services/auth.service';
import { User } from '@angular/fire/auth';
import { Subscription, take } from 'rxjs';
import { CommonModule } from '@angular/common';
import { LoaderComponent } from './components/loader/loader.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';

@Component({
  selector: 'app-root',
  imports: [
    // LoaderComponent,
    DashboardComponent,
    LoginComponent,
    CommonModule,
],
  templateUrl: './app.component.html',
})

export class AppComponent {
  constructor(
    public authService: AuthService,
  ) { }
}
