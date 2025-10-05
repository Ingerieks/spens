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
} from "@mui/icons-material";

import Link from "next/link";
import MealPlan from "../components/mealplan";
import { Tooltip } from "@mui/material";
import GroceryList from "../components/groceries";

export default function RecipePage() {
  const { data: session, status } = useSession();
  const [tab, setTab] = useState("Recipes");
  const router = useRouter();

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/auth/signin");
    }
  }, [status, router]);

  if (status === "loading") {
    return <p>Loading...</p>;
  }
  return (
    <div className="mt-4 ">
      <div className="my-4 mx-2">
        <button
          className={`rounded-xs p-2 ${
            tab === "Recipes" ? "bg-gray-100" : "border border-gray-200"
          }`}
          onClick={() => setTab("Recipes")}
        >
          Recipes
        </button>
        <button
          className={`rounded-xs p-2 mx-2 ${
            tab === "MealPlan" ? "bg-gray-100" : "border border-gray-200"
          }`}
          onClick={() => setTab("MealPlan")}
        >
          Meal Plan
        </button>
        <button
          className={`rounded-xs p-2 ${
            tab === "Groceries" ? "bg-gray-100" : "border border-gray-200"
          }`}
          onClick={() => setTab("Groceries")}
        >
          Groceries
        </button>
      </div>
      {tab === "Recipes" && (
        <>
          {recipes.map((recipe, index) => (
            <Link key={index} href={`/recipes/${recipe._id}`} className="">
              <div className="border border-gray-200 rounded-xs p-2 m-2">
                <h1 className="text-lg">{recipe.recipeName}</h1>
                <div className="mt-2 flex flex-row justify-between">
                  <div className="flex flex-row">
                    {recipe.groceries && (
                      <div className="mx-2">
                        <ShoppingCartOutlined style={{ color: "#facc15" }} />
                        {/* <p className="bg-yellow-400 px-2 rounded-xs text-xs">
                          groceries
                        </p> */}
                      </div>
                    )}
                    {recipe.mealPlan && (
                      <div className="mx-2">
                        <PlaylistAddCheckOutlined
                          style={{ color: "#facc15" }}
                        />
                        {/* <p className="bg-yellow-400 px-2 rounded-xs text-xs">
                          meal plan
                        </p> */}
                      </div>
                    )}
                  </div>
                </div>
                {/* <div className="flex flex-row">
              {recipe.labels.map((label, index) => (
                <h3
                  className="border border-gray-200 rounded-full px-2 py-1 mr-2 mt-6"
                  key={index}
                >
                  {label}
                </h3>
              ))}
            </div> */}
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
    </div>
  );
}
