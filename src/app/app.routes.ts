import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'home',
    loadComponent: () => import('./home/home.page').then((m) => m.HomePage),
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
  {
    path: 'recipe-details/:id',
    loadComponent: () => import('./recipe-details/recipe-details.page').then( m => m.RecipeDetailsPage)
  },
  {
    path: 'settings',
    loadComponent: () => import('./settings/settings.page').then( m => m.SettingsPage)
  },

 // {
 //   path:'Ingredients',
  //  loadComponent:() => import('./Ingredients/Ingredients.page').then(m =>m.IngredientsPage)
 // }
];
