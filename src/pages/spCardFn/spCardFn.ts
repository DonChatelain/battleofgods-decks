import { Component } from '@angular/core';
import { NavParams, Events, PopoverController, ViewController } from 'ionic-angular';

@Component({
  selector: 'sp-card-fn',
  templateUrl: 'spCardFn.html',
})
export class SpCardFnPage {
  cardName: string = '';
  details: string = '';
  buttonText: string = 'Done';
  isFinished: boolean = false;
  selectableCards: Array<any> = [];
  callback: Function = () => {};
  chosenCardIndex: number;

  constructor(
    public navParams: NavParams,
    public events: Events,
    public popoverCtrl: PopoverController,
    public viewCtrl: ViewController,
  ) {
    console.log(navParams.data);

    const { cardName, details, buttonText, isFinished, selectableCards, callback } = navParams.data;
    this.cardName = cardName || this.cardName;
    this.details = details || this.details;
    this.buttonText = buttonText || this.buttonText;
    this.isFinished = isFinished || this.isFinished;
    this.selectableCards = selectableCards || this.selectableCards;
    this.callback = callback || this.callback
  }

  getSelectedClass(index) {
    const cc = {};
    if (index === this.chosenCardIndex) {
      cc['selected-card'] = true;
    }
    return cc;
  }

  selectCard(index) {
    this.chosenCardIndex = index;
    this.isFinished = true;
  }

  done() {
    const card = this.selectableCards[this.chosenCardIndex];
    this.selectableCards.splice(this.chosenCardIndex, 1);
    this.callback(card, this.selectableCards);
    this.viewCtrl.dismiss();
  }

}