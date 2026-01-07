import { bootstrapApplication } from '@angular/platform-browser';
import { App } from './app/app';
import { provideFirebaseApp, initializeApp } from '@angular/fire/app';
import { provideFirestore, getFirestore } from '@angular/fire/firestore';
import { environment } from './environments/environment';
import { LOCALE_ID } from '@angular/core';
import { registerLocaleData } from '@angular/common';
import localeEs from '@angular/common/locales/es';

// Registrar el locale en español
registerLocaleData(localeEs);

bootstrapApplication(App, {
providers: [
provideFirebaseApp(() => initializeApp(environment.firebase)),
provideFirestore(() => getFirestore()),
{ provide: LOCALE_ID, useValue: 'es' }
]
});