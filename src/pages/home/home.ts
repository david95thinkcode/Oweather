import { Component, OnInit }                    from    '@angular/core';
import { NavController }                        from    'ionic-angular';
import { IonicNativeGeoposition }               from    '../../models/ionicnative-geoposition.model';
import { IonicNativeService }                   from    '../../services/ionicnative.service';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})

export class HomePage implements OnInit {

  constructor(public navCtrl: NavController, private ionicnativeservice:IonicNativeService) {}

  ngOnInit() {
    
  }
}
