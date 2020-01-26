import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { RecipeService } from '../recipes/recipe.service';
import { Recipe } from '../recipes/recipe.model';
import { map, tap } from 'rxjs/operators';

@Injectable({providedIn: 'root'})
export class DataStorageService {
    constructor(private http: HttpClient, private receipeService: RecipeService) {

    }

    storeRecipes() {
        const recipes = this.receipeService.getRecipes();

        this.http.put('https://ng-course-recipe-book-83263.firebaseio.com/recipes.json',recipes)
        .subscribe(response => {
            console.log(response);
        });
    }

    onFetchData() {
        //  Purpose of the pipe and map is to make sure the ingredients are not returned as null
        // which could cause a crash
        return this.http.get<Recipe[]>('https://ng-course-recipe-book-83263.firebaseio.com/recipes.json')
        .pipe(map(recipes => {
            return recipes.map(recipe => {
                return {...recipe, ingredients: recipe.ingredients ? recipe.ingredients : []};
                        });
                }),
                tap(recipes => {
                    this.receipeService.setRecipes(recipes);
                })
                )
    }
}