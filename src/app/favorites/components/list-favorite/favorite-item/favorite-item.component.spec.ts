import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FavoriteItemComponent } from './favorite-item.component';

describe('FavoriteItemComponent', () => {
  let component: FavoriteItemComponent;
  let fixture: ComponentFixture<FavoriteItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FavoriteItemComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FavoriteItemComponent);
    component = fixture.componentInstance;
    component.favoriteItem = { image: 'path/to/image.jpg',id: 'asdasd', title: 'Product 1', price: 100, productApiId: 1 };
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
