import { EventEmitter, Injectable } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { login, signUp } from '../data-type';
import { BehaviorSubject } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class SellerService {
  isLoginError=new EventEmitter <boolean>(false);
  isSellerLogedIn = new BehaviorSubject<boolean>(false);
  constructor(private http: HttpClient, private router: Router) {}
  userSignup(data: signUp) {
    this.http
      .post('http://localhost:3000/seller', data, { observe: 'response' })
      .subscribe((result) => {
        this.isSellerLogedIn.next(true);
        if(result){
          localStorage.setItem('seller', JSON.stringify(result.body));
          this.router.navigate(['seller-home']);
          alert("register");
        }



      });
  }
  reloadSeller(){
  if(localStorage.getItem('seller')){
    this.isSellerLogedIn.next(true);
    this.router.navigate(['seller-home']);

  }
  }
  userLogin(data:login){
this.http.get(`http://localhost:3000/seller?email=${data.email}&password=${data.password}`,
{observe:'response'}
).subscribe((result:any)=>{
  console.warn(result);
 if(result && result.body && result.body.length){
alert("user logedIn");
localStorage.setItem('seller', JSON.stringify(result.body));
this.router.navigate(['seller-home']);
 }else{
  this.isLoginError.emit(true)
 }
})
  }
}
