interface IAddGroceries {
  recipeId: number;
  ingredients: string[];
  ingredientsAdded: boolean;
}

export async function deletRecipe(id: number) {
  if (!confirm("Are you sure you want to delete this recipe?")) return;

  const res = await fetch(`/api/recipes/${id}`, {
    method: "DELETE",
  });

  if (res.ok) {
    const message = "success";
    return { message };
  } else {
    console.error("Failed to delete recipe");
    const message = "failed";
    return { message };
  }
}

export async function addGroceries({
  recipeId,
  ingredients,
  ingredientsAdded,
}: IAddGroceries) {
  try {
    const res = await fetch("/api/groceries", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        ingredients: ingredients,
        recipeId: recipeId,
        ingredientsAdded: ingredientsAdded,
      }),
    });
    if (res.ok) {
      const message = "Added to groceries!";
      console.log(message);
      return message;
    } else {
      const message = "Failed to add to groceries";
      console.error(message);
      return message;
    }
  } catch (err) {
    console.error(err);
  }
}
