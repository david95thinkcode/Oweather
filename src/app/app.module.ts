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

import { HttpModule  }                  from "@angular/http";
import {  AngularFireModule }           from 'angularfire2';
import { AngularFireDatabaseModule, AngularFireDatabase } from 'angularfire2/database'; 
import { DarkSkyApiService }            from '../services/darkskyapi.service';
import { FirebaseProvider } from '../providers/firebase/firebase';

//AngularFire2 Settings
export const firebaseConfig = {
  apiKey: "AIzaSyAzM0s8ppPIARqhe3m4MPG7HJYVCCLJ1F4",
  authDomain: "oweather-526db.firebaseapp.com",
  databaseURL: "https://oweather-526db.firebaseio.com",
  projectId: "oweather-526db",
  storageBucket: "oweather-526db.appspot.com",
  messagingSenderId: "790818390879"
};

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
    IonicModule.forRoot(MyApp),
    AngularFireModule.initializeApp(firebaseConfig),
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
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    FirebaseProvider
  ]
})
export class AppModule {}
