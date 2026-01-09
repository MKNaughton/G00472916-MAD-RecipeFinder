import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

import { IonContent, IonHeader, IonTitle, IonToolbar, IonCard, IonCardHeader,IonCardTitle, IonCardContent, IonList, IonItem, IonLabel, IonImg, IonButton } from '@ionic/angular/standalone';
// ActivatedRoute gets parameter from URL - REF:class materials w9
import { ActivatedRoute } from '@angular/router';
// reuse HTTP service for API calls
import{ RecipeApiService } from '../services/recipe-api';
//HttpOptions structures API request with  URL
import { HttpOptions } from '@capacitor/core';
//Storage service to read users measurement preference - REF:wk 10
import{ StorageService } from '../services/storage-service';


@Component({
  selector: 'app-recipe-details',
  templateUrl: './recipe-details.page.html',
  styleUrls: ['./recipe-details.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar,IonCard, IonCardHeader, IonCardTitle, IonCardContent, IonList, IonItem, IonLabel, IonImg, CommonModule, IonButton]
})
export class RecipeDetailsPage implements OnInit {

//variable to store recipe ID fetched from URL parameter 
recipeId: string = '';

//variable to store full recipe from API response
recipeDetails: any = null;

//spoonacular API key
apiKey: string = '70759a4f7911402abcc53d3c51d3b759';

//array to store recipe details ingredients and cooking instructions from API-same as hobbies array wk 11
instructions: any[] = [];
//boolean is current recipe saved in favourites
isFavourite: boolean = false;

// store users measurement options loaded from storage
selectedUnit:string = 'metric';

//Inject ActivatedRoute to access URL parameters+RecipeApiService for Http calls
//Inject storage service to read metric/US options
  constructor(private route:ActivatedRoute, private recipeApi:RecipeApiService, private storageService: StorageService) { }

  ngOnInit() {
  }

//ionViewWillEnter fired when component is about to animate into view - REF: Class materials wk 9
// Use instead of ngOnInit for Ionic pages that need fresh data every visit
async ionViewWillEnter(){

  const savedUnit = await this.storageService.get('measurementUnit');
  if(savedUnit) {
    this.selectedUnit = savedUnit
  }

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

// is favourites list already in fabvourites list when page loads - load saved data when the page loads wk 10
    const favourites = await this.storageService.get ('favourites') || [];
    //check if current recipe is ID in in favourites array if it is istrue is set to true if not is set to false - set button text
this.isFavourite = favourites.some((fav: any) => fav.id === this.recipeDetails.id);


    //Use for loop to find the attributes that the API returns - REF: wk 11 data in object
   for(const key in this.recipeDetails.extendedIngredients[0].measures){
    // prints out the object keys API returns: object keys are case sensitive so recipe-details.html must match same as API returned objects
    // if Recipe-details.page.html uses uppercase but the API returned object keys are lower case , no data is displayed 
    console.log('Measure key found:', key); 
   }

    //analyzedInstructions array, 1st element contains the steps array
    if (response.data.analyzedInstructions && response.data.analyzedInstructions.length > 0){ // check if API returned instructions and array isnt empty
     //// accesing nested array: [0] gets the first instruction set , .steps gets array of step objects.
      this.instructions = response.data.analyzedInstructions[0].steps;
    }
  
    // log to console for testing 
    console.log('Recipe Details:', this.recipeDetails);
}
  // add or remove recipe from favourites list and save to storage with button displaying right text
  async addRemoveFavourite(){
    //storage.Services.get returns the save favourites array or null, if nothing is in favourites array use empty array
    let favourites = await this.storageService.get('favourites') || [];
   // if this recipe is already a favourite 
    if (this.isFavourite){
     //then create new updated favourites array without current recipe id
   const newFavourites: any[] = [];
   //loop through each saved favourite recipe
       for (const fav of favourites) {  
        if(fav.id !== this.recipeDetails.id){  // if fav id is not equal to this.recipe id then
          newFavourites.push(fav); // add to new array -REF:class materials wk 11 push adds to array
        }
       }
       //update the favourites array with new favourites array
        favourites = newFavourites;
        this.isFavourite = false; //if this recipe is not a favourite- add to favourites button option is available

      } else {
      //add to favourites but check if there are duplicates first 
      //.some() :checks the array to see if any of the elements match a set condition- if the recipy id already exists in favourites array
      // if no favourite already has the same id as the current recipe then it can be added to favourites
     if(!favourites.some((fav:any) => fav.id === this.recipeDetails.id)){   //.some() REF:https://refine.dev/blog/javascript-some-method/#how-to-use-javascript-array-some-method
     //push into favourites array
      favourites.push(this.recipeDetails); 
     }
     //if recipe id is a favourite returns true =then change button to Remove from favourites
       this.isFavourite = true; // if this.isfavourite returns false =then button state is addto favourites
    }
   
    // storage.set persists data between app sessions-REF:class materials wk10
// save the updated favourites array to storage
await this.storageService.set('favourites', favourites);
 //check browser storage in console for saved favourites
console.log('Favourites array now:', favourites);

  }
 


}
 



