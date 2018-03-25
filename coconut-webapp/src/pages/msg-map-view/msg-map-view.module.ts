import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MsgMapViewPage } from './msg-map-view';

@NgModule({
  declarations: [
    MsgMapViewPage,
  ],
  imports: [
    IonicPageModule.forChild(MsgMapViewPage),
  ],
})
export class MsgMapViewPageModule {}
