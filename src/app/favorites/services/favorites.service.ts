import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of, Subject, take, tap } from 'rxjs';
import { Favorite, FavoriteItem } from '../../api/favorite';
import { Product } from '../../api/products';

@Injectable({
  providedIn: 'root'
})
export class FavoritesService {

  private http: HttpClient = inject(HttpClient);
  private favoriteApiURL = 'https://localhost:3000/favorite';
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
    // return this.http.get<Favorite>(this.favoriteApiURL);
    return of({
      id: '123456',
      title: 'My Favorite List',
      description: 'This is my favorite list',
      products: [
        {
          id: '1234565',
          title: "Fjallraven - Foldsack No. 1 Backpack, Fits 15 Laptops",
          price: 109.95,
          image: 'https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_.jpg',
        },
        {
          id: '123455',
          title: "Mens Casual Premium Slim Fit T-Shirts ",
          price: 22.3,
          image: "https://fakestoreapi.com/img/71-3HjGNDUL._AC_SY879._SX._UX._SY._UY_.jpg",
        }
      ]
    })
  }

  private triggerFavoriteEvent(favorite: Favorite) {
    this.favoriteList.next(favorite);
  }

  observeFavoriteList(): Observable<Favorite> {
    return this.favoriteList.asObservable();
  }

  removeFavoriteItemAPI(id: string): Observable<any> {   
    return of({})
      .pipe(
        tap(() => this.removeFavoriteItem$(id))
      )
  }

  private removeFavoriteItem$(id: string): void {
    const favorite = this.favoriteList.getValue();
    const newFavorite = favorite.products.filter((item) => item.id !== id);
    this.triggerFavoriteEvent({...favorite, products: newFavorite});
  }

  addFavoriteItemAPI(item: Product): Observable<any> {  
    return of({})
  }

  deleteFavoriteListAPI(id: string): Observable<void> {
    return of();
  }

  updateFavoriteListAPI(favorite: Favorite): Observable<void> {
    return of();
  }
}
