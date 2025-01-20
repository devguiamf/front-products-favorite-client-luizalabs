import { TestBed } from '@angular/core/testing';

import { ToastNotificationService } from './toast-notification.service';
import { ProductComponent } from '../../../products/components/list-products/product/product.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ToastrModule } from 'ngx-toastr';

describe('ToastNotificationService', () => {
  let service: ToastNotificationService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        ToastrModule.forRoot(), // Adicione o módulo Toastr
      ],
    }).compileComponents();
    service = TestBed.inject(ToastNotificationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
