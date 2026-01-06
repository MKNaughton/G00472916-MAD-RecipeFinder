import { Component } from '@angular/core';
//Ionic components imported and added to the imports array- class materials
import { IonHeader, IonToolbar, IonTitle, IonContent, IonItem, IonInput, IonButton } from '@ionic/angular/standalone';
// service created in reciepe -api.ts
import {RecipeApiService} from '../services/recipe-api';
//options is going to be of type HTTP options = to an object
import{HttpOptions} from '@capacitor/core';
//form module to allow for twoway binding with [(ngModel)] input field
//REF:Angular forms docs-https://angular.dev/guide/forms
import {FormsModule} from '@angular/forms';

// Every <ion-something> used in the HTML must be imported in the .ts file.
//Ref: https://ionicframework.com/docs/components

// Creating a typeScript inteface to define the structure of recipe data and an array to store multiple recipes returned from the API.
//typeScript interfaces provide both type safty and intellisense autocomplete for ingredients input bar.
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
  //added imports into component using - class materials
  imports: [IonHeader, IonToolbar, IonTitle, IonContent, IonItem, IonInput, IonButton, FormsModule],//FormModule added for ngModel binding
})
export class HomePage {
  //stores ingredient input from ion input field
  //bound to input using [{ngModel}]="ingredients" in HTML
  ingredients:string = '';

  //Spoonacular Api Key 
  apiKey: string = '70759a4f7911402abcc53d3c51d3b759';

//Array to store recipe results from API- REF : class materials wk 11 demo data in array
recipes: Recipe[] = [];

//constructor uses dependancy injection to get ReciepeApiService instance 
  constructor(private recipeApi: RecipeApiService) {}

  //method called when user clicks search button in home.page.html
  //async waits for API response
  async searchRecipes(){
  
    const options: HttpOptions = {
     //HttpOption object which has the API url
      //constructor URL: base + apiKey parameter + query parameter with ingredients
      url:'http://api.spoonacular.com/recipes/complexSearch?apiKey='+ this.apiKey+'&query=' + this.ingredients  };



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
