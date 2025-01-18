import { Component, EventEmitter, Input, Output, output } from '@angular/core';
import { Product } from '../../../../api/products';

@Component({
  selector: 'product-component',
  imports: [],
  templateUrl: './product.component.html'
})
export class ProductComponent {
  @Input() product!: Product;
  @Output() favoriteProduct: EventEmitter<Product> = new EventEmitter();
}
