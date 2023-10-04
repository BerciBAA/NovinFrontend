import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AccountService {

  constructor(private http: HttpClient) { }

  getAllUser(): Observable<any>{
    
    return this.http.get("http://localhost:8080/user/get-all-user");
    
  }

  deleteUser(id:number): Observable<any>{
    return this.http.delete("http://localhost:8080/user/delete-user/"+id);
    
  }

  getUserInfo(id: string): Observable<any>{
    
    return this.http.get("http://localhost:8080/user/get-user/"+id);
    
  }

  onLogin(obj: any): Observable<any>{
    
    return this.http.post("http://localhost:8080/auth/authentication", obj);
    
  }
  
  AddRole(obj: any): Observable<any>{
    console.log(obj)
    return this.http.post("http://localhost:8080/user/add-role", obj);
    
  }

  removeRole(obj: any): Observable<any>{
    return this.http.post("http://localhost:8080/user/remove-role", obj);
  }

  getRoles(): Observable<any>{
    
    return this.http.get("http://localhost:8080/role/roles");
    

  }

  getAllRoles(): Observable<any>{
    
    return this.http.get("http://localhost:8080/role/get-all-roles");
    
  }

  logaout(): Observable<any>{
    
    return this.http.get("http://localhost:8080/auth/logout");
    
  }


  onRegister(obj: any): Observable<any>{
    
    return this.http.put("http://localhost:8080/auth/register", obj);
    
  }

  addAccount(obj: any): Observable<any>{
    
    return this.http.put("http://localhost:8080/accountant/create-account", obj);
    
  }

  getAllAccountById(id: number): Observable<any>{
    
    return this.http.get("http://localhost:8080/accountant/get-all-account-by-userid/"+id);
    
  }

  getAccountByAccountId(id: number): Observable<any>{
    
    return this.http.get("http://localhost:8080/accountant/get-account-by-id/"+id);
    
  }
}
