import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { z } from "zod";
import { getTitleAndHTML } from "@/utils/helper";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    console.log("body", body);

    const tagSchema = z.object({
      name: z.string(),
      created_at: z.string().datetime().optional(),
    });

    const bookmarkSchema = z.object({
      title: z.string().optional(),
      url: z.string().url(),
      description: z.string().optional(),
      tags: z.array(tagSchema).optional(),
      html: z.string().optional() // actually its not going to be passed in by FE, just want to silence typescript warning
    });

    const parsedData = bookmarkSchema.parse(body);

    // Check if the bookmark already exists
    const existingBookmark = await prisma.bookmark.findFirst({
      where: { url: parsedData.url },
    });

    if (existingBookmark) {
      return NextResponse.json(
        { error: "Bookmark already exists" },
        { status: 400 }
      );
    }

    if (!parsedData.title || parsedData.title.trim() === "") {
      const titleAndHTML = await getTitleAndHTML(parsedData.url)
      parsedData.title = titleAndHTML.title;
      parsedData.html = titleAndHTML.html;
    }

    console.log("parsedData", parsedData);

    const newBookmark = await prisma.bookmark.create({
      data: {
        title: parsedData.title,
        url: parsedData.url,
        html: parsedData.html || "",
        description: parsedData.description,
        tags: parsedData.tags ? { create: parsedData.tags } : undefined,
      },
    });

    console.log("Bookmark created:", newBookmark);
    const responseBody = { message: "New bookmark created", data: newBookmark };

    return NextResponse.json(responseBody, { status: 201 });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Failed to create bookmark" },
      { status: 500 }
    );
  }
}
