import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonCard, IonCardHeader, IonCardTitle, IonCardContent, IonImg, IonButton  } from '@ionic/angular/standalone';
//storage service to load saved favourites - REF: wk 10
import { StorageService } from '../services/storage-service';
//RouterLink for details
import { RouterLink } from '@angular/router';



@Component({
  selector: 'app-favourites',
  templateUrl: './favourites.page.html',
  styleUrls: ['./favourites.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, IonCard, IonCardContent, IonCardHeader, IonCardTitle, IonImg, IonButton, CommonModule, RouterLink]
})
export class FavouritesPage implements OnInit {

  //Array to store favourite recipes saved from storage
  favourites: any[] = [];
  //inject storage service to read saved favourites- REF:WK 10 dependancy injection for storage service 
  constructor(private storageService:StorageService) { }

  ngOnInit() {
  }

  //ionViewWillEnter runs every time page is visited loads the current and updated favourites list from storage
  async ionViewWillEnter(){
//loads favourites array from storage, returns emptey array if no favourites are saved
    this.favourites = await this.storageService.get('favourites') || [];
    //log to console for testing
    console.log('Favourites loaded:', this.favourites);
  }

}
