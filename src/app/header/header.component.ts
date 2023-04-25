import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import { product } from '../data-type';
import { ProductsService } from '../services/products.service';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  user = faUser;
  sellerName: String = '';
  menuType: string = 'default';
  searchResult: undefined | product[];
  userName: String = '';
  cartItems = 0;

  constructor(private router: Router, private product: ProductsService) {}
  ngOnInit() {
    this.router.events.subscribe((val: any) => {
      if (val.url) {
        console.warn(val.url);
        if (localStorage.getItem('seller') && val.url.includes('seller')) {
          let sellerStore = localStorage.getItem('seller');
          let sellerData = sellerStore && JSON.parse(sellerStore)[0];
          this.sellerName = sellerData.name;
          this.menuType = 'seller';
        } else if (localStorage.getItem('user')) {
          let userStore = localStorage.getItem('user');
          let userData = userStore && JSON.parse(userStore);
          this.userName = userData.name;
          this.menuType = 'user';
          this.product.getCartList(userData.id);
        } else {
          this.menuType = 'default';
        }
      }
    });
    let cartData = localStorage.getItem('localCart');
    if (cartData) {
      this.cartItems = JSON.parse(cartData).length;
    }
    this.product.cartData.subscribe((items) => {
      this.cartItems = items.length;
    });
  }
  logOut() {
    localStorage.removeItem('seller');
    this.router.navigate(['/seller-auth']);
  }
  userLogOut() {
    localStorage.removeItem('user');
    this.router.navigate(['/user-auth']);
    this.product.cartData.emit([]);
  }
  searchProduct(query: KeyboardEvent) {
    const element = query.target as HTMLInputElement;
    this.product.searchProducts(element.value).subscribe((result) => {
      if (result.length > 5) {
        result.length = 5;
      }

      this.searchResult = result;
    });
  }
  hideSearch() {
    this.searchResult = undefined;
  }
  redirectToDetails(id: number) {
    this.router.navigate(['/details/' + id]);
  }
  submitSearch(val: string) {
    this.router.navigate([`search/${val}`]);
  }

}
