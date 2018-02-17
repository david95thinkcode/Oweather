import { Component, OnInit } from '@angular/core';
import { AppMessage }        from    '../../models/app-message.model';

/**
 * Generated class for the OfflineMessageComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'offline-message',
  templateUrl: 'offline-message.html'
})

export class OfflineMessageComponent implements OnInit {

  message: AppMessage = new AppMessage();

  constructor(){
    console.log('Hello OfflineMessageComponent Component');
  }

  ngOnInit() {
    this.message.UseNotConnectedMessage();
  }

}
