import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable} from 'rxjs';
import { Product } from '../../api/products';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {
  private apiProductList = 'https://fakestoreapi.com/products'
  private http = inject(HttpClient)

  getProductAPI(): Observable<Product[]>{
    return this.http.get<Product[]>(this.apiProductList)
  }
}
