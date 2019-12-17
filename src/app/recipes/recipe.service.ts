import { Recipe } from './recipe.model';
import { EventEmitter, Injectable } from '@angular/core';
import { Ingredient } from '../shared/ingredient.model';
import { ShoppingListService } from '../shopping-list/shopping-list.service';

@Injectable()
export class RecipeService {
    recipeSelected = new EventEmitter<Recipe>();
    private recipes: Recipe[] = [
        new Recipe('Poached egg and Toast', 'Poached egg and Toast', 
        '../../../assets/images/recipe1.jpg',
        [
            new Ingredient("Eggs",2),
            new Ingredient("Toast",4)
        ]),
        new Recipe('Chilli', 'Homemade chilli', 
        '../../../assets/images/recipe2.jpg',
        [
            new Ingredient("Ground meat",2),
            new Ingredient("Black Beans",1),
            new Ingredient("Onion",1),
            new Ingredient("Tomatoes",2),
        ])
      ];

    constructor(private slService: ShoppingListService) {

    }

    getRecipes() {
        return this.recipes.slice();
    }

    addIngredientsToShoppingList(ingredients: Ingredient[]) {
        this.slService.addIngredients(ingredients);
    }

    getRecipe(index: number) {
        return this.recipes[index];
    }
}