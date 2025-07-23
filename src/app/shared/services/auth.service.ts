import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private isLoggedInStatus = false;

  login(username: string, password: string): boolean {
    // Replace with real login logic
    if (username === 'Tony Stark' && password === 'IamIronman') {
      this.isLoggedInStatus = true;
      return true;
    }
    return false;
  }

  logout(): void {
    this.isLoggedInStatus = false;
  }

  isLoggedIn(): boolean {
    return this.isLoggedInStatus;
  }
}
