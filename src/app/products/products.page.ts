import { Component } from '@angular/core';
import { ListProductsComponent } from "./components/list-products/list-products.component";

@Component({
  selector: 'products-page',
  imports: [ListProductsComponent],
  templateUrl: './products.page.html'
})
export class ProductsPage {

}
