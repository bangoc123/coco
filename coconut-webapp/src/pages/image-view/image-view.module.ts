import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ImageViewPage } from './image-view';

@NgModule({
  declarations: [
    ImageViewPage,
  ],
  imports: [
    IonicPageModule.forChild(ImageViewPage),
  ],
})
export class ImageViewPageModule {}
