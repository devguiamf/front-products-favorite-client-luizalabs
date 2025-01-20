import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable} from 'rxjs';
import { Product } from '../../api/products';
import { environment } from '../../../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {
  private apiProductList = environment.api_product
  private http = inject(HttpClient)

  getProductAPI(): Observable<Product[]>{
    return this.http.get<Product[]>(this.apiProductList)
  }
}
