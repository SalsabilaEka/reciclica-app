import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PickupCallCardComponent } from '../components/pickup-call-card/pickup-call-card.component';
import { IonicModule } from '@ionic/angular';
import { ErrorMessageComponent } from '../components/error-message/error-message.component';

@NgModule({
  declarations: [
    // PickupCallCardComponent,
    ErrorMessageComponent
  ],
  imports: [
    CommonModule,
    IonicModule
  ],
  exports: [
    // PickupCallCardComponent,
    ErrorMessageComponent,
    IonicModule
  ]
})
export class SharedModule { }
