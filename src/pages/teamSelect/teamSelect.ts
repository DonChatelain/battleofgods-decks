import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { ENV } from '@app/env';

import { HandView } from '../handView/handView';

const apiUrl = ENV.API_URL || '';
 
@Component({
  selector: 'page-teamselect',
  templateUrl: 'teamSelect.html',
})
export class TeamSelectPage {
  teamSelections: Array<any>;
  teamImage: string = '';
  imagesUrl: any;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
  ) {    
    let { teamSelections } = navParams.data;
    this.teamSelections = teamSelections;

    this.imagesUrl = apiUrl.split('/');
    this.imagesUrl.pop();
    this.imagesUrl = this.imagesUrl.join('/') + '/character_images/';
  }

  getTeamBackground(team) {
    const image = this.imagesUrl + team.characters[0].image;
    // return (`url(${image})`);
    return '';
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
