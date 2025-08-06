import { Component, OnInit } from '@angular/core';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { LoginComponent } from './components/login/login.component';
import { AuthService } from './services/auth.service';
import { User } from '@angular/fire/auth';
import { Subscription, take } from 'rxjs';
import { CommonModule } from '@angular/common';
import { LoaderComponent } from './components/loader/loader.component';

@Component({
  selector: 'app-root',
  imports: [
    LoaderComponent,
    DashboardComponent,
    LoginComponent,
    CommonModule,
],
  templateUrl: './app.component.html',
})

export class AppComponent implements OnInit {
  public user: User | null = null;
  public isLoading = true;
  private sub!: Subscription;

  constructor(
    private authService: AuthService,
  ) { }

  ngOnInit(): void {
    this.sub = this.authService.user$.subscribe(user => {
      this.user = user;
      this.isLoading = false;
    });
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }
}
