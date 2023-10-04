import { MainComponent } from './../main/main.component';
import { AccountService } from './../account.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent  implements OnInit {

  usersObj={}[0];
 
  dropdownList = [];
  selectedItems = [];
  dropdownSettings = {};

  constructor(private accountService: AccountService){

  }
  
  
  ngOnInit(): void {
   
    this.dropdownSettings = {
      singleSelection: false,
      idField: 'item_id',
      textField: 'item_text',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      enableCheckAll: false,
      itemsShowLimit: 3,
      allowSearchFilter: false
    };
    this.accountService.getAllRoles().subscribe({
      
      next:(r)=>{
        for(let i = 0; i< r.length; i++){
          this.dropdownList.push({item_id: r[i].id, item_text: r[i].name})
        }
      },
      error:(e)=>{
      }})

    this.accountService.getAllUser().subscribe({
    next:(r)=>{
      for(let i = 0; i< r.length; i++){
        let array = [];
        for(let j = 0; j < r[i].roles.length; j++){
          array.push({item_id: r[i].roles[j].id, item_text: r[i].roles[j].name})
        }
        this.selectedItems.push(array)
      }
      this.usersObj = r
    },
    error:(e)=>{
    }})
  }

  onItemSelect($event, i) {
    this.accountService.AddRole({userId: this.usersObj[i].id, role: $event.item_text}).subscribe()
   
  }
  onItemDeSelect($event, i){
    this.accountService.removeRole({userId: this.usersObj[i].id, role: $event.item_text}).subscribe()
  }
 
  delete(id){
    this.accountService.deleteUser(id).subscribe(() => {
      this.accountService.getAllUser().subscribe({
        next:(r)=>{
          this.usersObj = r
        },
        error:(e)=>{
        }})
    });
    
  }

}
