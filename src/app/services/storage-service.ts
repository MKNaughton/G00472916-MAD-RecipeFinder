import { Injectable } from '@angular/core';
//Ionic Storage for key value data
//REF:wk 10 Ionic storageangular demo, https://github.com/ionic-team/ionic-storage
import {Storage} from '@ionic/storage-angular';

@Injectable({
  providedIn: 'root',
})
export class StorageService {
  constructor(private storage: Storage){
    //Initialize storage when service created - sets up the storage database - REF:class materials wk 10 ionic storageangular demo
    this.init();
  }
//create storage instance - needs to be called before using storage
async init(){
  await this.storage.create(); //storage.create() initializes the indexed database
}
//save key-value pair to storage
async set(key: string, value:any){
  await this.storage.set(key, value); //storage.set stores data permanently

}
//retrieves value by key from storage, returning null if key doesnt exist
async get(Key: string){
  return await this.storage.get(Key); //storage.get returns the saved value
}

}
