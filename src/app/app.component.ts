import { Component } from '@angular/core';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { OneSignal } from '@ionic-native/onesignal/ngx';
import { OneSignalHandler } from './onesignal';


@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  providers: [OneSignal]
})
export class AppComponent {
  public oneSignalAppId: string = 'a1f37a45-6126-49da-bb04-078e39669544';
  public oneSignalHandler: OneSignalHandler;

  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private oneSignal: OneSignal,
  ) {
    this.initializeApp();

    this.inicializarOneSignal();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

  inicializarOneSignal() {
    this.oneSignal.startInit(this.oneSignalAppId);
    this.oneSignal.inFocusDisplaying(this.oneSignal.OSInFocusDisplayOption.InAppAlert);
    this.oneSignal.setSubscription(true);

    this.oneSignal.handleNotificationReceived().subscribe(() => {
      // do something when notification is received
    });

    this.oneSignal.handleNotificationOpened().subscribe(() => {
        // do something when a notification is opened
    });

    this.oneSignal.endInit();

    this.oneSignal.getIds().then((id) => {
      this.oneSignalHandler = new OneSignalHandler(id.userId, this.oneSignalAppId);

      //this.guardarIdOneSignal();
    });
  }
}
