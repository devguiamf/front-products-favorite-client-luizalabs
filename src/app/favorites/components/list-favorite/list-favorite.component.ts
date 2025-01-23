import {
  AfterViewInit,
  Component,
  EventEmitter,
  inject,
  Input,
  OnChanges,
  OnInit,
  Output,
  signal,
  SimpleChanges,
  WritableSignal,
} from '@angular/core';
import { FavoriteItemComponent } from './favorite-item/favorite-item.component';
import { Favorite } from '../../../api/favorite';
import { ButtonComponent } from '../../../common/components/button/button.component';
import { InputComponent } from '../../../common/components/input/input.component';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'list-favorite-component',
  imports: [
    FavoriteItemComponent,
    ButtonComponent,
    InputComponent,
    ReactiveFormsModule,
  ],
  templateUrl: './list-favorite.component.html',
})
export class ListFavoriteComponent implements OnInit, OnChanges {
  @Input({ required: true }) favoriteList: Favorite | null = null;
  @Output('removeFavoriteItem') removeFavoriteItemEvent: EventEmitter<number> =
    new EventEmitter();
  @Output('editListFavorite') editFavoriteListEvent: EventEmitter<Favorite> =
    new EventEmitter();
  @Output('deleteListFavorite') deleteFavoriteListEvent: EventEmitter<string> =
    new EventEmitter();
  @Output('createListFavorite')
  createFavoriteListEvent: EventEmitter<Favorite> = new EventEmitter();
  private fb = inject(FormBuilder);
  protected isEditModalOpen: WritableSignal<boolean> = signal(false);
  protected isRemoveModalOpen: WritableSignal<boolean> = signal(false);
  protected isCreateModalOpen: WritableSignal<boolean> = signal(false);
  protected formFavorite!: FormGroup;

  ngOnInit(): void {
    this.initForm();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['favoriteList'].currentValue) {
      this.setValuesForm();
    }
  }

  private initForm() {
    this.formFavorite = this.fb.group({
      title: [this.favoriteList?.title ?? null, [Validators.required]],
      description: [this.favoriteList?.description ?? null],
    });
  }

  private setValuesForm() {
    this.favoriteList &&
    this.formFavorite.patchValue({
      title: this.favoriteList.title,
      description: this.favoriteList.description,
    });
  }

  protected openEditModal() {
    this.isEditModalOpen.set(true);
  }

  protected closeEditModal() {
    this.isEditModalOpen.set(false);
  }

  protected openRemoveModal() {
    this.isRemoveModalOpen.set(true);
  }

  protected closeRemoveModal() {
    this.isRemoveModalOpen.set(false);
  }

  protected openCreateModal() {
    this.isCreateModalOpen.set(true);
  }

  protected closeCreateModal() {
    this.isCreateModalOpen.set(false);
  }

  protected closeModalWithClick(event: MouseEvent) {
    event.target == event.currentTarget &&
      (this.closeEditModal(), this.closeRemoveModal());
  }

  protected editListFavorite() {
    if (!this.favoriteList) return;
    Object.assign(this.favoriteList, this.formFavorite.value);
    this.editFavoriteListEvent.emit(this.favoriteList);
    this.closeEditModal();
  }

  protected removeListFavorite() {
    if (!this.favoriteList) return;
    this.deleteFavoriteListEvent.emit(this.favoriteList.userId);
    this.formFavorite.reset
    this.closeRemoveModal();
  }

  protected createListFavorite() {
    this.createFavoriteListEvent.emit(this.formFavorite.value);
    this.closeCreateModal();
  }

  protected removeFavoriteItem(idProduct: number) {
    this.removeFavoriteItemEvent.emit(idProduct);
  }
}
