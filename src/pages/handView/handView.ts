import { Component } from '@angular/core';
import { NavParams, MenuController, Events, AlertController } from 'ionic-angular';

const STARTING_CARD_COUNT = 6;
const MAX_CARD_COUNT = 100;

@Component({
  selector: 'hand-view',
  templateUrl: 'handView.html',
})
export class HandView {
  deck: Array<any> = [];
  hand: Array<any> = [];
  discards: Array<any> = [];
  startingCardCount: number = STARTING_CARD_COUNT;
  characterData: Array<any> = [];
  hasRestoredDeck: boolean = false;
  isDead: boolean = false;

  constructor(
    public navParams: NavParams,
    public menuCtrl: MenuController,
    public events: Events,
    public alertCtrl: AlertController,
  ) {

    const { selectedTeam } = navParams.data;
    if (selectedTeam.isPreviousData) {
      const { deck, hand, discards, characterData } = selectedTeam;
      this.deck = deck;
      this.hand = hand;
      this.discards = discards;
      this.characterData = characterData;
    }
    else if (selectedTeam != null) {
      this.deck = this._generateDeck(selectedTeam.cards);
      this.characterData = selectedTeam.characters;
    }
  }

  // TODO: separate logic into methods
  public drawCard() {
    if (this.isDead) return;

    if (this.hand.length >= MAX_CARD_COUNT){
      return this.presentAlert(
        'Max Card Limit Reached',
        `You may not have more than ${MAX_CARD_COUNT} cards in your hand. Please discard a card to draw another.`,
      );
    }
    // second time thru drawpile
    if (this.hasRestoredDeck) {
      if (this.deck.length === 2) {
        // WARNING for Death
        this.presentAlert(
          'Your Drawpile Has One Card Left',
          'Drawing your last card will destroy all Gods under your control and you will be out of the game.'
        );
      }
      else if (this.deck.length === 1) {
        // DEATH
        this.hand = [];
        this.discards = [];
        this.deck = [];
        this.isDead = true;
        return this.presentAlert(
          'Wipe Y\'self Off',
          'You dead',
        );
      }
    }
    else if (this.deck.length === 1) {
      this.shuffleDiscardsIntoDeck();
      this.hasRestoredDeck = true;
      this.presentAlert(
        'Your Discards Have Been Shuffled Into Your Drawpile',
        'This only happens once per game',
      );
    }

    return this.hand.unshift(this.deck.pop());
  }

  public shuffleDiscardsIntoDeck() {
    this.deck = this._shuffle(this.discards).concat(this.deck);
    this.discards = [];
  }

  public playCard(index: number) {
    const card = this.hand[index];
    if (card != null) {
      this.discards.unshift(card);
      this.hand.splice(index, 1)
    }
  }

  public returnDiscard(index: number) {
    const card = this.discards[index];
    if (card != null) {
      this.hand.unshift(card);
      this.discards.splice(index, 1)
    }
  }

  public showDiscardPile() {
    this.menuCtrl.toggle('menu-discard-pile');
  }

  public getMinorCount(char) {
    if (char.minorCount != null) {
      return `(${char.minorCount})`
    }
  }

  saveGame() {
    const dataToSave = {
      deck: this.deck,
      hand: this.hand,
      discards: this.discards,
      characterData: this.characterData,
      isDead: this.isDead,
    };
    this.events.publish('data:saved', dataToSave);
  }

  presentAlert(title, subTitle) {
    const alert = this.alertCtrl.create({
      title,
      subTitle,
      buttons: ['Dismiss']
    });
    alert.present();
  }

  quitToEntry() {
    this.saveGame();
  }

  ionViewDidLoad() {
    this.menuCtrl.enable(true);
  }
  ionViewWillLeave() {
    this.menuCtrl.enable(false);
  }

  public assignColorClass(cardName) {
    const cc = {};
    if (cardName === 'Combat' || cardName === 'Basic') {
      cc['basic-card'] = true;
    } else {
      cc['special-card'] = true;
    }
    return cc;
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
