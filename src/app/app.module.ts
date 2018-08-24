import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { IonicStorageModule } from '@ionic/storage';
import { HttpClientModule } from '@angular/common/http';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { MyApp } from './app.component';
import { EntryPage } from '../pages/entry/entry';
import { FactionSelectPage } from '../pages/factionSelect/factionSelect';
import { TeamSelectPage } from '../pages/teamSelect/teamSelect';
import { HandView } from '../pages/handView/handView';
import { SpCardFnPage } from '../pages/spCardFn/spCardFn';

import { Store } from '../services/Store';
import { AbsoluteDrag } from '../components/absoluteDrag/absoluteDrag';

@NgModule({
  declarations: [
    MyApp,
    EntryPage,
    FactionSelectPage,
    TeamSelectPage,
    HandView,
    AbsoluteDrag,
    SpCardFnPage,
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    IonicStorageModule.forRoot(),
    HttpClientModule,
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    EntryPage,
    FactionSelectPage,
    TeamSelectPage,
    HandView,
    SpCardFnPage,
  ],
  providers: [
    StatusBar,
    Store,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
