import { HttpErrorResponse } from '@angular/common/http';
import { AccountService } from './../account.service';
import { Component, OnInit,  ViewChild} from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ReCaptcha2Component } from 'ngx-captcha';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  
  
  reactiveFrom:FormGroup;
  errorMessage:String = null;
  successResiter:String = null;
  @ViewChild('captchaElem') captchaElem: ReCaptcha2Component;

  roleObj: Array<{
    name: string;
    id: number;
  }>

  registerObj={
    username:String,
    name:String,
    password:String,
    roleId:Number,
  } 

  constructor(private accountService: AccountService, private router: Router){
    this.accountService.getRoles().subscribe({
      next: (res) =>{this.roleObj = res
        this.reactiveFrom.value.role =this.roleObj[0].name
      } ,
      error: (e: HttpErrorResponse) => {
        this.errorMessage = e.error;
      }
    });
 

  }

  ngOnInit(){
    
    this.reactiveFrom = new FormGroup({
        username: new FormControl(null,Validators.required),
        password: new FormControl(null,Validators.required),
        role: new FormControl(3, Validators.required)
    });
   
  }

  onSubmit(){
    this.errorMessage = null;
    this.registerObj.username = this.reactiveFrom.value.username;
    this.registerObj.name = this.reactiveFrom.value.username;
    this.registerObj.password = this.reactiveFrom.value.password;
    this.registerObj.roleId =  this.reactiveFrom.value.role;
    
    this.accountService.onRegister(this.registerObj).subscribe({
      next: (res)=>{
        this.successResiter = "A Regisztráció sikeres volt!";
        this.router.navigateByUrl('/login');
    },
      error: (e: HttpErrorResponse) => {
        this.errorMessage = e.error;
      }
    });
  }
}
