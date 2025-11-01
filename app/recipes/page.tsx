"use client";

import { useSession, signIn, signOut } from "next-auth/react";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { recipes, mealPlan } from "@/mockData/recipes";
import {
  PeopleAltOutlined,
  ShoppingCartOutlined,
  PlaylistAddOutlined,
  PlaylistAddCheckOutlined,
  AddOutlined,
  ViewWeekOutlined,
} from "@mui/icons-material";
import Link from "next/link";
import MealPlan from "../components/mealplan";
import { Tooltip } from "@mui/material";
import GroceryList from "../components/groceries";
import NewRecipe from "../components/newRecipe";
import { IRecipes } from "@/lib/interfaces/IRecipes";

export default function RecipePage() {
  const { data: session, status } = useSession();
  const [tab, setTab] = useState("Recipes");
  const [loading, setLoading] = useState(true);
  const [allRecipes, setAllRecipes] = useState<IRecipes[]>([]);
  const router = useRouter();

  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        const res = await fetch("/api/recipes");
        const data = await res.json();
        console.log("recipe data", data);
        setAllRecipes(data);
      } catch (error) {
        console.error("Error fetching recipes:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchRecipes();
  }, []);

  if (status === "loading") {
    return <p>Loading...</p>;
  }

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
            <Link key={index} href={`/recipes/${recipe.id}`} className="">
              <div className="border border-gray-100 rounded-xs p-2 m-2">
                <h1 className="text-lg">{recipe.recipeName}</h1>
                <div className="mt-2 flex flex-row justify-between">
                  <div className="flex flex-row">
                    <div className="mx-2">
                      <ShoppingCartOutlined
                        style={{
                          color: recipe.groceries ? "#facc15" : "#e0e0e0ff",
                        }}
                      />
                    </div>
                    <div className="mx-2">
                      <ViewWeekOutlined
                        style={{
                          color: recipe.mealPlan ? "#facc15" : "#e0e0e0ff",
                        }}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </Link>
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
          <NewRecipe />
        </>
      )}
    </div>
  );
}
