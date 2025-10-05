"use client";

import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";
import { groceries } from "@/mockData/recipes";
import { useState } from "react";
import { KeyboardArrowDown } from "@mui/icons-material";
import { InputLabel, MenuItem, Select } from "@mui/material";
import SubmitButton from "@/lib/ui/SubmitButton";

export default function AddToMealPlan() {
  function handleChange() {
    console.log("test");
  }

  const days = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday",
  ];

  function handleSubmit() {}

  return (
    <div className="">
      <form>
        <h1 className="text-lg">Add this recipe to your meal plan</h1>
        <InputLabel className="my-4" id="demo-simple-select-label">
          Week
        </InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          className="w-full"
          //value={age}
          label="Week"
          onChange={handleChange}
        >
          <MenuItem value={1}>Week 1</MenuItem>
          <MenuItem value={2}>Week 2</MenuItem>
          <MenuItem value={3}>Week 3</MenuItem>
        </Select>
        <InputLabel className="my-4" id="demo-simple-select-label">
          Day
        </InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          className="w-full"
          //value={age}
          label="day"
          onChange={handleChange}
        >
          {days.map((day) => (
            <MenuItem value={1}>{day}</MenuItem>
          ))}
        </Select>
        <div className="flex flex-row justify-end my-4">
          <div className="mx-2">
            <SubmitButton text="Cancel" type="cancel" />
          </div>
          <SubmitButton text="Add" type="submit" />
        </div>
      </form>
    </div>
  );
}
