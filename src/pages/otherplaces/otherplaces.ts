import { Component }                    from '@angular/core';
import { NavController }                from 'ionic-angular';

import { IonicNativeGeoposition }       from    '../../models/ionicnative-geoposition.model';
import { CapitalForecastPage }          from    '../../pages/capitalforecast/capitalforecast';
import { Observable }                   from "rxjs/Observable";
import { CAPITALS }                     from   '../../config/capitals';

@Component({
  selector: 'page-otherplaces',
  templateUrl: 'otherplaces.html'
})

export class OtherPlacePage {
  
  capitals : any;

  constructor(public navCtrl: NavController) {
    this.capitals = CAPITALS;
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
