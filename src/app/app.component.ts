import { Component, ViewChild } from '@angular/core';
import { Nav, Platform, Events, NavController } from 'ionic-angular';
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
  discards: Array<any>;

  constructor(
    public platform: Platform,
    public statusBar: StatusBar,
    public splashScreen: SplashScreen,
    public events: Events,
    public store: Store,
    public storage: Storage,
  ) {
    this.initializeApp();
    this.discards = [];
    this.events.subscribe('discards:added', (cardData) => {
      this.discards.unshift(cardData);
    });
    this.events.subscribe('data:saved', (saveData) => {
      if (saveData) {
        saveData.discards = this.discards;
        this.discards = [];
        this.storage
          .set('prevData', saveData)
          .then(() => this.nav.goToRoot({ animate: true, direction: 'back' }))
          .catch(err => console.error('storage error:', err));
      }
    })
  }

  returnDiscard(index: number) {
    if (this.discards[index]) {
      this.events.publish('discards:removed', this.discards[index]);
      this.discards.splice(index, 1);
    }
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
