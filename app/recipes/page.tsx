"use client";

import { useSession, signIn, signOut } from "next-auth/react";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { recipes, mealPlan } from "@/mockData/recipes";
import {
  ShoppingCartOutlined,
  AddOutlined,
  ViewWeekOutlined,
  DeleteOutline,
} from "@mui/icons-material";
import Link from "next/link";
import MealPlan from "../components/mealplan";
import { Tooltip } from "@mui/material";
import GroceryList from "../components/groceries";
import NewRecipe from "../components/newRecipe";
import { IRecipes } from "@/lib/interfaces/IRecipes";
import { addGroceries, deletRecipe } from "./helpers";

export default function RecipePage() {
  const { data: session, status } = useSession();
  const [tab, setTab] = useState("Recipes");
  const [loading, setLoading] = useState(true);
  const [allRecipes, setAllRecipes] = useState<IRecipes[]>([]);
  const [adding, setAdding] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        const res = await fetch("/api/recipes");
        const data = await res.json();
        setAllRecipes(data);
      } catch (error) {
        console.error("Error fetching recipes:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchRecipes();
  }, [tab]);

  if (status === "loading") {
    return <p>Loading...</p>;
  }

  function resetToHome() {
    setTab("Recipes");
  }

  const handleDelete = async (id: number) => {
    const updated = await deletRecipe(id);
    if (updated?.message === "success") {
      setAllRecipes((prev) => prev.filter((r) => r.id !== id));
    } else {
      console.error("Failed to delete recipe");
    }
  };

  const handleAddToGroceries = async (
    ingredients: string[],
    ingredientsAdded: boolean,
    recipeId: number
  ) => {
    setAdding(true);

    const added = await addGroceries({
      ingredients,
      ingredientsAdded,
      recipeId,
    });
    setAdding(false);
  };

  return (
    <div className="mt-4 ">
      <div className="my-4 mx-2">
        <button
          className={`rounded-xs p-2 ${
            tab === "Recipes" ? "bg-yellow-300" : "border border-gray-100"
          }`}
          onClick={() => setTab("Recipes")}
        >
          Recipes
        </button>
        <button
          className={`rounded-xs p-2 mx-2 ${
            tab === "MealPlan" ? "bg-yellow-300" : "border border-gray-100"
          }`}
          onClick={() => setTab("MealPlan")}
        >
          Meal Plan
        </button>
        <button
          className={`rounded-xs p-2 ${
            tab === "Groceries" ? "bg-yellow-300" : "border border-gray-100"
          }`}
          onClick={() => setTab("Groceries")}
        >
          Groceries
        </button>
      </div>
      {tab === "Recipes" && (
        <>
          <div className="flex justify-end p-2 mx-4">
            <button onClick={() => setTab("NewRecipe")}>
              <AddOutlined fontSize="large" style={{ color: "#b8b8b8ff" }} />
            </button>
          </div>
          {allRecipes.map((recipe, index) => (
            <div
              key={index}
              className="border border-gray-100 rounded-xs p-2 m-2"
            >
              <Link href={`/recipes/${recipe.id}`} className="">
                <h1 className="text-lg">{recipe.recipeName}</h1>
              </Link>
              <div className="mt-2 flex flex-row justify-between">
                <div className="flex flex-row">
                  <div className="mx-2">
                    <button
                      onClick={() =>
                        handleAddToGroceries(
                          recipe.ingredients,
                          recipe.groceries,
                          recipe.id
                        )
                      }
                    >
                      <ShoppingCartOutlined
                        style={{
                          color: recipe.groceries ? "#facc15" : "#e0e0e0ff",
                        }}
                      />
                    </button>
                  </div>
                  <div className="mx-2">
                    <ViewWeekOutlined
                      style={{
                        color: recipe.mealPlan ? "#facc15" : "#e0e0e0ff",
                      }}
                    />
                  </div>
                </div>
                <div className="mx-2" onClick={() => handleDelete(recipe.id)}>
                  <DeleteOutline
                    style={{
                      color: "#e0e0e0ff",
                    }}
                  />
                </div>
              </div>
            </div>
          ))}
        </>
      )}
      {tab === "MealPlan" && (
        <>
          <MealPlan />
        </>
      )}
      {tab === "Groceries" && (
        <>
          <GroceryList />
        </>
      )}
      {tab === "NewRecipe" && (
        <>
          <NewRecipe resetToHome={resetToHome} />
        </>
      )}
    </div>
  );
}
