import { groceries, mealPlan } from "@/mockData/recipes";
import { useSession, signIn, signOut } from "next-auth/react";
import { useState } from "react";

export default function NewRecipe() {
  const [name, setName] = useState<string>("");
  const [ingredients, setIngredients] = useState<string[]>([]);
  const [instructions, setInstructions] = useState<string>("");

  async function handleClick() {
    const recipeData = {
      recipeName: name,
      ingredients: ingredients,
      instructions: instructions,
      groceries: false,
      mealPlan: false,
      shared: false,
    };

    const res = await fetch("/api/recipes", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(recipeData),
    });
    const data = await res.json();
    console.log("Response:", data);
  }

  return (
    <div>
      <h1>Add new recipe</h1>
      <input
        name="name"
        placeholder="recipe name"
        className="border border-gray-200 my-4 p-2 rounded-xs"
        onChange={(e) => setName(e.target.value)}
      />
      <input
        name="ingredients"
        placeholder="ingredients"
        className="border border-gray-200 my-4 p-2 rounded-xs"
        onChange={(e) => setIngredients([e.target.value])}
      />
      <input
        name="instructions"
        placeholder="instructions"
        className="border border-gray-200 my-4 p-2 rounded-xs"
        onChange={(e) => setInstructions(e.target.value)}
      />
      <button onClick={handleClick}>Add</button>
    </div>
  );
}
