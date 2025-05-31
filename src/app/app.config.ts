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
      projectId: "gestao-financeira-33d24",
      appId: "1:159318331490:web:637fe7b75fa2be63d5413b",
      storageBucket: "gestao-financeira-33d24.appspot.com",
      apiKey: "AIzaSyC4pA5dqq87kWVVRSUoiozVa0rErm5oxsA",
      authDomain: "gestao-financeira-33d24.firebaseapp.com",
      messagingSenderId: "159318331490",
      measurementId: "G-D45MX8EMN9"
    })),
    provideAuth(() => getAuth()),
    // REMOVIDO AppCheck
    provideFirestore(() => getFirestore()),
    provideFunctions(() => getFunctions()),
    provideStorage(() => getStorage()),
  ]
};

