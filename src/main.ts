import { bootstrapApplication } from '@angular/platform-browser';
import { App } from './app/app';
import { appConfig } from './app/app.config';   // 👈 import here
import { LucideAngularModule, Plus, Trash2, Check, X, Pencil, Save } from 'lucide-angular';
import { importProvidersFrom } from '@angular/core';
import { FormsModule } from '@angular/forms';


// bootstrapApplication(App, appConfig)
//   .catch((err) => console.error(err));

bootstrapApplication(App, {
  providers: [
    appConfig.providers,
    importProvidersFrom(
      FormsModule,
      LucideAngularModule.pick({ Plus, Trash2, Check, X, Pencil, Save })
    )
  ]
}).catch(err => {
  console.error('❌ Error bootstrapping the application:', err);
});