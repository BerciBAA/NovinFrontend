import { AuthService } from './../auth-service.service';
import { HttpErrorResponse } from '@angular/common/http';
import { AccountService } from './../account.service';
import { Component, OnInit,  ViewChild} from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ReCaptcha2Component } from 'ngx-captcha';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  protected captchaFromGroup: FormGroup;
  reactiveFrom:FormGroup;
  errorMessage:String = null;
  siteKey:string='6LdQZWooAAAAANVbuJLzeO5N7kMPFFl1kelibS_A'
  badLoginCnt:number = 0;
  activateLoginButton:boolean = false;
  @ViewChild('captchaElem') captchaElem: ReCaptcha2Component;

  loginObj={
    username:String,
    password:String
  } 

  constructor(private accountService: AccountService, private router:Router, private formBuilder: FormBuilder, private authService: AuthService){
  }

  ngOnInit(){
    this.captchaFromGroup = this.formBuilder.group({
      recaptcha: ['', Validators.required]
    });
    this.reactiveFrom = new FormGroup({
        username: new FormControl(null,Validators.required),
        password: new FormControl(null,Validators.required)
    });
  }
  
  handleSuccess(event){
    this.activateLoginButton = false;
    this.badLoginCnt=2;
  }

  onSubmit(){
    this.loginObj.username = this.reactiveFrom.value.username;
    this.loginObj.password = this.reactiveFrom.value.password;
    
    this.accountService.onLogin(this.loginObj).subscribe({
      next: (r) => {
        var roles:string[] = new Array(4)
        for(let i = 0; i < r.roles.length; i++){
          roles[i] =r.roles[i].name.toLowerCase();
        }
        this.authService.login(roles)
        this.router.navigateByUrl("/main")
        localStorage.setItem('token', r.access_token)
        localStorage.setItem('userId', r.id)
      },
      error: (e: HttpErrorResponse) => {
        this.errorMessage = e.error;
        this.captchaElem.resetCaptcha();
        this.reactiveFrom.get('password').reset();
      }
     
    });
    this.badLoginCnt++;
    if(this.badLoginCnt === 3){
      this.activateLoginButton = true;
    }
    
  }

}
