import { Component } from '@angular/core';
import { NavController, NavParams, Events } from 'ionic-angular';

import { TeamSelectPage } from '../teamSelect/teamSelect';
import { Store } from '../../services/Store';

const FACTIONS = [
  'Greek',
  'Norse',
  'Egyptian',
  'Mesoamerican',
];
const DEFAULT_FACTION = FACTIONS[0];

@Component({
  selector: 'page-factionselect',
  templateUrl: 'factionSelect.html'
})
export class FactionSelectPage {
  factionSelections: string[];

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public events: Events,
    public store: Store,
  ) {
    this.factionSelections = FACTIONS;
  }

  assignColorClass(factionName) {
    const cc = {};
    cc[factionName] = true;
    return cc;
  }

  chooseFaction(event, factionName: string) {
    const teamSelections = this.store.getTeamsByFaction(factionName || DEFAULT_FACTION);
    this.navCtrl.push(TeamSelectPage, { teamSelections });
  }
}
