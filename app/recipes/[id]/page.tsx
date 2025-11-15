"use client";

import { useParams } from "next/navigation";
import { recipes } from "@/mockData/recipes";
import { useEffect, useState } from "react";
import {
  EditOutlined,
  ArrowBackOutlined,
  ShoppingCartOutlined,
  PlaylistAddOutlined,
  ViewWeekOutlined,
} from "@mui/icons-material";
import Link from "next/link";
import { Box, Modal } from "@mui/material";
import AddToMealPlan from "@/app/components/mealPlanModal";
import { IRecipes } from "@/lib/interfaces/IRecipes";
export default function RecipeDetailPage() {
  const { id } = useParams();
  const [tab, setTab] = useState("Ingredients");
  const [selectedRecipe, setSelectedRecipe] = useState<IRecipes | null>(null);
  const [mealPlanModal, setMealPlanModal] = useState(false);

  const modalStyle = {
    position: "absolute" as const,
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    border: "2px solid #e2e2e2ff",
    boxShadow: 12,
    p: 4,
  };

  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        const res = await fetch(`/api/recipes/${id}`);
        const data = await res.json();
        setSelectedRecipe(data);
      } catch (error) {
        console.error("Error fetching recipes:", error);
      } finally {
      }
    };

    fetchRecipes();
  }, []);

  return (
    <main className="mx-2 mt-4">
      <Link href="/recipes">
        <div className="mb-4">
          <ArrowBackOutlined fontSize="large" style={{ color: "#b8b8b8ff" }} />
        </div>
      </Link>
      <div className="p-2 border border-gray-100 rounded-xs">
        <h1 className="text-xl font-bold">{selectedRecipe?.recipeName}</h1>
        <div className="my-4">
          <button
            className={`rounded-xs p-2 ${
              tab === "Ingredients" ? "bg-yellow-300" : "border border-gray-100"
            }`}
            onClick={() => setTab("Ingredients")}
          >
            Ingredients
          </button>
          <button
            className={`rounded-xs p-2 mx-2 ${
              tab === "Instructions"
                ? "bg-yellow-300"
                : "border border-gray-100"
            }`}
            onClick={() => setTab("Instructions")}
          >
            Instructions
          </button>
        </div>
        {tab === "Ingredients" ? (
          <>
            <div>
              <div className="flex flex-row my-6">
                <div className="mx-3">
                  <button>
                    <ShoppingCartOutlined
                      style={{
                        color: selectedRecipe?.groceries
                          ? "#facc15"
                          : "#b8b8b8ff",
                      }}
                    />
                  </button>
                </div>
                <div className="mx-3">
                  <button onClick={() => setMealPlanModal(true)}>
                    <ViewWeekOutlined style={{ color: "#b8b8b8ff" }} />
                  </button>
                </div>
                <div className="mx-3">
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
