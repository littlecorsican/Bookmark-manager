import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();


export async function GET(req: Request, { params }: { params: { name: string } }) {
  const { name } = params;

  try {
    if (!name || typeof name !== "string") {
      return NextResponse.json({ error: "Tag name is required" }, { status: 400 });
    }

    // Find the tag using Prisma
    const tag = await prisma.tag.findUnique({
      where: { name },
    });

    if (!tag) {
      return NextResponse.json({ error: "Tag not found" }, { status: 404 });
    }

    return NextResponse.json({ data: tag }, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Failed to fetch tag" }, { status: 500 });
  }
}



export async function DELETE(req: Request, { params }: { params: { name: string } }) {
  const { name } = params;

  try {

    const tag = await prisma.tag.findUnique({
      where: { name },
    });

    if (!tag) {
      return NextResponse.json({ error: "Tag not found" }, { status: 404 });
    }

    await prisma.tag.delete({
      where: { name },
    });

    return NextResponse.json({ message: "Tag deleted successfully" }, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Failed to delete tag" }, { status: 500 });
  }
}
