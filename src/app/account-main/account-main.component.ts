import { AccountService } from './../account.service';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-account-main',
  templateUrl: './account-main.component.html',
  styleUrls: ['./account-main.component.css']
})
export class AccountMainComponent implements OnInit {
  constructor(private route: ActivatedRoute, private accountService:AccountService) {}
  reactiveFrom:FormGroup;
  id;
  exhibitionDate;
  dueDate;
  customerName:String;
  itemName:String;
  comment:String;
  price:Number;


  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.id = params['id'];
    });

    this.reactiveFrom = new FormGroup({
      customerName: new FormControl(null,Validators.required),
      exhibitionDate: new FormControl(null,[Validators.required, Validators.pattern(/^\d{4}\-(0[1-9]|1[012])\-(0[1-9]|[12][0-9]|3[01])$/)]),
      dueDate: new FormControl(null,[Validators.required, Validators.pattern(/^\d{4}\-(0[1-9]|1[012])\-(0[1-9]|[12][0-9]|3[01])$/)]),
      itemName: new FormControl(null,Validators.required),
      comment: new FormControl(null,Validators.required),
      price: new FormControl(0,Validators.required),
    });
    this.accountService.getAccountByAccountId(this.id).subscribe({
      next:(r)=>{
        this.customerName = r.customerName;
        this.dueDate = r.dueDate
        this.exhibitionDate = r.exhibitionDate;
        this.itemName = r.itemName;
        this.comment = r.comment;
        this.price = r.price;
      }
    });
  }
 
  
}
