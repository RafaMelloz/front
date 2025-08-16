import { Component, OnInit } from '@angular/core';
import { ToasterComponent } from './libs/toastr/components/toaster/toaster.component';
import { AuthService } from './services/auth.service';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  imports: [
    RouterOutlet,
    ToasterComponent
],
  templateUrl: './app.component.html',
})

export class AppComponent {
  constructor(
    public authService: AuthService,
  ) { }
}
