"use client";

import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";
import { mealPlan } from "@/mockData/recipes";
import { useState } from "react";
import { KeyboardArrowDown } from "@mui/icons-material";

export default function MealPlan() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  return (
    <div className="px-4 my-6">
      <div>
        <h1 className="mx-2 text-gray-400">Week 1</h1>
        {mealPlan.map((item, index) => (
          <div key={index}>
            {item.week === "Week 1" && (
              <div className="border border-gray-200 rounded-xs p-2 my-2">
                <div className="flex flex-row justify-between">
                  <h1>{item.day}</h1>
                  <button
                    onClick={() =>
                      setOpenIndex(openIndex === index ? null : index)
                    }
                  >
                    <KeyboardArrowDown style={{ color: "#b8b8b8ff" }} />
                  </button>
                </div>
                {openIndex === index && (
                  <>
                    <ul className="list-disc px-4" key={index}>
                      {item.recipe.map((recipe, index) => (
                        <div key={index}>
                          <li className="my-2">{recipe}</li>
                        </div>
                      ))}
                    </ul>
                  </>
                )}
              </div>
            )}
          </div>
        ))}
      </div>
      <div className="mt-6">
        <h1 className="mx-2 text-gray-400">Week 2</h1>
        {mealPlan.map((item, index) => (
          <div key={index}>
            {item.week === "Week 2" && (
              <div className="border border-gray-200 rounded-xs p-2 my-2">
                <div className="flex flex-row justify-between">
                  <h1>{item.day}</h1>
                  <button
                    onClick={() =>
                      setOpenIndex(openIndex === index ? null : index)
                    }
                  >
                    <KeyboardArrowDown style={{ color: "#b8b8b8ff" }} />
                  </button>
                </div>
                {openIndex === index && (
                  <>
                    <ul className="list-disc px-4" key={index}>
                      {item.recipe.map((recipe, index) => (
                        <div key={index}>
                          <li className="my-2">{recipe}</li>
                        </div>
                      ))}
                    </ul>
                  </>
                )}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
