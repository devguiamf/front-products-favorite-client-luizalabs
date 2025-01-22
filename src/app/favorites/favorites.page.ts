import { Component, inject, OnInit } from '@angular/core';
import { ListFavoriteComponent } from "./components/list-favorite/list-favorite.component";
import { Favorite } from '../api/favorite';
import { FavoritesService } from './services/favorites.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Subject, take, takeUntil } from 'rxjs';
import { UserSessionService } from '../common/services/user-session/user-session.service';
import { ToastNotificationService } from '../common/services/toast-notification/toast-notification.service';

@Component({
  selector: 'app-favorites',
  imports: [ListFavoriteComponent],
  templateUrl: './favorites.page.html',
  providers: [FavoritesService, UserSessionService, ToastNotificationService]
})
export class FavoritesPage implements OnInit{
  
  private favoritesService = inject(FavoritesService);
  private favorite$ = this.favoritesService.observeFavoriteList()
  private userSessionService = inject(UserSessionService);
  private toastNotificationService = inject(ToastNotificationService);
  private destroy$ = new Subject();
  protected favorite!: Favorite;
  protected loading: boolean = false;

  ngOnInit(): void {
    if(this.userSessionService.userId) {
      this.favoritesService.loadFavoriteList(this.userSessionService.userId);
    }
  
    this.observeFavoriteList();
  }
  
  private handlerError(error: HttpErrorResponse){
    this.toastNotificationService.showError({title: 'Ops...', message: error.message})
  }

  private observeFavoriteList(){
    this.favorite$
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (res) => this.favorite = Object.keys(res).length ? res : null as unknown as Favorite,
        error: (err) => this.handlerError(err)
      })
  }

  protected get isLogged(): boolean {
    return this.userSessionService.isUserLogged();
  }

  protected removeFavoriteItem(productId: string){
    this.favoritesService.unfavoriteProductAPI(this.userSessionService.userId, productId)
      .subscribe({
        next: (res) => {
          this.toastNotificationService.showInfo({title: 'Produto removido', message: 'Produto removido com sucesso'})
        },
        error: (err) => this.handlerError(err)
      })
  }



  protected editFavoriteList(favorite: Favorite){
    this.favoritesService.updateFavoriteListAPI(favorite)
      .subscribe({
        next: (res) => {
          this.favoritesService.loadFavoriteList(this.userSessionService.userId);
          this.toastNotificationService.showSuccess({title: 'Lista editada', message: 'Lista editada com sucesso'})
        },
        error: (err) => this.handlerError(err)
      })
  }

  protected removeFavoriteList(id: string){
    this.favoritesService.deleteFavoriteListAPI(id)
      .subscribe({
        next: (res) => {
          this.favoritesService.loadFavoriteList(this.userSessionService.userId);
          this.toastNotificationService.showInfo({title: 'Lista removida', message: 'Lista removida com sucesso'})
        },
        error: (err) => this.handlerError(err)
      })
  }

}
