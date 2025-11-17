import { PrismaClient } from "../../../../src/generated/prisma";
import { NextRequest, NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function POST(req: Request) {
  try {
    const { id, completed } = await req.json();

    const updated = await prisma.groceryItem.update({
      where: { id },
      data: { completed },
    });

    return NextResponse.json({ success: true, item: updated });
  } catch (err) {
    return NextResponse.json({ error: "Failed to update" }, { status: 500 });
  }
}
