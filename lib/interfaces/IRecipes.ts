export interface IRecipes {
  id: number;
  recipeName: string;
  labels: string[];
  shared: boolean;
  groceries: boolean;
  mealPlan: boolean;
  //category: string[];
  ingredients: string[];
  instructions: string;
  accesslist: [
    {
      userEmail: string[];
    }
  ];
}
