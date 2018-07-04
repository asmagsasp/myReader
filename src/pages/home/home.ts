import { Component } from '@angular/core';
import { NavController, LoadingController } from 'ionic-angular';
import { Http } from '@angular/http';
import { InAppBrowser } from '@ionic-native/in-app-browser';
import 'rxjs/add/operator/map';


@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  public feeds: Array<string>;
  private url : string = 'https://www.reddit.com/new.json';

  constructor(public navCtrl: NavController, public http: Http, public loadingCtrl : LoadingController, public iab : InAppBrowser) {
     this.fetchContent();
  }

  fetchContent():void {
    let loading = this.loadingCtrl.create({
      content: 'Fetching content...'
    });

    loading.present();

    this.http.get(this.url).map(res => res.json()) 
    .subscribe(data => {
      this.feeds = data.data.children;
      loading.dismiss();
    })
  }

  itemSelected(url:string):void{
    let browser = this.iab.create(url);
    browser.show();
  }

}
