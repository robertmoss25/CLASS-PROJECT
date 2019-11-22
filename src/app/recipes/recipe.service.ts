import { Recipe } from './recipe.model';
import { EventEmitter } from '@angular/core';

export class RecipeService {
    recipeSelected = new EventEmitter<Recipe>();
    private recipes: Recipe[] = [
        new Recipe('A Test Recipe', 'This is simply a test', 
        '../../../assets/images/recipe1.jpg'),
        new Recipe('A Test Recipe2', 'This is simply a test2', 
        '../../../assets/images/recipe2.jpg')
      ];

    getRecipes() {
        return this.recipes.slice();
    }
}