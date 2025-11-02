import { groceries, mealPlan } from "@/mockData/recipes";
import { useSession, signIn, signOut } from "next-auth/react";
import { useState } from "react";

interface NewRecipePageProps {
  resetToHome: () => void;
}

export default function NewRecipe({ resetToHome }: NewRecipePageProps) {
  const [name, setName] = useState<string>("");
  const [ingredients, setIngredients] = useState<string[]>([]);
  const [instructions, setInstructions] = useState<string>("");
  const [inputValue, setInputValue] = useState("");
  const [selectorValues, setSelectorValues] = useState<string[]>([]);
  const [selectorValue, setSelectorValue] = useState("");

  const handleChange = (e: string[]) => {
    if (!selectorValue.trim()) return;

    const newValues = selectorValue
      .split(",")
      .map((v) => v.trim())
      .filter((v) => v !== "");
    return [...selectorValues, ...newValues];
  };

  const removeIngredient = (index: number) => {
    setIngredients((prev) => prev.filter((_, i) => i !== index));
  };

  async function handleClick() {
    const ingredientsList = handleChange(ingredients);

    const recipeData = {
      recipeName: name,
      ingredients: ingredientsList,
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
    resetToHome();
  }

  return (
    <div className="mx-2 flex flex-col">
      <label>Recipe name</label>
      <input
        name="name"
        placeholder="Type here..."
        className="border border-gray-200 my-4 p-2 rounded-xs"
        onChange={(e) => setName(e.target.value)}
      />
      <label>Ingredients</label>
      <input
        name="ingredients"
        placeholder="Type here..."
        className="border border-gray-200 my-4 p-2 rounded-xs"
        onChange={(e) => setSelectorValue(e.target.value)}
      />
      <label>Instructions</label>
      <textarea
        name="instructions"
        placeholder="Type here..."
        className="border border-gray-200 my-4 p-2 rounded-xs"
        onChange={(e) => setInstructions(e.target.value)}
      />
      <div className="flex justify-center mt-4">
        <button
          type="button"
          className="bg-yellow-300 py-2 px-4 text-black rounded-xs"
          onClick={handleClick}
        >
          Add
        </button>
      </div>
    </div>
  );
}
