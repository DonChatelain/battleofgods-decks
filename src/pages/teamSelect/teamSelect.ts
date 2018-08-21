import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import { HandView } from '../handView/handView';
 
@Component({
  selector: 'page-teamselect',
  templateUrl: 'teamSelect.html',
})
export class TeamSelectPage {
  teamSelections: Array<any>;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
  ) {    
    let { teamSelections } = navParams.data;
    this.teamSelections = teamSelections;
  }

  chooseTeam(event, team) {
    this.navCtrl.push(HandView, {
      selectedTeam: team,
    });
  }

  assignColorClass(faction) {
    const cc = {};
    cc[faction] = true;
    return cc;
  }
}
