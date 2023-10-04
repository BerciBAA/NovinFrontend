import { AuthService } from './../auth-service.service';
import { Component } from '@angular/core';
import { AccountService } from '../account.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent {
  
    userId:string;
    userObj={
      id:Number,
      name:String,
      username:String,
      loginAt:Number[6],
      roles:String[10]

    } 

    constructor(private accountService: AccountService, private authService:AuthService){
      this.userId = localStorage.getItem('userId')
      this.accountService.getUserInfo(this.userId).subscribe({
        next: (r) => {
          this.userObj = r;
        }
    })
  }
}
