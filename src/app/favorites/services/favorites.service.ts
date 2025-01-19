import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { Favorite, FavoriteItem } from '../../api/favorite';

@Injectable({
  providedIn: 'root'
})
export class FavoritesService {

  private http: HttpClient = inject(HttpClient);
  private favoriteApiURL = 'https://api.com/favorites';
  private favoriteList!: Favorite;

  private listFavorites: Subject<Favorite> = new Subject<Favorite>();
  public listFavorites$: Observable<Favorite> = this.listFavorites.asObservable();

  getFavorites() :Observable<Favorite[]> {
    return this.http.get<Favorite[]>(this.favoriteApiURL);
  }

  removeFavoriteItem(id: number) {}

  deleteFavoriteList() {}

  updateFavoriteList(favorite: Favorite) {}

  $addFavoriteItem(favorite: FavoriteItem) {
    this.favoriteList.items.push(favorite);
    this.listFavorites.next(this.favoriteList);
  }

  $removeFavoriteItem(favorite: FavoriteItem) {
    this.favoriteList.items = this.favoriteList.items.filter((item) => item.id !== favorite.id);
    this.listFavorites.next(this.favoriteList);
  }
}
