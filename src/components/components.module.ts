import { NgModule } 			from '@angular/core';
import { IonicModule } 			from 'ionic-angular';
import { FormsModule } 			from '@angular/forms';
import { ForecastComponent } 	from './forecast/forecast';
import { OfflineMessageComponent } from './offline-message/offline-message';
@NgModule({
	declarations: [ForecastComponent,
    OfflineMessageComponent],
	imports: [
		IonicModule,
		FormsModule
	],
	exports: [ForecastComponent,
    OfflineMessageComponent]
})
export class ComponentsModule {}
