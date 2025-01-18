import { Component } from '@angular/core';
import { ListFavoriteComponent } from "./components/list-favorite/list-favorite.component";

@Component({
  selector: 'app-favorites',
  imports: [ListFavoriteComponent],
  templateUrl: './favorites.page.html'
})
export class FavoritesPage{

}
