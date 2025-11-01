"use client";

import { useParams } from "next/navigation";
import { recipes } from "@/mockData/recipes";
import { useState } from "react";
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
export default function RecipeDetailPage() {
  const { id } = useParams();
  const [tab, setTab] = useState("Ingredients");
  const selectedRecipe = recipes.find((recipe) => recipe._id.toString() === id);
  const [addedToList, setAddedToList] = useState(selectedRecipe?.groceries);
  const [mealPlanModal, setMealPlanModal] = useState(false);
  const [addedGroceries, setAddedGroceries] = useState<string[] | undefined>(
    selectedRecipe?.ingredients
  );

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

  function addGroceries() {
    console.log(
      "Add these groceries to the grocery list in the db:",
      addedGroceries
    );
    setAddedToList(true);
  }

  function closeModal() {
    setMealPlanModal(false);
  }

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
                  <button onClick={() => addGroceries()}>
                    <ShoppingCartOutlined
                      style={{ color: addedToList ? "#facc15" : "#b8b8b8ff" }}
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
        <Modal open={mealPlanModal} onClose={closeModal}>
          <Box sx={modalStyle}>
            <AddToMealPlan />
          </Box>
        </Modal>
      </div>
    </main>
  );
}
