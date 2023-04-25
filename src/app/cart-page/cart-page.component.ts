import { Component, OnInit } from '@angular/core';
import { ProductsService } from '../services/products.service';
import { cart, priceSummary } from '../data-type';

@Component({
  selector: 'app-cart-page',
  templateUrl: './cart-page.component.html',
  styleUrls: ['./cart-page.component.css'],
})
export class CartPageComponent implements OnInit {
  cartData: cart[] | undefined;
  priceSummary: priceSummary = {
    price: 0,
    discount: 0,
    tax: 0,
    delivery: 0,
    total: 0,
  };
  constructor(private product: ProductsService) {}
  ngOnInit(): void {
    this.product.currentCart().subscribe((result) => {
      this.cartData = result;
      let price = 0;

      result.forEach((items) => {

        price +=+items.price;
        console.warn(price);






      });
      this.priceSummary.price=price;
      this.priceSummary.delivery=40;
      this.priceSummary.discount=price/10;
      this.priceSummary.tax=price/5;
      this.priceSummary.tax=this.priceSummary.price+this.priceSummary.delivery+this.priceSummary.tax-this.priceSummary.discount;
    });
  }
}
