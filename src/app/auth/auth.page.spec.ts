import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AuthPage } from './auth.page';
import { ToastrModule } from 'ngx-toastr';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('AuthPage', () => {
  let component: AuthPage;
  let fixture: ComponentFixture<AuthPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AuthPage,ToastrModule.forRoot(), HttpClientTestingModule],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: {
            params: of({ id: '123' }), // Simula parâmetros de rota
            queryParams: of({ returnUrl: '/home' }), // Simula query params
          },
        },
      ],
    })
    .compileComponents();

    fixture = TestBed.createComponent(AuthPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
