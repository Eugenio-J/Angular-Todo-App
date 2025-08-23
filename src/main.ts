import { bootstrapApplication } from '@angular/platform-browser';
import { App } from './app/app';
import { appConfig } from './app/app.config';   // 👈 import here
import { provideRouter } from '@angular/router';
import { routes } from './app/app.routes';

bootstrapApplication(App, appConfig)
  .catch((err) => console.error(err));
