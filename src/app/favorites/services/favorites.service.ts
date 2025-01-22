import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
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

  loadFavoriteList(idUser: string) {
    this.getFavoritesAPI(idUser)
      .pipe(take(1))
      .subscribe({
        next: (res) => this.triggerFavoriteEvent(res),
        error: (err) => this.handlerError(err)
      })
  }

  handlerError(error: HttpErrorResponse) {
    console.error(error);
  }

  private getToken() {
    return localStorage.getItem('token');
  }

  private getFavoritesAPI(idUser: string) :Observable<Favorite> {
    console.log(`${this.favoriteApiURL}/${idUser}`);
    
    return this.http.get<Favorite>(`${this.favoriteList}/${idUser}`, {headers: this.headers});
  }

  private triggerFavoriteEvent(favorite: Favorite) {
    this.favoriteList.next(favorite);
  }

  observeFavoriteList(): Observable<Favorite> {
    return this.favoriteList.asObservable();
  }

  unfavoriteProductAPI(idUser: string, productId: string): Observable<any> {   
    return this.http.post(`${this.favoriteApiURL}/${idUser}`, {productId}, {headers: this.headers})
      .pipe(tap(() => this.removeFavoriteItem$(productId)))
  }

  private removeFavoriteItem$(id: string): void {
    const favorite = this.favoriteList.getValue();
    const newFavorite = favorite.products?.filter((item) => item.id !== id);
    this.triggerFavoriteEvent({...favorite, products: newFavorite});
  }

  favoriteProductAPI(idUser: string, product: Product): Observable<any> {  
    return this.http.post(`${this.favoriteApiURL}/${idUser}/favorite-product`, product, {headers: this.headers});
  }

  deleteFavoriteListAPI(idUser: string): Observable<void> {
    return this.http.delete<void>(`${this.favoriteApiURL}/${idUser}`, {headers: this.headers});
  }

  updateFavoriteListAPI(favorite: Favorite): Observable<void> {
    return this.http.patch<void>(`${this.favoriteApiURL}/${favorite.id}`, favorite, {headers: this.headers});
  }
}
