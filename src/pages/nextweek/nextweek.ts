import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import { Geolocation }                      from '@ionic-native/geolocation';

import { DarkSkyApiResponse }               from '../../models/darkskyapi-response.model';
import { DarkSkyApiDataPoint }              from '../../models/darkskyapi-datapoint.model';
import { DarkSkyApiDataBlock }              from '../../models/darkskyapi-datablock.model';
import { IonicNativeGeoposition }           from '../../models/ionicnative-geoposition.model';

import { DarkSkyApiService }                from '../../services/darkskyapi.service';

@Component({
  selector: 'page-nextweek',
  templateUrl: 'nextweek.html'
})
export class NextWeekPage {
  currentPosition: IonicNativeGeoposition = new IonicNativeGeoposition();
  currentForecast: DarkSkyApiDataPoint = new DarkSkyApiDataPoint();
  dailyForcastFornextWeek: DarkSkyApiDataBlock = new DarkSkyApiDataBlock();
  
  response: DarkSkyApiResponse = new DarkSkyApiResponse();

  constructor(public navCtrl: NavController, private geolocation: Geolocation, private darkSkyApiService: DarkSkyApiService) {
    
    this.getCurrentPosition();
    this.darkSkyApiService.getCurrentForecast(this.currentPosition)
    .then(fetched =>  {
      this.response = fetched;
      this.hydrate();
    });    
  }

  /** Put value inside response to hydrate declared objects*/
  private hydrate() {
      this.currentForecast = this.response.currently;
      this.currentForecast.placeName = this.response.timezone;
      this.dailyForcastFornextWeek = this.response.daily;
      //On retire le premier élement car ce dernier représente les prévision actuelles
      this.dailyForcastFornextWeek.data.splice(0,1);
      console.log(this.dailyForcastFornextWeek);
  }

  /** Use Native Gelolcation to get device geoposition */
  private getCurrentPosition() {
    
    this.geolocation.getCurrentPosition()
    .then((response) => {
      this.currentPosition.accuracy = response.coords.accuracy;
      this.currentPosition.altitude = response.coords.altitude;
      this.currentPosition.longitude = response.coords.longitude;
      this.currentPosition.latitude = response.coords.latitude;
      this.currentPosition.speed = response.coords.speed;
      this.currentPosition.heading = response.coords.heading;
      this.currentPosition.altitudeAccuracy = response.coords.altitudeAccuracy;
    })
    .catch((error) => {
      console.log('Error getting location ==> ', error);
    })

  }
}
