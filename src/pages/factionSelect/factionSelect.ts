import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import { TeamSelectPage } from '../teamSelect/teamSelect';

@Component({
  selector: 'page-factionselect',
  templateUrl: 'factionSelect.html'
})
export class FactionSelectPage {
  factionSelections: string[];
  selectedFaction: string;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
  ) {
    this.factionSelections = [
      'Greek',
      'Norse',
      'Egyptian',
      'Mesoamerican',
    ];
  }

  assignColorClass(factionName) {
    const cc = {};
    cc[factionName] = true;
    return cc;
  }

  chooseFaction(event, factionName) {
    // show characters of chosen faction
    this.selectedFaction = factionName;
    this.navCtrl.push(TeamSelectPage, {
      faction: factionName,
    });
  }
}
