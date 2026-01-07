import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonCard, IonCardHeader,IonCardTitle, IonCardContent, IonList, IonItem, IonLabel, IonImg } from '@ionic/angular/standalone';
// ActivatedRoute gets parameter from URL - REF:class materials w9
import {ActivatedRoute} from '@angular/router';
// reuse HTTP service for API calls
import{RecipeApiService} from '../services/recipe-api';
//HttpOptions structures API request with  URL
import {HttpOptions} from '@capacitor/core';

@Component({
  selector: 'app-recipe-details',
  templateUrl: './recipe-details.page.html',
  styleUrls: ['./recipe-details.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar,IonCard, IonCardHeader, IonCardTitle, IonCardContent, IonList, IonItem, IonLabel, IonImg, CommonModule, FormsModule]
})
export class RecipeDetailsPage implements OnInit {

//variable to store recipe ID fetched from URL parameter 
recipeId: string = '';

//variable to store full recipe from API response
recipeDetails: any = null;

//spoonacular API key
apiKey: string = '70759a4f7911402abcc53d3c51d3b759';

//same as hobbies array wk 11
instructions: any[] = [];

//Inject ActivatedRoute to access URL parameters+RecipeApiService for Http calls
  constructor(private route:ActivatedRoute, private recipeApi:RecipeApiService) { }

  ngOnInit() {
  }

//ionViewWillEnter fired when component is about tp animate into view - REF: Class materials wk 9
// Use instead of ngOnInit for Ionic pages that need fresh data every visit
async ionViewWillEnter(){

  //REf:Class materials wk 9 
  //Extract the recipe Id from URL route parameter
  //this.route.snapshot.paraMap.get to retrieve parameter
  //paramMap.get('id') retrieves value from : id in route definition
  this.recipeId = this.route.snapshot.paramMap.get('id') || '';

  //Build API URL for recipe info endpoint 
  const options: HttpOptions = {
    url:
    `https://api.spoonacular.com/recipes/${this.recipeId}/information?apiKey=${this.apiKey}`
  };
    //call service to fetch detailed recipe data from spoonacular
    //
    const response = await this.recipeApi.get(options);

    //store the response data - image, ingredients and recipe instructions
    this.recipeDetails = response.data;

    //analyzedInstructions array, 1st element contains the steps array
    if (response.data.analyzedInstructions && response.data.analyzedInstructions.length > 0){ // check if API returned instructions and array isnt empty
     //// accesing nested array: [0] gets the first instruction set , .steps gets array of step objects.
      this.instructions = response.data.analyzedInstructions[0].steps;
    }
    // log to console for testing 
    console.log('Recipe Details:', this.recipeDetails);
  }
}

