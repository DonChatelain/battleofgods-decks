import { Component } from '@angular/core';
import { NavController, NavParams, Events } from 'ionic-angular';

import { HandView } from '../handView/handView';
import { Requester } from '../../services/Requester';

const DEFAULT_FACTION = 'Egyptian';
 
@Component({
  selector: 'page-teamselect',
  templateUrl: 'teamSelect.html',
  providers: [ Requester ]
})
export class TeamSelectPage {
  teamSelections: Array<any>;
  selectedTeam: { name: string, key: string };

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public events: Events,
    public request: Requester,
  ) {    
    let { faction } = navParams.data;
    this.events.subscribe('data:ready', ready => {
      this.teamSelections = request.getTeamsByFaction(faction || DEFAULT_FACTION);
    })
  }

  chooseTeam(event, team) {
    // show hand view + shuffle, etc
    this.selectedTeam = team;
    this.navCtrl.push(HandView, {
      selectedTeam: this.selectedTeam,
    });
  }
}
