"use client";

import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";
import { mealPlan } from "@/mockData/recipes";
import { useState } from "react";

export default function MealPlan() {
  const [showRecipes, setShowRecipes] = useState(false);
  return (
    <div className="px-4 my-6">
      <div>
        <h1 className="mx-2 text-gray-400">Week 1</h1>
        {mealPlan.map((item, index) => (
          <div key={index}>
            {item.week === "Week 1" && (
              <div className="border border-gray-200 rounded-xs p-2 my-2">
                <h3>{item.day}</h3>
              </div>
            )}
          </div>
        ))}
      </div>
      <div className="mt-6">
        <h1 className="mx-2 text-gray-400">Week 2</h1>
        {mealPlan.map((item) => (
          <>
            {item.week === "Week 2" && (
              <div className="border border-gray-200 rounded-xs p-2 my-2">
                <h3>{item.day}</h3>
              </div>
            )}
          </>
        ))}
      </div>
    </div>
  );
}
