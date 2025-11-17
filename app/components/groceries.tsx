"use client";

import { groceries } from "@/mockData/recipes";
import { useEffect, useState } from "react";

interface IGroceryList {
  item: string;
  count: number;
}

export default function GroceryList() {
  const [loading, setLoading] = useState(true);
  const [allGroceries, setAllGroceries] = useState<any>([]);

  useEffect(() => {
    const fetchGroceries = async () => {
      try {
        const res = await fetch("/api/groceries");
        const data = await res.json();
        setAllGroceries(data);
      } catch (error) {
        console.error("Error fetching recipes:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchGroceries();
  }, []);

  if (loading) {
    return (
      <div className="p-2">
        <h1>Is loading...</h1>
      </div>
    );
  }

  if (allGroceries.length === 0) {
    return (
      <div className="p-4 text-gray-400">
        <h1>No groceries have been added...</h1>
      </div>
    );
  }

  const toggleItem = async (id: number, completed: boolean) => {
    try {
      await fetch(`/api/groceries/complete`, {
        method: "POST",
        body: JSON.stringify({ id, completed }),
        headers: { "Content-Type": "application/json" },
      });

      setAllGroceries((prev) =>
        prev.map((g) => (g.id === id ? { ...g, completed } : g))
      );
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="px-4 my-6">
      <div className="px-4 my-6">
        {allGroceries.map((item: any) => (
          <div key={item.id}>
            {!item.completed && (
              <>
                {" "}
                <div className="flex items-center my-4 border-b border-gray-100">
                  <input
                    type="checkbox"
                    className="accent-yellow-300 h-6 w-6 border border-gray-200"
                    checked={item.completed}
                    onChange={() => toggleItem(item.id, !item.completed)}
                  />
                  <span
                    className={`ml-2 ${
                      item.completed ? "line-through text-gray-400" : ""
                    }`}
                  >
                    {item.name}
                  </span>
                </div>
              </>
            )}
          </div>
        ))}
        <div className="flex justify-end text-gray-400">
          <button>clear</button>
        </div>
        {allGroceries.map((item: any) => (
          <div key={item.id}>
            {item.completed && (
              <>
                {" "}
                <div className="flex items-center my-4 border-b border-gray-100">
                  <input
                    type="checkbox"
                    className="accent-yellow-300 h-6 w-6 border border-gray-200"
                    checked={item.completed}
                    onChange={() => toggleItem(item.id, !item.completed)}
                  />
                  <span
                    className={`ml-2 ${
                      item.completed ? "line-through text-gray-400" : ""
                    }`}
                  >
                    {item.name}
                  </span>
                </div>
              </>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
