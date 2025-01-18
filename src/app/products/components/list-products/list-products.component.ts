import { Component } from '@angular/core';
import { ProductComponent } from "./product/product.component";

@Component({
  selector: 'list-products-component',
  imports: [ProductComponent],
  templateUrl: './list-products.component.html'
})
export class ListProductsComponent {

}
