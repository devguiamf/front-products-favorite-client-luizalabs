import { Component, inject, OnInit } from '@angular/core';
import { ListFavoriteComponent } from './components/list-favorite/list-favorite.component';
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
  providers: [FavoritesService, UserSessionService, ToastNotificationService],
})
export class FavoritesPage implements OnInit {
  private favoritesService = inject(FavoritesService);
  private favorite$ = this.favoritesService.observeFavoriteList();
  private userSessionService = inject(UserSessionService);
  private toastNotificationService = inject(ToastNotificationService);
  private destroy$ = new Subject();
  protected favorite: Favorite | null = null;
  protected loading: boolean = false;

  ngOnInit(): void {
    if (this.userSessionService.isUserLogged()) {
      this.favoritesService.loadFavoriteList(this.userSessionService.userId);
    }

    this.observeFavoriteList();
  }

  private handlerError(error: HttpErrorResponse) {
    const errorServer = error.status >= 500 || error.status === 0;
    this.toastNotificationService.showError({
      title: errorServer ? 'Algo deu errado... Tente novamente mais tarde' : (error.error.message || 'Erro desconhecido'),
    });
  }

  private observeFavoriteList() {
    this.favorite$
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (res) => {
          this.favorite = res;
        },
        error: (err) => {
          this.handlerError(err);
          this.favorite = null;
        },
    });
  }

  protected get isLogged(): boolean {
    return this.userSessionService.isUserLogged();
  }

  protected createListFavorite(favorite: Favorite) {
    const idUser = this.userSessionService.userId;
    const favoriteList = {
      userId: idUser,
      title: favorite.title,
      description: favorite.description,
    };

    this.favoritesService.createFavoriteListAPI(favoriteList).subscribe({
      next: (res) => {
        this.favoritesService.loadFavoriteList(this.userSessionService.userId);
        this.toastNotificationService.showSuccess({
          title: 'Lista criada',
          message: 'Lista criada com sucesso',
        });
      },
      error: (err) => this.handlerError(err),
    });
  }

  protected removeFavoriteItem(productId: number) {
    this.favoritesService
      .unfavoriteProductAPI(this.userSessionService.userId, productId)
      .subscribe({
        next: (res) => {
          this.toastNotificationService.showInfo({
            title: 'Produto removido',
            message: 'Produto removido com sucesso',
          });
        },
        error: (err) => this.handlerError(err),
      });
  }

  protected editFavoriteList(favorite: Favorite) {
    this.favoritesService.updateFavoriteListAPI(favorite).subscribe({
      next: (res) => {
        this.favoritesService.loadFavoriteList(this.userSessionService.userId);
        this.toastNotificationService.showSuccess({
          title: 'Lista editada',
          message: 'Lista editada com sucesso',
        });
      },
      error: (err) => this.handlerError(err),
    });
  }

  protected deleteFavoriteList(id: string) {
    this.favoritesService.deleteFavoriteListAPI(id).subscribe({
      next: (res) => {
        this.toastNotificationService.showInfo({
          title: 'Lista removida',
          message: 'Lista removida com sucesso',
        });
        this.favoritesService.loadFavoriteList(this.userSessionService.userId);
      },
      error: (err) => this.handlerError(err),
    });
  }
}
