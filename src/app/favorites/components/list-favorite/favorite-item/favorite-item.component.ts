import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FavoriteItem } from '../../../../api/favorite';

@Component({
  selector: 'favorite-item-component',
  imports: [],
  templateUrl: './favorite-item.component.html',
  styles: `
    :host {
      display: block;
    }
  `

})
export class FavoriteItemComponent {
  @Input() favoriteItem!: FavoriteItem;
  @Output() removeFavoriteItem: EventEmitter<number> = new EventEmitter();
}
