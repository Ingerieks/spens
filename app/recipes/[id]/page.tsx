"use client";

import { useParams } from "next/navigation";
import { recipes } from "@/mockData/recipes";
import { useState } from "react";
import {
  EditOutlined,
  ArrowBackOutlined,
  ShoppingCartOutlined,
} from "@mui/icons-material";
import Link from "next/link";
export default function RecipeDetailPage() {
  const { id } = useParams();
  const [tab, setTab] = useState("Ingredients");
  const selectedRecipe = recipes.find((recipe) => recipe._id.toString() === id);

  return (
    <main className="mx-2 mt-4">
      <Link href="/recipes">
        <div className="mb-4">
          <ArrowBackOutlined style={{ color: "#b8b8b8ff" }} />
        </div>
      </Link>
      <div className="p-2 border border-gray-200 rounded-xs">
        <h1 className="text-xl font-bold">{selectedRecipe?.recipeName}</h1>
        <div className="my-4">
          <button
            className={`rounded-xs p-2 ${
              tab === "Ingredients" ? "bg-yellow-400" : "border border-gray-200"
            }`}
            onClick={() => setTab("Ingredients")}
          >
            Ingredients
          </button>
          <button
            className={`rounded-xs p-2 mx-2 ${
              tab === "Instructions"
                ? "bg-yellow-400"
                : "border border-gray-200"
            }`}
            onClick={() => setTab("Instructions")}
          >
            Instructions
          </button>
        </div>
        {tab === "Ingredients" ? (
          <>
            <div>
              <div className="flex flex-row my-4">
                <div className="mx-2">
                  <ShoppingCartOutlined style={{ color: "#b8b8b8ff" }} />
                </div>
                <div>
                  <EditOutlined style={{ color: "#b8b8b8ff" }} />
                </div>
              </div>
              {selectedRecipe?.ingredients.map((ingredient, index) => (
                <ul className="list-disc px-4" key={index}>
                  <li className="my-2">{ingredient}</li>
                </ul>
              ))}
            </div>
          </>
        ) : tab === "Instructions" ? (
          <>
            <div>
              <div className="flex flex-row my-4">
                <div>
                  <EditOutlined style={{ color: "#b8b8b8ff" }} />
                </div>
              </div>
              <p>{selectedRecipe?.instructions}</p>
            </div>
          </>
        ) : (
          <></>
        )}
      </div>
    </main>
  );
}
