"use client";

import { useEffect, useState } from "react";

export default function GroceryList() {
  const [loading, setLoading] = useState(true);
  const [allGroceries, setAllGroceries] = useState([]);

  useEffect(() => {
    const fetchGroceries = async () => {
      try {
        const res = await fetch("/api/groceries");
        const data = await res.json();
        setAllGroceries(data[0].groceryList);
      } catch (error) {
        console.error("Error fetching recipes:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchGroceries();
  }, []);

  return (
    <div className="px-4 my-6">
      {allGroceries.map((list, index) => (
        <div
          key={index}
          className="flex items-center my-4 border-b border-gray-100"
        >
          <button className="p-2">{list}</button>
        </div>
      ))}
    </div>
  );
}
