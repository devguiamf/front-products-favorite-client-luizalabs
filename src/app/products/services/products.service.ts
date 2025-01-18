import { HttpClient, HttpResponse, HttpResponseBase } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Product } from '../../api/products';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {
  private apiProductList = 'https://fakestoreapi.com/products'
  private apiFavoriteProduct = ''
  private http = inject(HttpClient)

  getProductAPI(): Observable<Product[]>{
    return this.http.get<Product[]>(this.apiProductList)
  }

  favoriteProductAPI(product: Product): Observable<HttpResponseBase>{
    return this.http.post<HttpResponseBase>(this.apiFavoriteProduct, product)
  }
}
