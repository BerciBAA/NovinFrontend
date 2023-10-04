import { AuthService } from './../auth-service.service';
import { AccountService } from './../account.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-accountants',
  templateUrl: './accountants.component.html',
  styleUrls: ['./accountants.component.css']
})
export class AccountantsComponent implements OnInit {

  constructor(private accountService:AccountService,private authService: AuthService){}
  accountant:boolean = true;
  userId;
  accounts=[];

  ngOnInit(): void {
    for(let i = 0; i < 3; i++){
      let temp = localStorage.getItem("ROLE"+i);
      if(temp === 'accountant' || temp === 'admin'){
        this.accountant = false;
      }
    }
    this.userId = localStorage.getItem('userId');
    this.accountService.getAllAccountById(this.userId).subscribe({
      next:(r)=>{
        this.accounts = r;
      }
    });
  }

}
