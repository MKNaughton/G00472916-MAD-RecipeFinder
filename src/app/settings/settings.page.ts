import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
//add card and radio components for settings UI
//REF: Ionic docs, https://ionicframework.com/docs/api/card and /radio
import { IonContent, IonHeader, IonTitle, IonToolbar, IonCard, IonCardHeader, IonCardTitle, IonCardContent, IonRadioGroup, IonRadio, IonItem, IonLabel} from '@ionic/angular/standalone';
//storage  service for saving user preferances -REF:wk 10
Import {StorageServiceService} from '../services/storage-service.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.page.html',
  styleUrls: ['./settings.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, IonCard, IonCardHeader, IonCardContent, IonRadioGroup, IonRadio, IonItem, IonLabel, CommonModule, FormsModule]
})
export class SettingsPage implements OnInit {
// store the measurement selected - default metric

selectedUnit: string = 'metric';
//storage services injected in constructorto save and load metric
  constructor(private storageService: StorageServiceService) { }

  ngOnInit() {
  }
//Load/saved unit when page opens
async ionViewWillEnter(){
//Get saved unit from storage, if nothing is saved default is metric
//REF:wk 10 storage.get returns saved value or null
const savedUnit = await this.storageService.get('measurementUnit');
if (savedUnit) {
  this.selectedUnit = savedUnit;
}
}
// save selected unit to storage when user changes radio button
//REF: wk 10 storage.set persists data between app sessions
async saveUnit(){
  await this.storageService.set('measurementUnit', this.selectedUnit);
}

}
