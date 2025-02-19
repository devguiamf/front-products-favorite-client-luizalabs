import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideHttpClient } from '@angular/common/http';
import { provideToastr } from 'ngx-toastr';
import { provideAnimations } from '@angular/platform-browser/animations';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }), 
    provideAnimations(),
    provideRouter(routes),
    provideHttpClient(),
    provideToastr({
      closeButton: true,
      progressAnimation: 'decreasing',
      preventDuplicates: true,
    }),
  ]
};
