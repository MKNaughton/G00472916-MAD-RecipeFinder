// Every <ion-something> used in the HTML must be imported in the .ts file. NB FIX
//Ref: https://ionicframework.com/docs/components
import { Component } from '@angular/core';
//Ionic components imported and added to the imports array- class materials
import { IonHeader, IonToolbar, IonTitle, IonContent, IonItem, IonInput, IonButton, IonCard, IonCardHeader, IonCardTitle, IonCardContent, IonImg } from '@ionic/angular/standalone';
// service created in reciepe -api.ts to handle  HTTP requests
import {RecipeApiService} from '../services/recipe-api';
//HttpOptions Type from Capacitor - structures API with Url properties
//REF:capacitorjs.com/docs/apis/http#httpoptions
import{HttpOptions} from '@capacitor/core';

//form module to allow for twoway binding with [(ngModel)] input field-Syncs inputfield value with Typescript variable
//REF:Angular forms guide-https://angular.dev/guide/forms/template-driven-forms
import {FormsModule} from '@angular/forms';
//commonModule provides angular directives = *ngFor for template iteration 
//Angular CommonModule docs https://angular.dev/api/common/CommonModule
//*ngFor is angular built in directive , not Ionic-specific 
//REF:Class materials wk 11
import {CommonModule} from '@angular/common';



// Creating a typeScript inteface to define the structure of recipe data and an array to store multiple recipes returned from the API.
//typeScript interfaces provides: type safty and intellisense autocomplete for ingredients input bar.
//The array enables *ngFor in Html to loop through and display multiple arrays.
//REF:W3Schools TypeScript Interfaces - https://www.w3schools.com/typescript/typescript_object_types.php
//REF: Class materials wk 11 JSON demos
interface Recipe {
  id: number; //recipe ID 
  title: string; //recipe name to display
  image: string;//Image URL to display the recipe photo

}

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  //Imports array for all modules and components  used in this components template.
  //REF class materials + Angular standalone components, https://angular.dev/guide/components/importing
  imports: [IonHeader, IonToolbar, IonTitle, IonContent, IonItem, IonInput, IonButton, IonCard, IonCardHeader, IonCardTitle, IonCardContent, IonImg, FormsModule, CommonModule  ],
})
export class HomePage {
  //stores ingredient input from ion input field
  //bound to input using [{ngModel}]="ingredients" in HTML -two way binding
  ingredients:string = '';//variable updates automatically

  //Spoonacular Api Key 
  apiKey: string = '70759a4f7911402abcc53d3c51d3b759';

//Array to store recipe results from API- REF : class materials wk 11 
recipes: Recipe[] = [];

//constructor uses dependancy injection to get RecipeApiService instance 
  constructor(private recipeApi: RecipeApiService) {}

  //method called when user clicks search button in home.page.html
  //async waits for API response
  async searchRecipes(){
  
    const options: HttpOptions = {
     //HttpOption object which has the API url
      //constructor URL: base + apiKey parameter + query parameter with ingredients
      url:'https://api.spoonacular.com/recipes/complexSearch?apiKey='+ this.apiKey+'&query=' + this.ingredients  };



      //call service get method and wait for response without stalling /freezing
      //application should be responsive so this call is executed asynchronously - class materials wk 10
      const response = await this.recipeApi.get(options);

// output response data to console for testing 
console.log(JSON.stringify(response.data));

//Parse the API response into recipes array- REF: class materials
this.recipes = response.data.results;

//Test to make sure parsing worked 
console.log('Recipes array:', this.recipes);

  }
}
