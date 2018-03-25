import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { Http, Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';

@IonicPage()
@Component({
  selector: 'page-suggest-action',
  templateUrl: 'suggest-action.html',
})
export class SuggestActionPage {
  action = {
    name: "",
    content: "",
    area: []
  }
  token: any;
  constructor(public navCtrl: NavController, public navParams: NavParams, public http: Http, public toastCtrl: ToastController) {

  }
  ionViewDidEnter() {
    this.token = localStorage.getItem("token")
    this.action.area = this.navParams.get('data')
    this.action.area.push(this.action.area[0])
    console.log(this.action)
  }
  submitAction() {
    console.log(this.token)
    const headers: Headers = new Headers();
    headers.append('Authorization', 'Bearer ' + this.token);
    const options = new RequestOptions({ headers: headers });
    console.log(options)
    this.http.post('https://8bebd614.ngrok.io/actions', this.action, options).map(res => res.json()).subscribe(data => {
      console.log(data)
      let toast = this.toastCtrl.create({
        message: 'Thank you for your submission!',
        duration: 3000
      });
      toast.present();
      this.navCtrl.pop()
    });
  }
  cancel() {
    this.navCtrl.pop()
  }
}
