"use client";

import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";
import { groceries } from "@/mockData/recipes";
import { useState } from "react";
import { KeyboardArrowDown } from "@mui/icons-material";

export default function GroceryList() {
  return (
    <div className="px-4 my-6">
      {groceries.groceryList.map((list, index) => (
        <div
          key={index}
          className="flex items-center my-4 border-b border-gray-200"
        >
          <button className="p-2">{list}</button>
        </div>
      ))}
    </div>
  );
}
