import { BrowserModule }                from '@angular/platform-browser';
import { ErrorHandler, NgModule }       from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';

import { MyApp }                        from './app.component';
import { HomePage }                     from '../pages/home/home';
import { NextWeekPage }                 from '../pages/nextweek/nextweek';
import { ContactPage  }                 from  '../pages/contact/contact';
import { OtherPlacePage  }              from  '../pages/otherplaces/otherplaces'; 
import { CapitalForecastPage }          from  '../pages/capitalforecast/capitalforecast';

import { StatusBar }                    from '@ionic-native/status-bar';
import { SplashScreen }                 from '@ionic-native/splash-screen';
import { Geolocation }                  from '@ionic-native/geolocation';

import { HttpClientModule }             from '@angular/common/http';

import { HttpModule  }                  from "@angular/http";
import {  AngularFireModule }           from 'angularfire2';
import { AngularFireDatabaseModule, AngularFireDatabase } from 'angularfire2/database'; 
import { DarkSkyApiService }            from '../services/darkskyapi.service';
import { IonicNativeService}            from '../services/ionicnative.service'
import { firebase }                     from '../config/firebase'

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    NextWeekPage,
    ContactPage,
    OtherPlacePage,
    CapitalForecastPage
  ],
  imports: [
    HttpModule,
    BrowserModule,
    HttpClientModule ,
    IonicModule.forRoot(MyApp),
    AngularFireModule.initializeApp(firebase),
    AngularFireDatabaseModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    NextWeekPage,
    ContactPage,
    OtherPlacePage,
    CapitalForecastPage
  ],
  providers: [
    Geolocation,
    DarkSkyApiService,
    IonicNativeService,
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
  ]
})
export class AppModule {}
