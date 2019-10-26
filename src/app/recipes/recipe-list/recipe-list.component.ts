import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { Recipe } from '../recipe.model';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent implements OnInit {
  @Output() recipeWasSelected = new EventEmitter<Recipe>();
  recipes: Recipe[] = [
    new Recipe('A Test Recipe', 'This is simply a test', 
    '../../../assets/images/recipe1.jpg'),
    new Recipe('A Test Recipe2', 'This is simply a test2', 
    '../../../assets/images/recipe2.jpg')
  ];
  constructor() { }

  ngOnInit() {
  }

  onRecipeSelected(selectedrecipe: Recipe) {
    console.log("onRecipeSelected")
    this.recipeWasSelected.emit(selectedrecipe);
  }
}
