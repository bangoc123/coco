import { Component, ViewChild } from '@angular/core';
import { Nav, Platform, Events } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { IssuesPage } from './../pages/issues/issues';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage: any = IssuesPage;
  pages: Array<{ title: string, component: any }>;
  login: any;
  constructor(public platform: Platform, public statusBar: StatusBar, public splashScreen: SplashScreen, public events: Events) {
    this.initializeApp();

    // used for an example of ngFor and navigation
    this.pages = [
      { title: 'Issues & Actions', component: IssuesPage }
    ];

    events.subscribe('user:logined', (token) => {
      localStorage.setItem("token", token)
      this.login = true
      console.log(localStorage.getItem("token"))
    });
    events.subscribe('user:logout', () => {
      localStorage.removeItem("token")
      this.login = false
    });
  }

  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.setRoot(page.component);
  }
  logout() {
    this.events.publish('user:logout');
  }
}
