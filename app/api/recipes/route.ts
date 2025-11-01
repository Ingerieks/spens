"use server";
import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "../../../src/generated/prisma";

const prisma = new PrismaClient();

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    const newRecipe = await prisma.recipe.create({
      data: body,
    });

    return NextResponse.json(newRecipe, { status: 201 });
  } catch (e) {
    console.log("error", e);
    return { success: false };
  }
}

export async function GET() {
  try {
    const recipes = await prisma.recipe.findMany({
      orderBy: { createdAt: "desc" },
    });

    return NextResponse.json(recipes, { status: 200 });
  } catch (error) {
    console.error("Error fetching recipes:", error);
    return NextResponse.json(
      { error: "Failed to fetch recipes" },
      { status: 500 }
    );
  }
}
