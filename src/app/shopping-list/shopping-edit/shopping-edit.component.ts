import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { Ingredient } from 'src/app/shared/ingredient.model';
import { ShoppingListService } from '../shopping-list.service';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit, OnDestroy {
  @ViewChild('f', {static: false}) slForm: NgForm;

  subscription: Subscription;
  editMode = false;
  editedItemIndex: number;
  editedItem: Ingredient;

  constructor(private shoplistService: ShoppingListService) { }

  ngOnInit() {
    this.subscription = this.shoplistService.startedEditing.subscribe((index:number) => {
      this.editMode = true;
      this.editedItemIndex = index;
      this.editedItem = this.shoplistService.getIngredient(index);
      this.slForm.setValue({
        name: this.editedItem.name,
        amount: this.editedItem.amount
      })
    });
  }

  onAddItem(form: NgForm) {
    const value = form.value;
    const newIngredient = new Ingredient(value.name, value.amount);
    if (!this.editMode) {
      this.shoplistService.AddIngredient(newIngredient);
    }
    else {
      this.shoplistService.UpdateIngredient(this.editedItemIndex ,newIngredient);
    }
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
