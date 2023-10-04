import { Injectable } from '@angular/core';
import { of } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  isLogin = false;
  rolesAs: string[];

  constructor() { }

  login(values: string[]) {
    this.isLogin = true;
    this.rolesAs = values;
    localStorage.setItem('STATE', 'true');
    for(let i = 0; i < values.length-1; i++){
      localStorage.setItem('ROLE'+i, values[i]);
    }
    return of({ success: this.isLogin, role: this.rolesAs });
  }

  logout() {
    this.isLogin = false;
    localStorage.setItem('STATE', 'false');
    localStorage.clear();
    return of({ success: this.isLogin, role: '' });
  }

  isLoggedIn() {
    const loggedIn = localStorage.getItem('STATE');
    if (loggedIn == 'true')
      this.isLogin = true;
    else
      this.isLogin = false;
    return this.isLogin;
  }

  getRole() {
    if(this.rolesAs == null){
      return null;
    }
    for(let i = 0; i < 3; i++){
      this.rolesAs[i] = localStorage.getItem('ROLE' + i);
    }
    
    return this.rolesAs;
  }
}