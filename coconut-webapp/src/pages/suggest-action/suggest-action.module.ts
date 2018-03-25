import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SuggestActionPage } from './suggest-action';

@NgModule({
  declarations: [
    SuggestActionPage,
  ],
  imports: [
    IonicPageModule.forChild(SuggestActionPage),
  ],
})
export class SuggestActionPageModule {}
