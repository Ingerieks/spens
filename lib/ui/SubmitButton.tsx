"use client";

import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";
import { groceries } from "@/mockData/recipes";
import { useState } from "react";
import { KeyboardArrowDown } from "@mui/icons-material";

type SubmitButtonProps = {
  text: string;
  type: string;
};

export default function SubmitButton({ text, type }: SubmitButtonProps) {
  return (
    <div>
      <button
        className={`px-4 py-2 rounded-xs ${
          type === "submit"
            ? "bg-yellow-400 border border-yellow-400"
            : "bg-white border border-gray-200"
        }`}
      >
        {text}
      </button>
    </div>
  );
}
