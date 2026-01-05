import { Component } from '@angular/core';
//Ionic components imported and added to the imports array- class materials
import { IonHeader, IonToolbar, IonTitle, IonContent, IonItem, IonInput, IonButton } from '@ionic/angular/standalone';
// Every <ion-something> used in the HTML must be imported in the .ts file.
//Ref: https://ionicframework.com/docs/components

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  //added imports into component using standalone components - class materials
  imports: [IonHeader, IonToolbar, IonTitle, IonContent, IonItem, IonInput, IonButton],
})
export class HomePage {
  constructor() {}
}
