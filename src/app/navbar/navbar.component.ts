import { Router } from '@angular/router';
import { AuthService } from './../auth-service.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit  {
    admin:boolean = false;
    user:boolean = false;
    accountant:boolean = false;
    roles:string[10];
    constructor(private authService:AuthService, private router:Router){
    }
  ngOnInit(): void {
    for(let i = 0; i < 3; i++){
      let temp = localStorage.getItem("ROLE"+i);
      if(temp == 'admin'){
        this.admin = true;
      }
      if(temp == 'user'){
        this.user = true;
      }
      if(temp == 'accountant'){
        this.accountant = true;
      }
    }
  }
  logout(){
    this.authService.logout();
    this.router.navigateByUrl('/login');
  }
}
