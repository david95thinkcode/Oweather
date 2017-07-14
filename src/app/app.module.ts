import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { NextWeekPage } from '../pages/nextweek/nextweek';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { Geolocation }                from '@ionic-native/geolocation';

import { HttpModule  }                from "@angular/http";
import { DarkSkyApiService }          from '../services/darkskyapi.service';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    NextWeekPage
  ],
  imports: [
    HttpModule,
    BrowserModule,
    IonicModule.forRoot(MyApp),
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    NextWeekPage
  ],
  providers: [
    Geolocation,
    DarkSkyApiService,
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
