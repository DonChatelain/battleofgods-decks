import { Component, ViewChild } from '@angular/core';
import { Nav, Platform, Events, LoadingController } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

// import { TeamSelectPage } from '../pages/teamSelect/teamSelect';
// import { FactionSelectPage } from '../pages/factionSelect/factionSelect';
import { EntryPage } from '../pages/entry/entry';

import { Store } from '../services/Store';
import { Storage } from '@ionic/storage';

@Component({
  templateUrl: 'app.html',
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;
  rootPage: any = EntryPage;
  pages: Array<{title: string, component: any}>;
  loadingOverlay: any;

  constructor(
    public platform: Platform,
    public statusBar: StatusBar,
    public splashScreen: SplashScreen,
    public events: Events,
    public store: Store,
    public storage: Storage,
    public loadingCtrl: LoadingController,
  ) {
    this.initializeApp();
    this.initLoader();
    this.events.subscribe('data:saved', (saveData) => {
      if (saveData.isDead) {
        this.storage
          .clear()
          .then(() => this.nav.goToRoot({ animate: true, direction: 'back' }))
          .catch(err => console.error('storage clear:', err));
      } else {
        this.storage
          .set('prevData', saveData)
          .then(() => this.nav.goToRoot({ animate: true, direction: 'back' }))
          .catch(err => console.error('storage error:', err));
      }
    })
    this.events.subscribe('data:ready', (ready) => {
      if (ready) {
        this.loadingOverlay.dismiss();
      }
    })
  }

  initLoader() {
    this.loadingOverlay = this.loadingCtrl.create({
      spinner: 'crescent',
      cssClass: 'my-loading-overlay',
    });
    this.loadingOverlay.present();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

}
