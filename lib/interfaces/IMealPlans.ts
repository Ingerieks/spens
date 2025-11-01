import { IRecipes } from "./IRecipes";

export interface IMealPlan {
  week: string;
  day: string;
  recipe: IRecipes;
}
