import { Component, inject, OnInit } from '@angular/core';
import { ListFavoriteComponent } from "./components/list-favorite/list-favorite.component";
import { Favorite } from '../api/favorite';
import { FavoritesService } from './services/favorites.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-favorites',
  imports: [ListFavoriteComponent],
  templateUrl: './favorites.page.html'
})
export class FavoritesPage implements OnInit{
  
  favoritesService = inject(FavoritesService);
  
  favorites: Favorite[] = []
  loading: boolean = false;

  ngOnInit(): void {
    
  }

  getFavoritesListService(){
    this.loading = true;
    this.favoritesService.getFavorites()
      .subscribe({
        next: (response) => this.favorites = response,
        error: (err) => this.handlerError(err),
        complete: () => this.loading = false
      })
  }

  handlerError(error: HttpErrorResponse){
    
  }
}
