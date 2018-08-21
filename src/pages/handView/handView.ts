import { Component } from '@angular/core';
import { NavController, NavParams, MenuController, Events } from 'ionic-angular';
import { Observable } from 'rxjs/Observable';

const STARTING_CARD_COUNT = 6;

@Component({
  selector: 'hand-view',
  templateUrl: 'handView.html',
})
export class HandView {
  deck: Array<any>;
  hand: Array<any>;
  discards: Array<any>;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public menuCtrl: MenuController,
    public events: Events,
  ) {
    const { selectedTeam } = navParams.data;
    this.deck = this._generateDeck(selectedTeam.cards);
    this.hand = this.deck.splice(-STARTING_CARD_COUNT);
    this.discards = [];
    this.events.subscribe('discards:removed', (cardData) => {
      this.hand.unshift(cardData);
    })
  }

  public drawCard() {
    if (this.deck.length > 0) {
      this.hand.unshift(this.deck.pop());
    }
  }

  public playCard(index: number) {
    if (this.hand[index] != null) {
      this.events.publish('discards:added', this.hand[index]);
      this.hand.splice(index, 1);
    }
  }

  public returnDiscard(index: number) {
    if (this.discards[index] != null) {
      this.hand.unshift(...this.discards.splice(index, 1));
    }
  }

  public showDiscardPile() {
    this.menuCtrl.toggle('menu-discard-pile');
  }

  ionViewDidLoad() {
    this.menuCtrl.enable(true);
  }
  ionViewWillLeave() {
    this.menuCtrl.enable(false);
  }

  private _generateDeck(cards: Array<any>): Array<any> {
    const deck = [];
    cards.forEach(card => {
      for (let i = 0; i < card.qty; i++) {
        if (!card.name) {
          card.name = 'Combat';
          if (card.rng) card.effect = 'Ranged';
        }
        deck.push(card);
      }
    })
    return this._shuffle(deck);
  }

  private _shuffle(cards: Array<any>): Array<any> {
    let currentIndex = cards.length, temporaryValue, randomIndex;
    // While there remain elements to shuffle...
    while (0 !== currentIndex) {
      // Pick a remaining element...
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;
      // And swap it with the current element.
      temporaryValue = cards[currentIndex];
      cards[currentIndex] = cards[randomIndex];
      cards[randomIndex] = temporaryValue;
    }
    return cards;
  }
}
