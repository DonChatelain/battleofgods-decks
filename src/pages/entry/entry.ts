import { Component } from '@angular/core';
import { NavController, MenuController } from 'ionic-angular';

import { FactionSelectPage } from '../factionSelect/factionSelect';

@Component({
  selector: 'page-entry',
  templateUrl: 'entry.html',
})
export class EntryPage {
  gameTitle: String;

  constructor(
    public navCtrl: NavController,
    public menuCtrl: MenuController,
  ) {
    this.gameTitle = 'Tournament of Nyx';
    this.menuCtrl.enable(false);
  }

  startNewGame() {
    this.navCtrl.push(FactionSelectPage);
  }

  continuePreviousGame() {
    console.log('continue previous; currently broken');
  }
}