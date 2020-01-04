import { Component, OnInit, OnDestroy } from '@angular/core';
import { Ingredient } from '../shared/ingredient.model';
import { ShoppingListService } from './shopping-list.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css']
})
export class ShoppingListComponent implements OnInit, OnDestroy {
  ingredients: Ingredient[];
  private shopListSubscription: Subscription;

  constructor(private shoplistService: ShoppingListService) { }

  ngOnInit() {
    this.ingredients = this.shoplistService.getIngredients();
    this.shopListSubscription = this.shoplistService.ingredientsChanged.subscribe(
      (pIngredients: Ingredient[]) => {
        this.ingredients = pIngredients;
      }
    );
  }

  ngOnDestroy() {
    this.shopListSubscription.unsubscribe();
  }

  onEditItem(index: Number) {
    this.shoplistService.startedEditing.next(index);
  }
}
