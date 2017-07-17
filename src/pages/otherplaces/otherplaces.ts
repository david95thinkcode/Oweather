import { Component }                    from '@angular/core';
import { NavController }                from 'ionic-angular';
import { FirebaseListObservable, AngularFireDatabase }  from 'angularfire2/database';
import { IonicNativeGeoposition }                       from    '../../models/ionicnative-geoposition.model';
import { CapitalForecastPage }                          from    '../../pages/capitalforecast/capitalforecast';

@Component({
  selector: 'page-otherplaces',
  templateUrl: 'otherplaces.html'
})

export class OtherPlacePage {

 capitals: FirebaseListObservable<any>;  

  constructor(public navCtrl: NavController, af: AngularFireDatabase) {
    //PS: The list of countries capital is on Firebase
    //Loading capitals from firebase 
    //And putting it to variable "capitals"
    this.capitals = af.list('/capital');
  }

  /**Open CapitalForecastPage and pass into it the position on capital witch user select */
  showForecast(latitude: number, longitude: number, capitalname:string) {    
    let position: IonicNativeGeoposition = new IonicNativeGeoposition();    
    console.log("Location : " + latitude + " / " + longitude);
    position.latitude = latitude;
    position.longitude = longitude;
    this.navCtrl.push(CapitalForecastPage, {
      name: capitalname,
      position: position
    });
  }

}
