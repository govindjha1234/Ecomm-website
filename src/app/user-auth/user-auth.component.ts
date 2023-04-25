import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { cart, login, product, signUp } from '../data-type';
import { UserService } from '../services/user.service';
import { ProductsService } from '../services/products.service';

@Component({
  selector: 'app-user-auth',
  templateUrl: './user-auth.component.html',
  styleUrls: ['./user-auth.component.css']
})
export class UserAuthComponent implements OnInit {
  showLogin:boolean=true;
  authError:String="";
constructor(private user:UserService,private route:Router,private product:ProductsService){}
ngOnInit(): void {
this.user.userAuthReload();
}
signUp(data:signUp){
this.user.userSignUp(data);

}
Login(data:login){
this.user.userLogIN(data);
this.user.invalidUserAuth.subscribe((result)=>{
if(result){
this.authError="Please enter valid user details ";
}else{
  this.localCartToRemoteCart();
}
})
}
openSignUp(){
this.showLogin=false;
}
openLogin(){
this.showLogin=true;
}
localCartToRemoteCart(){
  let data=localStorage.getItem('localCart');
  let user = localStorage.getItem('user');
  let userId=user && JSON.parse(user).id;
  if(data){
     let cartDataList:product[]=JSON.parse(data);

    cartDataList.forEach((product:product,index)=>{
      let cartData:cart={
        ...product,
        productId: product.id,
        userId
      };
      delete cartData.id;
     setTimeout(() => {
      this.product.addToCart(cartData).subscribe((result)=>{
        if(result){
          console.warn("item stored in db");

        }
              })

     }, 500);
     if(cartDataList.length===index+1){
      localStorage.removeItem('localCart');
    }

    })
  }
  setTimeout(() => {
    this.product.getCartList(userId);
  }, 2000);
}

}

