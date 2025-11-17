// app/api/groceries/route.ts
import { PrismaClient } from "../../../src/generated/prisma";
import { NextRequest, NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function GET() {
  try {
    const groceryItems = await prisma.groceryItem.findMany();
    return NextResponse.json(groceryItems, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Failed to fetch groceries" },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    const { ingredients, recipeId, ingredientsAdded } = await req.json();

    if (!ingredients || !Array.isArray(ingredients)) {
      return NextResponse.json(
        { error: "Invalid ingredients" },
        { status: 400 }
      );
    }

    let grocery = await prisma.grocery.findFirst();
    if (!grocery) {
      grocery = await prisma.grocery.create({ data: {} });
    }

    const groceryId = grocery.id;

    if (!ingredientsAdded) {
      const ingredientObjects = ingredients.map((name: string) => ({
        name: name.trim(),
        completed: false,
        groceryId,
      }));

      await prisma.groceryItem.createMany({ data: ingredientObjects });

      await prisma.recipe.update({
        where: { id: recipeId },
        data: { groceries: true },
      });

      return NextResponse.json({ message: "Added groceries" }, { status: 200 });
    } else {
      await prisma.groceryItem.deleteMany({
        where: {
          groceryId,
          name: { in: ingredients.map((i: string) => i.trim()) },
        },
      });

      await prisma.recipe.update({
        where: { id: recipeId },
        data: { groceries: false },
      });

      return NextResponse.json(
        { message: "Removed groceries" },
        { status: 200 }
      );
    }
  } catch (error) {
    console.error("Error toggling groceries:", error);
    return NextResponse.json(
      { error: "Failed to update groceries" },
      { status: 500 }
    );
  }
}
