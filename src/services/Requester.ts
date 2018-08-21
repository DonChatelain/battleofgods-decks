import { Injectable } from '@angular/core';
import { Events } from 'ionic-angular';
import { HttpClient, HttpHeaders } from '@angular/common/http';

const API_URL = {
  PROD: 'https://battleofgods.now.sh/api',
  DEV: 'http://localhost:6660/api',
};

const API_TOKEN = 'bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJfaWQiOiI1YjZjZTY4MjBiNDIxNTNkNDQzMTY5YmIiLCJuYW1lIjoicGF0cmljayIsInBhc3N3b3JkIjoiJDJiJDEwJGhsVFl4bU84TllNN0xYVGVsV1RhdC52dDZ5VnpUbnFWSzNoMmJRWENrMXdGQjN3Z216d0JxIiwiX192IjowfQ.BCaH4I4MDh2O8ks3aDWE4KPWHysUmC5_MSHj5WIZvKs';


@Injectable()
export class Requester {
  headers: HttpHeaders;
  apiToken: string;
  apiUrl: string;
  teamData: Object;

  constructor(private http: HttpClient, public events: Events) {
    this.apiToken = API_TOKEN;
    this.apiUrl = API_URL.PROD;
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
