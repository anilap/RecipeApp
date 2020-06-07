import {Recipe} from './recipe.model';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';

import { Ingredient } from '../shared/ingredient.model';
import { ShoppingListService } from '../shopping-list/shopping-list.service';

@Injectable()
export class RecipeService{

  private recipes: Recipe[] = [];
  recipesChanged = new Subject<Recipe[]>();

 /* private recipes: Recipe[] = [
    new Recipe('Test recipe 1',
      'This is just a test',
      'assets/Recipe1.jpg',
      [
        new Ingredient('Eggs', 12),
        new Ingredient('Mashroom', 5)
      ]),
    new Recipe('Test recipe 2',
      'This is just a test',
      'assets/Recipe2.jpg',
      [
        new Ingredient('Bell pepper', 2),
        new Ingredient('Apple', 1)
      ])
  ];*/

  constructor(private shoppingListService: ShoppingListService) {

  }
  getRecipe() {
    return this.recipes.slice();
  }

  getRecipes(index: number) {
    return this.recipes[index];
  }

  setRecipes(recipes: Recipe[]) {
    this.recipes = recipes;
    this.recipesChanged.next(this.recipes.slice());
  }

  addIngredientsToShoppingList(ingredients: Ingredient[]){
    this.shoppingListService.addIngredients(ingredients);
  }
  addRecipe(recipe: Recipe) {
    this.recipes.push(recipe);
    this.recipesChanged.next(this.recipes.slice());
  }
  updateRecipe(index: number, newRecipe: Recipe) {
    this.recipes[index] = newRecipe;
    this.recipesChanged.next(this.recipes.slice());
  }
  deleteRecipe(index: number) {
    this.recipes.splice(index,1);
    this.recipesChanged.next(this.recipes.slice());
  }
}
