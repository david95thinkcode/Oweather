import { BrowserModule }                from '@angular/platform-browser';
import { ErrorHandler, NgModule }       from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';

import { MyApp }                        from './app.component';
import { HomePage }                     from '../pages/home/home';
import { ContactPage  }                 from  '../pages/contact/contact';
import { OtherPlacePage  }              from  '../pages/otherplaces/otherplaces'; 
import { CapitalForecastPage }          from  '../pages/capitalforecast/capitalforecast';

import { StatusBar }                    from '@ionic-native/status-bar';
import { SplashScreen }                 from '@ionic-native/splash-screen';
import { Geolocation }                  from '@ionic-native/geolocation';
import { Network }                      from '@ionic-native/network';
import { HttpClientModule }             from '@angular/common/http';
import { AngularFireModule }            from 'angularfire2';
import { AngularFireDatabaseModule, AngularFireDatabase } from 'angularfire2/database'; 

import { DarkSkyApiService }            from '../services/darkskyapi.service';
import { IonicNativeService}            from '../services/ionicnative.service'
import { firebase }                     from '../config/firebase'

import { ComponentsModule }            from '../components/components.module';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    ContactPage,
    OtherPlacePage,
    CapitalForecastPage
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    IonicModule.forRoot(MyApp),
    AngularFireModule.initializeApp(firebase),
    AngularFireDatabaseModule,
    ComponentsModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    ContactPage,
    OtherPlacePage,
    CapitalForecastPage,
  ],
  providers: [
    Geolocation,
    Network,
    DarkSkyApiService,
    IonicNativeService,
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
  ]
})
export class AppModule {}
