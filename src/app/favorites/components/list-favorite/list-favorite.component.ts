import { Component, EventEmitter, inject, Input, OnInit, Output, signal, WritableSignal } from '@angular/core';
import { FavoriteItemComponent } from "./favorite-item/favorite-item.component";
import { Favorite } from '../../../api/favorite';
import { ButtonComponent } from "../../../common/components/button/button.component";
import { InputComponent } from "../../../common/components/input/input.component";
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'list-favorite-component',
  imports: [FavoriteItemComponent, ButtonComponent, InputComponent, ReactiveFormsModule],
  templateUrl: './list-favorite.component.html'
})
export class ListFavoriteComponent implements OnInit {
  @Input() favoriteList!: Favorite;
  @Output() removeFavoriteItem: EventEmitter<string> = new EventEmitter();
  @Output('editListFavorite') editFavoriteListEvent: EventEmitter<Favorite> = new EventEmitter();
  @Output('removeListFavorite') removeFavoriteListEvent: EventEmitter<string> = new EventEmitter();
  private fb = inject(FormBuilder);
  protected isEditModalOpen: WritableSignal<boolean> = signal(false);
  protected isRemoveModalOpen: WritableSignal<boolean> = signal(false);
  protected formFavorite!: FormGroup;

  ngOnInit(): void {
    this.initForm();
  }

  private initForm() {
    this.formFavorite = this.fb.group({
      title: [this.favoriteList.title ?? null, [Validators.required]],
      description: [this.favoriteList.description ?? null],
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

  protected closeModalWithClick(event: MouseEvent) {
    event.target == event.currentTarget && (this.closeEditModal(), this.closeRemoveModal());
  }

  protected editListFavorite() {
    this.editFavoriteListEvent.emit(this.formFavorite.value);
    this.closeEditModal();
  }

  protected removeListFavorite() {
    this.removeFavoriteListEvent.emit(this.favoriteList.id);
    this.closeRemoveModal();
  }
}
