import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Events, ToastController } from 'ionic-angular';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

@IonicPage({
  segment: 'login/'
})
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {
  user = {
    email: "",
    username: "",
    password: "",
    cpass: ""
  }
  mode = "signin"
  loginData = {
    username: "",
    password: ""
  }
  constructor(public navCtrl: NavController, public navParams: NavParams, public events: Events, public http: Http, public toastCtrl: ToastController) {
  }

  login() {
    this.loginData.username = this.user.username
    this.loginData.password = this.user.password
    console.log(this.loginData)
    this.http.post('https://8bebd614.ngrok.io/identity', this.loginData).map(res => res.json()).subscribe(data => {
      console.log(data)
      this.events.publish('user:logined', data.token);
      let toast = this.toastCtrl.create({
        message: 'Sign-in successfully',
        duration: 3000
      });
      this.navCtrl.pop()
    });

  }
  switchMode() {
    if (this.mode == "signin") {
      this.mode = "signup"
    } else {
      this.mode = "signin"
    }
  }
}
