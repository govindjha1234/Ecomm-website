import { Component, OnInit } from '@angular/core';
import { SellerService } from '../services/seller.service';
import { Router } from '@angular/router';
import { signUp } from '../data-type';
import { login } from '../data-type';

@Component({
  selector: 'app-seller-auth',
  templateUrl: './seller-auth.component.html',
  styleUrls: ['./seller-auth.component.css'],
})
export class SellerAuthComponent implements OnInit {
  showLogIn = false;
  authError:string='';
  constructor(private seller: SellerService, private router: Router) {}
  ngOnInit(): void {
    this.seller.reloadSeller();
  }
  signUp(data: signUp): void {
    this.seller.userSignup(data)
  }
  login(data: login): void {
   console.warn(data);
    this.seller.userLogin(data);
    this.seller.isLoginError.subscribe((isError:any)=>{
  if(isError){
this.authError="Email and Password is not correct";
  }
    })

  }
  openLogin() {
    this.showLogIn = true;
  }
  openSignUp() {
    this.showLogIn = false;
  }
}
