import { Component }                    from '@angular/core';
import { NavController }                from 'ionic-angular';
import { FirebaseListObservable, AngularFireDatabase } from 'angularfire2/database';

@Component({
  selector: 'page-otherplaces',
  templateUrl: 'otherplaces.html'
})

export class OtherPlacePage {

 capitals: FirebaseListObservable<any>;   

  constructor(public navCtrl: NavController, af: AngularFireDatabase) {
    
    //Loading capitals from firebase 
    //And putting it to variable "capitals"
    this.capitals = af.list('/capital');
    
    console.log(this.capitals);
  }

  /**SHOW FORECAST ABOUT LOCATION RECEIVED IN PARAMETERS */
  showForecast(latitude: number, longitude: number) {
    console.log("Location : " + latitude + " / " + longitude);
  }

}
