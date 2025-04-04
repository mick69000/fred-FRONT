import { bootstrapApplication } from '@angular/platform-browser';
import { provideAnimations } from '@angular/platform-browser/animations';
import 'reflect-metadata';
import { AppComponent } from './app/app.component';
import { CommonModule, registerLocaleData } from '@angular/common';
import * as fr from '@angular/common/locales/fr';
import { defineCustomElements } from 'wcs-core/loader';
import { provideHttpClient } from '@angular/common/http';
import { provideRouter } from '@angular/router';
import { routes } from './app/app.routes';
import { CalendarModule, DateAdapter } from 'angular-calendar';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';

registerLocaleData(fr.default);
defineCustomElements();

const calendarProviders =
  CalendarModule.forRoot({
    provide: DateAdapter,
    useFactory: adapterFactory,
  }).providers ?? [];

bootstrapApplication(AppComponent, {
  providers: [
    provideHttpClient(),
    provideRouter(routes),
    provideAnimations(),
    ...calendarProviders,
  ],
}).catch((err) => console.error(err));
