import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
// import { z } from "zod";


const prisma = new PrismaClient();

export async function GET(
    req: Request,
    { params }: { params: { id: string } }
  ) {
    const { id } = params;
    console.log("id", id)
  
    if (!id) {
      return NextResponse.json(
        { error: "Bookmark id is missing" },
        { status: 400 }
      );
    }
  
    try {
      const bookmark = await prisma.bookmark.findUnique({
        where: { id: Number(id) },
      });
  
      if (!bookmark) {
        return NextResponse.json(
          { error: "Bookmark not found" },
          { status: 404 }
        );
      }
  
      return NextResponse.json(
        { message: "success", data: bookmark },
        { status: 200 }
      );
    } catch (error) {
      console.error("Error fetching bookmark:", error);
      return NextResponse.json(
        { error: "Failed to get bookmark" },
        { status: 500 }
      );
    }
  }