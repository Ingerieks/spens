// app/api/groceries/route.ts
import { PrismaClient } from "../../../src/generated/prisma";
import { NextRequest, NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function GET() {
  try {
    const groceries = await prisma.grocery.findMany();
    return NextResponse.json(groceries, { status: 200 });
  } catch (error) {
    console.error("Error fetching groceries:", error);
    return NextResponse.json(
      { error: "Failed to fetch groceries" },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { ingredients, recipeId, ingredientsAdded } = body;

    if (!ingredients || !Array.isArray(ingredients)) {
      return NextResponse.json(
        { error: "Invalid ingredients" },
        { status: 400 }
      );
    }

    const existing = await prisma.grocery.findFirst();

    let updatedGroceries;
    if (!ingredientsAdded) {
      if (existing) {
        const mergedList = Array.from(
          new Set([...existing.groceryList, ...ingredients])
        );
        updatedGroceries = await prisma.grocery.update({
          where: { id: existing.id },
          data: { groceryList: mergedList },
        });
      } else {
        updatedGroceries = await prisma.grocery.create({
          data: { groceryList: ingredients, accessList: [] },
        });
      }
      if (updatedGroceries) {
        await prisma.recipe.update({
          where: { id: recipeId },
          data: { groceries: true },
        });
      }
      return NextResponse.json(updatedGroceries, { status: 200 });
    } else {
      if (!existing) {
        return NextResponse.json(
          { error: "No grocery list found" },
          { status: 404 }
        );
      }
      let updatedList = [...existing.groceryList];
      for (const item of ingredients) {
        const index = updatedList.findIndex(
          (i) => i.toLowerCase() === item.toLowerCase()
        );
        if (index !== -1) {
          updatedList.splice(index, 1);
        }
      }

      const updatedGroceries = await prisma.grocery.update({
        where: { id: existing.id },
        data: { groceryList: updatedList },
      });
      if (updatedGroceries) {
        await prisma.recipe.update({
          where: { id: recipeId },
          data: { groceries: false },
        });
      }
      return NextResponse.json(updatedGroceries, { status: 200 });
    }
  } catch (error) {
    console.error("Error adding groceries:", error);
    return NextResponse.json(
      { error: "Failed to add groceries" },
      { status: 500 }
    );
  }
}
