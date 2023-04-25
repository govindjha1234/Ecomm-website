import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './auth.guard';
import { FooterComponent } from './footer/footer.component';
import { HomeComponent } from './home/home.component';
import { ProductDetailsComponent } from './product-details/product-details.component';
import { SearchComponent } from './search/search.component';
import { SellerAddProductComponent } from './seller-add-product/seller-add-product.component';
import { SellerAuthComponent } from './seller-auth/seller-auth.component';
import { SellerHomeComponent } from './seller-home/seller-home.component';
import { SellerUpdateProductComponent } from './seller-update-product/seller-update-product.component';
import { UserAuthComponent } from './user-auth/user-auth.component';
import { CartPageComponent } from './cart-page/cart-page.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'seller-auth', component: SellerAuthComponent },

  {
    path: 'seller-home',
    canActivate: [AuthGuard],
    component: SellerHomeComponent,
  },
  {
    path: 'seller-add-product',
    canActivate: [AuthGuard],
    component: SellerAddProductComponent,
  },
  {
    path: 'seller-update-product/:id',
    canActivate: [AuthGuard],
    component: SellerUpdateProductComponent,
  },
  {
    path: 'search/:query',
   component: SearchComponent,
  },
  {
    path: 'footer',
   component: FooterComponent,
  },
  {
    path: 'details/:productId',
   component: ProductDetailsComponent,
  },
  {
    path: 'user-auth',
   component: UserAuthComponent,
  },
  {
    component:CartPageComponent,
    path:'cart-page',
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
