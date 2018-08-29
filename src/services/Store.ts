import { Injectable } from '@angular/core';
import { Events } from 'ionic-angular';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ENV } from '@app/env';

if (!ENV.API_URL || !ENV.API_TOKEN) {
  console.warn('ENV vars for API not set', ENV);
}

@Injectable()
export class Store {
  headers: HttpHeaders;
  apiToken: string;
  apiUrl: string;
  teamData: Object;

  constructor(private http: HttpClient, public events: Events) {
    this.apiToken = `bearer ${ENV.API_TOKEN || ''}`;
    this.apiUrl = ENV.API_URL || '';
    this.teamData = {};
    
    this.fetch('/teams/alldata')
      .then((teamData: Object) => {
        this.teamData = teamData;
        this.events.publish('data:ready', true);
      })
      .catch(err => console.error(`fetch:: status: ${err.status} message: ${err.message}`));
  }

  getTeamsByFaction(faction: string) {
    const teamValues = Object.keys(this.teamData).map(key => this.teamData[key]);
    return teamValues.filter(x => x.faction === faction);
  }

  fetch(endpoint: string) {
    let headers = new HttpHeaders();
    headers = headers.append('Authorization', this.apiToken);
    return this.http
      .get(this.apiUrl + endpoint, { headers })
      .toPromise()
  }
}
