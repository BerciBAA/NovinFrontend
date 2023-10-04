import { AccountService } from './../account.service';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-accountant-creation',
  templateUrl: './accountant-creation.component.html',
  styleUrls: ['./accountant-creation.component.css']
})
export class AccountantCreationComponent  implements OnInit {

  reactiveFrom:FormGroup;
  errorMessage:String = null;
  succesMessage:String = null;
  today = new Date();
  tomorrow = new Date();

  constructor(private accountService:AccountService){

  }

  ngOnInit(): void {
    this.tomorrow.setDate(this.tomorrow.getDay()+2)
    this.reactiveFrom = new FormGroup({
      customerName: new FormControl(null,Validators.required),
      exhibitionDate: new FormControl(this.today.toISOString().slice(0, 10),[Validators.required, Validators.pattern(/^\d{4}\-(0[1-9]|1[012])\-(0[1-9]|[12][0-9]|3[01])$/)]),
      dueDate: new FormControl(this.tomorrow.toISOString().slice(0, 10),[Validators.required, Validators.pattern(/^\d{4}\-(0[1-9]|1[012])\-(0[1-9]|[12][0-9]|3[01])$/)]),
      itemName: new FormControl(null,Validators.required),
      comment: new FormControl(null,Validators.required),
      price: new FormControl(0,Validators.required),
  });
  }

  onSubmit(){
    this.reactiveFrom.value.exhibitionDate = this.reactiveFrom.value.exhibitionDate+"T00:00:00"
    this.reactiveFrom.value.dueDate = this.reactiveFrom.value.dueDate+"T23:59:59"
    this.accountService.addAccount(this.reactiveFrom.value).subscribe({
      next:()=>{
        this.reactiveFrom.value
        this.errorMessage=null
        this.succesMessage = "A számla felvétele megtörtént!"
      },
      error:(e)=>{
        this.errorMessage = e.error
      }

    } );
    this.reactiveFrom.value.exhibitionDate = this.today.toISOString().slice(0, 10);
    this.reactiveFrom.value.dueDate = this.tomorrow.toISOString().slice(0, 10)
  }
 
}
