import { Component, OnInit } from '@angular/core';
import { CallNumber } from '@ionic-native/call-number/ngx';

@Component({
  selector: 'app-tab2',
  templateUrl: '../tab1/tab1.page.html',
  styleUrls: ['../tab1/tab1.page.scss']
})
export class Tab2Page implements OnInit {
  constructor(private callNumber: CallNumber) {}

  ngOnInit() {
    console.log('Hola');
    this.callNumber.callNumber("18001010101", true)
      .then(res => console.log('Launched dialer!', res))
      .catch(err => console.log('Error launching dialer', err));
  }

}
