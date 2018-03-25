import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the ImageViewPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-image-view',
  templateUrl: 'image-view.html',
})
export class ImageViewPage {
  imageURL: string;
  constructor(public navCtrl: NavController, public navParams: NavParams) {
    console.log(navParams.data.image)
    this.imageURL = navParams.data.image
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ImageViewPage');
  }

}
