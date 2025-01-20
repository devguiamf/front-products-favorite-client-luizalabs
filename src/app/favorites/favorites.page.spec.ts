import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FavoritesPage } from './favorites.page';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ToastrModule } from 'ngx-toastr';

describe('FavoritesPage', () => {
  let component: FavoritesPage;
  let fixture: ComponentFixture<FavoritesPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FavoritesPage, HttpClientTestingModule, ToastrModule.forRoot()],
    })
    .compileComponents();

    fixture = TestBed.createComponent(FavoritesPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
