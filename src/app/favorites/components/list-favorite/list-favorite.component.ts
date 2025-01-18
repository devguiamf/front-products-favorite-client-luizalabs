import { Component } from '@angular/core';
import { FavoriteItemComponent } from "./favorite-item/favorite-item.component";

@Component({
  selector: 'list-favorite-component',
  imports: [FavoriteItemComponent],
  templateUrl: './list-favorite.component.html'
})
export class ListFavoriteComponent {

}
