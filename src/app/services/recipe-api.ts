import { Injectable } from '@angular/core';
//https://capacitorjs.com/docs/apis/http#httpoptions
import { CapacitorHttp, HttpOptions} from '@capacitor/core';



@Injectable({
  providedIn: 'root',
})
export class RecipeApiService {

  constructor(){}
// tells javascript this function waits for internet data dont stall app-class materials
  async get(options:HttpOptions){
    return await //pauses until capaitorHttp finishes getting data
    CapacitorHttp.get(options);//capacitor funcition that gets the data from the url 
  }
  
}
