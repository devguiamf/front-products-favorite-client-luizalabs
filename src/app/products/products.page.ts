import { Component, inject, OnInit, signal, WritableSignal } from '@angular/core';
import { ListProductsComponent } from "./components/list-products/list-products.component";
import { Product } from '../api/products';
import { ProductsService } from './services/products.service';
import { HttpErrorResponse } from '@angular/common/http';
import { take } from 'rxjs';
import { UserSessionService } from '../common/services/user-session/user-session.service';
import { FavoritesService } from '../favorites/services/favorites.service';
import { ToastNotificationService } from '../common/services/toast-notification/toast-notification.service';
import { Router } from '@angular/router';

@Component({
  selector: 'products-page',
  imports: [ListProductsComponent],
  templateUrl: './products.page.html',
  providers: [ProductsService, FavoritesService, UserSessionService, ToastNotificationService]
})
export class ProductsPage implements OnInit{

  private userSessionService = inject(UserSessionService);
  private productsService = inject(ProductsService);
  private favoriteService = inject(FavoritesService);
  private toastNotificationService = inject(ToastNotificationService);
  private router = inject(Router);
  
  protected loading: boolean = false;
  protected products: Product[] = [];
  protected showModal: boolean = false;
  protected isModalOpen: WritableSignal<boolean> = signal(false);


  ngOnInit(): void {
    this.getProductsService();
    if(this.userSessionService.isUserLogged()){
      this.favoriteService.loadFavoriteList();
    }
  }

  private errorHandler(err: HttpErrorResponse){
    this.toastNotificationService.showWarning({title: 'Ops...', message: err.message})
  }

  private getProductsService(){
    this.loading = true
    this.productsService.getProductAPI()
      .pipe(take(1))
      .subscribe({
        next: (res) => this.products = res,
        error: (err) => this.errorHandler(err),
        complete: () => this.loading = false
      })
  }
  
  protected favoriteProduct(product: Product): void{
    const isLogged = this.userSessionService.isUserLogged();
    
    if(isLogged){
      this.favoriteService.addFavoriteItemAPI(product)
      .subscribe({
        next: (res) => this.toastNotificationService.showSuccess({title: 'Produto favoritado', message: 'Produto favoritado com sucesso'}),
        error: (err) => this.errorHandler(err)
      })
    }

    if(!isLogged){
      this.openModal();
    }
  }

  protected openModal(){
    this.isModalOpen.set(true);
  }

  protected closeModal(){
    this.isModalOpen.set(false);
  }

  protected closeModalWithClick(event: MouseEvent){
    return event.target == event.currentTarget && this.closeModal();
  }

  protected goToLogin(){
    this.closeModal();
    this.router.navigate(['/auth']);
  }
}
