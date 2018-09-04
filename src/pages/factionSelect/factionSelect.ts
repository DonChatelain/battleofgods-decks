import { Component } from '@angular/core';
import { NavController, NavParams, Events } from 'ionic-angular';
import { ENV } from '@app/env';

import { TeamSelectPage } from '../teamSelect/teamSelect';
import { Store } from '../../services/Store';

const FACTIONS = [
  'Greek',
  'Norse',
  'Egyptian',
  'Mesoamerican',
];
const DEFAULT_FACTION = FACTIONS[0];
const apiUrl = ENV.API_URL || '';

@Component({
  selector: 'page-factionselect',
  templateUrl: 'factionSelect.html'
})
export class FactionSelectPage {
  factionSelections: string[];
  imagesUrl: any;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public events: Events,
    public store: Store,
  ) {
    this.factionSelections = FACTIONS;

    this.preloadImages();
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

  preloadImages() {
    this.imagesUrl = apiUrl.split('/');
    this.imagesUrl.pop();
    this.imagesUrl = this.imagesUrl.join('/') + '/character_images/';
    
    const imageStrings = this.store.getAllPrimaryCharactersImages();
    imageStrings.forEach(str => {
      const image = new Image();
      image.src = this.imagesUrl + str;
    })
  }
}
