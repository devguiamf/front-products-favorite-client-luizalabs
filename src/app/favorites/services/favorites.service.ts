import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of, take, tap } from 'rxjs';
import { Favorite } from '../../api/favorite';
import { environment } from '../../../environments/environment.development';
import { Product } from '../../api/products';

@Injectable({
  providedIn: 'root'
})
export class FavoritesService {

  private http: HttpClient = inject(HttpClient);
  private favoriteApiURL = environment.api_favorite;
  private favoriteList: BehaviorSubject<Favorite> = new BehaviorSubject<Favorite>({} as Favorite);
  private headers: HttpHeaders = new HttpHeaders({
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${this.getToken()}`
  });

  loadFavoriteList() {
    this.getFavoritesAPI()
      .pipe(take(1))
      .subscribe({
        next: (res) => this.triggerFavoriteEvent(res)
      })
  }

  private getToken() {
    return localStorage.getItem('token');
  }

  private getFavoritesAPI() :Observable<Favorite> {
    return this.http.get<Favorite>(this.favoriteApiURL, {headers: this.headers});
  }

  private triggerFavoriteEvent(favorite: Favorite) {
    this.favoriteList.next(favorite);
  }

  observeFavoriteList(): Observable<Favorite> {
    return this.favoriteList.asObservable();
  }

  removeFavoriteItemAPI(productId: string): Observable<any> {   
    return this.http.delete(`${this.favoriteApiURL}/favorite/${productId}`, {headers: this.headers})
      .pipe(tap(() => this.removeFavoriteItem$(productId)))
  }

  private removeFavoriteItem$(id: string): void {
    const favorite = this.favoriteList.getValue();
    const newFavorite = favorite.products.filter((item) => item.id !== id);
    this.triggerFavoriteEvent({...favorite, products: newFavorite});
  }

  addFavoriteItemAPI(product: Product): Observable<any> {  
    return this.http.post(`${this.favoriteApiURL}/unfavorite/${product.id}`, {}, {headers: this.headers});
  }

  deleteFavoriteListAPI(id: string): Observable<void> {
    return of();
  }

  updateFavoriteListAPI(favorite: Favorite): Observable<void> {
    return of();
  }
}
