import { Component } from '@angular/core';
import { AuthService } from '../../shared/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  username = '';
  password = '';
  loginFailed = false;

  constructor(private authService: AuthService, private router: Router) { }

  onLogin() {
    const success = this.authService.login(this.username, this.password);
    if (success) {
      this.router.navigate(['/dashboard']);
    } else {
      this.loginFailed = true;
    }
  }
}
