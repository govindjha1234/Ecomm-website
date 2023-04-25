import { Component, OnInit } from '@angular/core';
import { product } from '../data-type';
import { ProductsService } from '../services/products.service';

@Component({
  selector: 'app-seller-add-product',
  templateUrl: './seller-add-product.component.html',
  styleUrls: ['./seller-add-product.component.css'],
})
export class SellerAddProductComponent implements OnInit {
  addProductMesaage: string | undefined;
  constructor(private product: ProductsService) {}
  ngOnInit(): void {}
  submit(data: product) {
    this.product.addProduct(data).subscribe((result) => {
      console.warn(result);
      if (result) {
        this.addProductMesaage = 'product is successfully added';
      }
      setTimeout(() => (this.addProductMesaage = undefined), 2000);
    });
  }
}
