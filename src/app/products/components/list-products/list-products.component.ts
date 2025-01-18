import { Component, EventEmitter, Input, input, InputSignal, Output, output } from '@angular/core';
import { ProductComponent } from "./product/product.component";
import { Product } from '../../../api/products';

@Component({
  selector: 'list-products-component',
  imports: [ProductComponent],
  templateUrl: './list-products.component.html'
})
export class ListProductsComponent {
  @Input() products: Product[] = [];
  @Output() eventFavoriteProduct: EventEmitter<Product> = new EventEmitter();
}
