export interface IRecipe {
  id: number;
  recipeName: string;
  labels: string[];
  shared: boolean;
  groceries: boolean;
  //category: string[];
  instructions: string;
}

export interface IMealPlan {
  id: number;
  week: string;
  day: string;
  recipe: IRecipe;
}

export interface IGroceries {
  id: number;
  groceryList: string[];
  accesslist: [
    {
      userEmail: string[];
    }
  ];
}
