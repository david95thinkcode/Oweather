import { Component, OnInit }                            from    '@angular/core';
import { NavController }                        from    'ionic-angular';
import { Geolocation }                          from    '@ionic-native/geolocation';

import { DarkSkyApiResponse }                   from    '../../models/darkskyapi-response.model';
import { DarkSkyApiDataPoint }                  from    '../../models/darkskyapi-datapoint.model';
import { DarkSkyApiDataBlock }                  from    '../../models/darkskyapi-datablock.model';
import { IonicNativeGeoposition }               from    '../../models/ionicnative-geoposition.model';
import { OtherPlacePage }                       from    '../../pages/otherplaces/otherplaces';

import { IonicNativeService }                   from    '../../services/ionicnative.service';
import { DarkSkyApiService }                    from    '../../services/darkskyapi.service';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})

export class HomePage implements OnInit {

  currentPosition: IonicNativeGeoposition = new IonicNativeGeoposition();
  currentForecast: DarkSkyApiDataPoint = new DarkSkyApiDataPoint();
  hourlyForcastFornextTwoDays: DarkSkyApiDataBlock = new DarkSkyApiDataBlock();
  response: DarkSkyApiResponse = new DarkSkyApiResponse();
  forecastimage: string; //will store the location forecast picture

  constructor(public navCtrl: NavController,
    private geolocation: Geolocation,
    private darkSkyApiService: DarkSkyApiService,
    private ionicnativeservice:IonicNativeService) {}
    
  ngOnInit() {
    this.getForecast(); 
  }

  getForecast() {
    this.ionicnativeservice.loadCurrentLocation()
    .then(fetched => { 
      this.currentPosition = fetched as IonicNativeGeoposition;
      this.darkSkyApiService.getCurrentForecast(this.currentPosition)
      .subscribe(
        (data) => {
          //console.log(data);
          this.hydrate(data);
          this.setIconToForecast(data.currently.icon);
      },
      error => {
        console.log('Something were wrong');
      })
    });

  }

  /** Put required values inside response to hydrate declared objects*/
  private hydrate(response: any) {
      this.currentForecast = response.currently;
      this.currentForecast.apparentTemperature = this.convertToCelsius(this.currentForecast.apparentTemperature);
      this.currentForecast.temperature = this.convertToCelsius(this.currentForecast.temperature);
      this.currentForecast.placeName = this.response.timezone;
      this.hourlyForcastFornextTwoDays = this.response.hourly;
  }

  /**Set the right picture location to forecasimage according to the iconstring */
  private setIconToForecast(iconstring: string ) {
    switch (iconstring) {
      case "clear-day":
         this.forecastimage = "assets/img/sunny.png";
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
    this.navCtrl.push(OtherPlacePage);
  }

  public convertToCelsius(fahrenheitValue: number): number {
    let celsiusValue: number;
    celsiusValue = (fahrenheitValue - 32) / 1.8;
    
    return celsiusValue;
  } 

  public convertToFahrenheit(Celsius: number): number {
    let fahr:number;
    fahr = (Celsius * 1.8) + 32;

    return fahr;
  }

}
