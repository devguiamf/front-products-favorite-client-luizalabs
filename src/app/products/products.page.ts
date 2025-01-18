import { Component, inject, OnInit } from '@angular/core';
import { ListProductsComponent } from "./components/list-products/list-products.component";
import { Product } from '../api/products';
import { ProductsService } from './services/products.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Subject, takeUntil } from 'rxjs';
import { UserSessionService } from '../common/services/user-session/user-session.service';

@Component({
  selector: 'products-page',
  imports: [ListProductsComponent],
  templateUrl: './products.page.html',
  providers: [ProductsService]
})
export class ProductsPage implements OnInit{

  userSessionService = inject(UserSessionService);
  productsService = inject(ProductsService);

  $destroy: Subject<VideoDecoderEventMap> = new Subject();
  
  loading: boolean = false;
  products: Product[] = [];


  ngOnInit(): void {
    this.getProductsService();
  }

  getProductsService(){
    this.loading = true
    this.productsService.getProductAPI()
      .pipe(takeUntil(this.$destroy))
      .subscribe({
        next: (res) => {this.products = res; console.log(this.products);
        },
        error: (err) => this.errorHandler(err),
        complete: () => this.loading = false
      })
  }

  favoriteProduct(product: Product){
    const isLogged = this.userSessionService.isUserLogged();
    
    if(!isLogged) return alert('Você precisa estar logado para favoritar produtos');

    this.productsService.favoriteProductAPI(product)
      .subscribe({
        next: (res) => {},
        error: (err) => this.errorHandler(err)
      })
  }

  errorHandler(err: HttpErrorResponse){

  }
}
