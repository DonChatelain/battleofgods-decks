import { Component } from '@angular/core';
import { NavController, MenuController } from 'ionic-angular';

import { Storage } from '@ionic/storage';

import { FactionSelectPage } from '../factionSelect/factionSelect';
import { HandView } from '../handView/handView';

const APP_VERSION = '1.0.0';

@Component({
  selector: 'page-entry',
  templateUrl: 'entry.html',
})
export class EntryPage {
  prevData: any;
  appVersion: string;

  constructor(
    public navCtrl: NavController,
    public menuCtrl: MenuController,
    private storage: Storage,
  ) {
    this.appVersion = APP_VERSION;
    this.menuCtrl.enable(false);
    this.setupPrevData();
  }

  setupPrevData() {
    this.prevData = null;
    this.storage
      .get('prevData')
      .then(data => {
        if (!data) return;
        data.isPreviousData = true;
        this.prevData = data;
      })
      .catch(err => console.error(err));
  }

  startNewGame() {
    this.navCtrl.push(FactionSelectPage);
  }

  continuePreviousGame() {
    if (!this.prevData) return console.log('no prevdata to continue with');
    this.navCtrl.push(HandView, {
      selectedTeam: this.prevData,
    })
  }
}