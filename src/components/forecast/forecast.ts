import {Component, OnInit} from '@angular/core';
import {NavController} from 'ionic-angular';

import {DarkSkyApiResponse} from '../../models/darkskyapi-response.model';
import {DarkSkyApiDataPoint} from '../../models/darkskyapi-datapoint.model';
import {DarkSkyApiDataBlock} from '../../models/darkskyapi-datablock.model';
import {IonicNativeGeoposition} from '../../models/ionicnative-geoposition.model';
import {OtherPlacePage} from '../../pages/otherplaces/otherplaces';
import {Network} from '@ionic-native/network';
import {IonicNativeService} from '../../services/ionicnative.service';
import {DarkSkyApiService} from '../../services/darkskyapi.service';
import {CONVERSION} from "../../shared/conversion.module";

/**
 * Generated class for the ForecastComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({selector: 'forecast', templateUrl: 'forecast.html'})
export class ForecastComponent {

  online : boolean = false;
  response : DarkSkyApiResponse = new DarkSkyApiResponse();
  currentPosition : IonicNativeGeoposition = new IonicNativeGeoposition();
  currentForecast : DarkSkyApiDataPoint = new DarkSkyApiDataPoint();
  hourlyForcastFornextTwoDays : DarkSkyApiDataBlock = new DarkSkyApiDataBlock();
  forecastimage : string; //will store the location forecast picture

  // connectSubscription = this
  //   .network
  //   .onConnect()
  //   .subscribe(() => {
  //     console.log('network connected!');
  //     // We just got a connection but we need to wait briefly before we determine the
  //     // connection type. Might need to wait. prior to doing any api requests as well.
  //     setTimeout(() => {
  //       if (this.network.type === 'wifi') {
  //         console.log('we got a wifi connection, woohoo!');
  //       }
  //     }, 3000);
  //   });

  // // watch network for a disconnect
  // disconnectSubscription = this
  //   .network
  //   .onDisconnect()
  //   .subscribe(() => {
  //     console.log('network was disconnected :-(');
  //   });

  // // stop disconnect watch
  // disconnectSubscription.unsubscribe();

  constructor(public navCtrl : NavController, private darkSkyApiService : DarkSkyApiService, private ionicnativeservice : IonicNativeService, private network : Network) {}

  ngOnInit() {
    console.log("Etat de la connexion : ");
    console.log(this.network.type);
    if (this.online) {
      this.getForecast();
    }
  }

  /** Check the network state */
  checkNetwork() {
    // let networkState = this.network.type; if (networkState == 'none') {
    // this.online = false; } else {   this.online = true; }
  }

  getForecast() {
    this.ionicnativeservice.loadCurrentLocation()
      .then(fetched => {
        this.currentPosition = fetched as IonicNativeGeoposition;
        this
          .darkSkyApiService
          .getCurrentForecast(this.currentPosition)
          .subscribe((data) => {
            this.hydrate(data);
            // Two behind is not working yet
            this.setImageToForecast(data.currently.icon);
            //console.log(this.forecastimage)
          }, error => {
            console.log('Something were wrong');
          })
      });

  }

  /** Put required values inside response to hydrate declared objects*/
  private hydrate(response : DarkSkyApiResponse) {
    this.currentForecast = response.currently;
    // console.log(this.currentForecast)
    this.currentForecast.apparentTemperature = CONVERSION.convertToCelsius(this.currentForecast.apparentTemperature);
    this.currentForecast.temperature = CONVERSION.convertToCelsius(this.currentForecast.temperature);
    this.currentForecast.placeName = this.response.timezone;
    this.hourlyForcastFornextTwoDays = this.response.hourly;

    //console.log(this.hourlyForcastFornextTwoDays)
  }

  /**Set the right picture location to forecasimage according to the iconstring */
  private setImageToForecast(iconstring : string) {
    switch (iconstring) {
      case "clear-day":
        this.forecastimage = "assets/img/cleary-day.png"
        //this.forecastimage = "assets/img/sunny.png";
        break;
      case "clear-night":
        this.forecastimage = "";
        break;
      case "rain":
        this.forecastimage = "assets/img/rainy.png";
        break;
      case "snow":
        this.forecastimage = "assets/img/snow.png";
        break;
      case "sleet":
        this.forecastimage = "assets/img/sleet.png";
        break;
      case "wind":
        this.forecastimage = "";
        break;
      case "fog":
        this.forecastimage = "";
        break;
      case "cloudy":
        this.forecastimage = "assets/img/cloudy-day.png";
        break;
      case "partly-cloudy-day":
        this.forecastimage = "assets/img/partial-sunny.png";
        break;
      case "partly-cloudy-night":
        this.forecastimage = "assets/img/cloud.png";
        break;
      case "hail":
        this.forecastimage = "";
        break;
      case "thunderstorm":
        this.forecastimage = "assets/img/thunderstorm.png";
        break;
      case "tornado":
        this.forecastimage = "";
        break;
      default:
        break;
    }
  }

  /**
   * SHow the page with all capitals list
   */
  public showOtherLocations() {
    this
      .navCtrl
      .push(OtherPlacePage);
  }

}
