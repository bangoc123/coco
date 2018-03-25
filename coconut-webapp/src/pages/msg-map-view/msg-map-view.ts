import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
/**
 * Generated class for the MsgMapViewPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage({
  segment: 'msgmap/:type/:id/:center/:zoom'
})
@Component({
  selector: 'page-msg-map-view',
  templateUrl: 'msg-map-view.html',
})
export class MsgMapViewPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {

  }

  ionViewDidLoad() {
    console.log(this.navParams.data);
    console.log('ionViewDidLoad MsgMapViewPage');
  }

}
