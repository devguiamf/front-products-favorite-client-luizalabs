import { HttpClient,  HttpHeaders } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of, take, tap } from 'rxjs';
import { Favorite } from '../../api/favorite';
import { environment } from '../../../environments/environment.development';
import { Product } from '../../api/products';

export interface FavoriteProduct {
  title: string;
  price: number;
  category: string;
  description: string;
  image: string;
  productApiId: number;
}

export interface CreateFavoriteList {
  title: string;
  userId: string;
  description?: string;
}

export interface UpdateFavotireList {
  title?: string;
  description?: string;
}

@Injectable({
  providedIn: 'root'
})
export class FavoritesService {

  private http: HttpClient = inject(HttpClient);
  private favoriteApiURL = environment.api_favorite;
  private favoriteList: BehaviorSubject<Favorite> = new BehaviorSubject<Favorite>({} as Favorite);
  private headers: HttpHeaders;

  constructor(){
    const token = this.getToken();
    this.headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token?.replace(/"/g, '')}`
    });
  }

  loadFavoriteList(idUser: string) {
    this.getFavoritesAPI(idUser)
      .pipe(take(1))
      .subscribe({
        next: (res) => this.triggerFavoriteEvent(res),
        error: (err) => this.triggerFavoriteEvent(null as unknown as Favorite)
      })
  }

  private getToken() {
    return localStorage.getItem('token_data');
  }

  private getFavoritesAPI(idUser: string) :Observable<Favorite> {
    return this.http.get<Favorite>(`${this.favoriteApiURL}/${idUser}`, {headers: this.headers});
  }

  private triggerFavoriteEvent(favorite: Favorite) {
    this.favoriteList.next(favorite);
  }

  private removeFavoriteItem$(id: number): void {
    const favorite = this.favoriteList.getValue();
    const newFavorite = favorite.products?.filter((item) => item.productApiId !== id);
    this.triggerFavoriteEvent({...favorite, products: newFavorite});
  }

  observeFavoriteList(): Observable<Favorite> {
    return this.favoriteList.asObservable();
  }

  unfavoriteProductAPI(idUser: string, productId: number): Observable<any> {   
    console.log('ID DO USUÁRIO', idUser);
    console.log('ID DO PRODUTO', productId);    
    return this.http.post(`${this.favoriteApiURL}/${idUser}/unfavorite-product`, {productApiId: productId}, {headers: this.headers})
      .pipe(tap(() => this.removeFavoriteItem$(productId)))
  }

  createFavoriteListAPI(favorite: CreateFavoriteList): Observable<any> {
    return this.http.post(this.favoriteApiURL, favorite, {headers: this.headers});
  }

  favoriteProductAPI(idUser: string, product: Product): Observable<any> {
    const favoriteProduct = this.productToFavorite(product);
    console.log('PRODUTO FAVORITADO', favoriteProduct);
    
    return this.http.post(`${this.favoriteApiURL}/${idUser}/favorite-product`, favoriteProduct, {headers: this.headers});
  }

  deleteFavoriteListAPI(idUser: string): Observable<void> {
    return this.http.delete<void>(`${this.favoriteApiURL}/${idUser}`, {headers: this.headers});
  }

  updateFavoriteListAPI(favorite: Favorite): Observable<void> {
    const { title, description, ...rest } = favorite;
    return this.http.patch<void>(`${this.favoriteApiURL}/${favorite.userId}`, {title, description}, {headers: this.headers});
  }

  productToFavorite(product: Product): FavoriteProduct {
    return {
      title: product.title,
      price: product.price,
      category: product.category,
      description: product.description,
      image: product.image,
      productApiId: product.id
    }
  }
}
