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
  
  //Array to stock icon class
  icon_class: string[];
  defaultLang: string;
  currentPosition: IonicNativeGeoposition = new IonicNativeGeoposition();
  currentForecast: DarkSkyApiDataPoint = new DarkSkyApiDataPoint();
  dailyForcastFornextWeek: DarkSkyApiDataBlock = new DarkSkyApiDataBlock();
  
  response: DarkSkyApiResponse = new DarkSkyApiResponse();

  constructor(public navCtrl: NavController, private geolocation: Geolocation, private darkSkyApiService: DarkSkyApiService) {
    this.defaultLang = "fr";
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
      
      //Removing the first data cause it's not for the next week 
      this.dailyForcastFornextWeek.data.splice(0,1);
      
      //this.hydrateDayProperty(this.dailyForcastFornextWeek);
      this.dailyForcastFornextWeek.data.forEach((element,index) => {       
        this.hydrateDayProperty(index, element)
        this.setIconToEachForecast(element);
        //element.css_icon_class = "derf"
      });
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

  /** FIll the property day of Forecast object with a 
   * readable day of week */
  private hydrateDayProperty(index: number, day: DarkSkyApiDataPoint) {
    
    switch (this.defaultLang) {
      case "en":
        switch (index) {
          case 0:
            day.readableday = "Monday";
            break;
          case 1:
            day.readableday = "Tuesday";
            break;
          case 2:
            day.readableday = "Wednesday"
            break;
          case 3:
            day.readableday = "Thusday";
            break;
          case 4:
            day.readableday = "Friday";
            break;
          case 5:
            day.readableday = "Saturday";
            break;
          case 6:
            day.readableday = "Sunday";
            break;
          default:
            break;
        }        
      break;
      case "fr":
        switch (index) {
          case 0:
            day.readableday = "Lundi";
            break;
          case 1:
            day.readableday = "Mardi";
            break;
          case 2:
            day.readableday = "Mercredi";
            break;
          case 3:
            day.readableday = "Jeudi";
            break;
          case 4:
            day.readableday = "Vendredi";
            break;
          case 5:
            day.readableday = "Samedi";
            break;
          case 6:
            day.readableday = "Dimanche";
            break;
          default:
            break;
        }
        break; // fr
    
    //default language
      default:
        break;
    }
    
  }

  /**Fill the property icon_class with the right icon css class 
   * The css class is refered to weather-icon.css
  */
  private setIconToEachForecast(element: DarkSkyApiDataPoint, ) {
    switch (element.icon) {
      case "clear-day":
         element.css_icon_class = "sunny";
        break;
      case "clear-night":
        element.css_icon_class = "moon";
        break;
      case "rain":
        element.css_icon_class = "rainy";
        break;
      case "snow":
        element.css_icon_class = "snow";
        break;
      case "sleet":
        element.css_icon_class = "";
        break;
      case "wind":
        element.css_icon_class = "";
        break;
      case "fog":
        element.css_icon_class = "";
        break;
      case "cloudy":
        element.css_icon_class = "cloudy";
        break;
      case "partly-cloudy-day":
        element.css_icon_class = "partly-sunny";
        break;
      case "partly-cloudy-night":
        element.css_icon_class = "cloudy-night";
        break;
      case "hail":
        element.css_icon_class = "";
        break;
      case "thunderstorm":
        element.css_icon_class = "thunderstorm";
        break;
      case "tornado":
        element.css_icon_class = "";
        break;
      default:
        break;
    }
  }
}
