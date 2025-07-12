import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { z } from "zod";


export async function GET(req: Request, { params }: { params: { id: string } }) {
  const { id } = await Promise.resolve(params);
  const numericId = parseInt(id, 10);

  try {
    const updatedBookmark = await prisma.bookmark.update({
      where: { id: numericId },
      data: {
        count: { increment: 1 },
        last_visited: new Date(),
      },
    });

    return NextResponse.json({ data: updatedBookmark }, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Failed to update bookmark" }, { status: 500 });
  }
}
