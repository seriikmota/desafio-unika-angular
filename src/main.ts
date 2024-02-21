/// <reference types="@angular/localize" />

import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';
import {environment} from "./environments/environment";
import {enableProdMode} from "@angular/core";

bootstrapApplication(AppComponent, appConfig)
  .catch((err) => console.error(err));

if (environment.production) {
  enableProdMode();
  console.log(environment.database)
}
else {
  console.log(environment.database)
}
