import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { providePrimeNG } from 'primeng/config';
import Aura from '@primeng/themes/aura';

import { routes } from './app.routes';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getAuth, provideAuth } from '@angular/fire/auth';
import { initializeAppCheck, ReCaptchaEnterpriseProvider, provideAppCheck } from '@angular/fire/app-check';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import { getFunctions, provideFunctions } from '@angular/fire/functions';
import { getStorage, provideStorage } from '@angular/fire/storage';
import { provideAnimations } from '@angular/platform-browser/animations';


export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideAnimations(),
    providePrimeNG({
      theme: {
        preset: Aura
      }
    }),
    provideFirebaseApp(() => initializeApp({
      projectId: process.env['NG_APP_PROJECT_ID'],
      appId: process.env['NG_APP_APP_ID'],
      storageBucket: process.env['NG_APP_STORAGE_BUCKET'],
      apiKey: process.env['NG_APP_API_KEY'],
      authDomain: process.env['NG_APP_AUTH_DOMAIN'],
      messagingSenderId: process.env['NG_APP_MESSAGING_SENDER_ID'],
      measurementId: process.env['NG_APP_MEASUREMENT_ID']
    })),
    provideAuth(() => getAuth()),
    // REMOVIDO AppCheck
    provideFirestore(() => getFirestore()),
    provideFunctions(() => getFunctions()),
    provideStorage(() => getStorage()),
  ]
};

