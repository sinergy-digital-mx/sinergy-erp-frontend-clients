import { ApplicationConfig, provideBrowserGlobalErrorListeners } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { providePrimeNG } from 'primeng/config';
import Aura from '@primeuix/themes/aura';
import { definePreset } from '@primeuix/styled';


import { routes } from './app.routes';
import { HTTP_INTERCEPTORS, provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { InterceptorService } from './core/services/interceptor.service';

const MyPreset = definePreset(Aura, {
  semantic: {
    primary: {
      50: '{blue.50}',
      100: '{blue.100}',
      200: '{blue.200}',
      300: '{blue.300}',
      400: '{blue.400}',
      500: '#0046FF',
      600: '#003FEA',
      700: '#0038E0',
      800: '{blue.800}',
      900: '{blue.900}',
      950: '{blue.950}',
    }
  }
});

export const appConfig: ApplicationConfig = {
  providers: [
    provideAnimationsAsync(),
    providePrimeNG({
      theme: {
        preset: MyPreset,
        options: {
          darkModeSelector: false || 'none'
        }
      }
    }),
    provideBrowserGlobalErrorListeners(),
    {
      provide: HTTP_INTERCEPTORS,
      useClass: InterceptorService,
      multi: true,
    },
    provideHttpClient(withInterceptorsFromDi()),
    provideRouter(routes)
  ]
};
