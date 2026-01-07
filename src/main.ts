import { bootstrapApplication } from '@angular/platform-browser';
import { RouteReuseStrategy, provideRouter, withPreloading, PreloadAllModules } from '@angular/router';
import { IonicRouteStrategy, provideIonicAngular } from '@ionic/angular/standalone';

//ionic storage for saving user preferances- REF:class materials wk10
import {IonicStorageModule} from '@ionic/storage-angular'

//Needed to use IonicStorageModule in providers - REF:https://angular.io/api/core/importProvidersFrom
import {importProvidersFrom} from '@angular/core';

import { routes } from './app/app.routes';
import { AppComponent } from './app/app.component';

bootstrapApplication(AppComponent, {
  providers: [
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    provideIonicAngular(),
    provideRouter(routes, withPreloading(PreloadAllModules)),
    //Initialize Ionic Storage so it stores measument preferance between sessions
importProvidersFrom(IonicStorageModule.forRoot()) //IonicStorageModule.forRoot() set up storage 
  ],
});
