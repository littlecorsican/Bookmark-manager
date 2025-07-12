import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { z } from "zod";

interface PaginatedResult<T> {
  data: T[];
  currentPage: number;
  totalPages: number;
  totalItems: number;
}

async function getPaginatedBookmarks(page: number, limit: number): Promise<PaginatedResult<any>> {
  // Default values for page and limit
  const pageNumber = page || 1;
  const pageSize = limit || 10;

  // Calculate offset
  const offset = (pageNumber - 1) * pageSize;

  // Use Prisma to fetch bookmarks and the count in parallel
  const [bookmarks, count] = await Promise.all([
    prisma.bookmark.findMany({
      include: { tags: true },
      skip: offset,
      take: pageSize,
      orderBy: { created_at: "desc" },
    }),
    prisma.bookmark.count(),
  ]);

  const totalPages = Math.ceil(count / pageSize);

  return {
    data: bookmarks,
    currentPage: pageNumber,
    totalPages,
    totalItems: count,
  };
}

export async function GET(req: Request) {
  try {
    const url = new URL(req.url);
    const page = parseInt(url.searchParams.get("page") || "1");
    const limit = parseInt(url.searchParams.get("limit") || "10");

    // Validate input parameters
    if (page < 1 || limit < 1 || limit > 100) {
      return NextResponse.json(
        { error: "Invalid pagination parameters" },
        { status: 400 }
      );
    }

    const result = await getPaginatedBookmarks(page, limit);

    return NextResponse.json(result, { status: 200 });
  } catch (error) {
    console.error("Error fetching bookmarks:", error);
    
    if (error instanceof Error) {
      return NextResponse.json(
        { error: error.message },
        { status: 500 }
      );
    }
    
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

// export async function POST(req: Request) {
//   try {
//     const body = await req.json();
//     console.log("body", body);

//     // Extend the schema to allow optional tags (assumed to be provided as { name: string })
//     const schema = z.object({
//       title: z.string(),
//       url: z.string().url(),
//       description: z.string().optional(),
//       tags: z.array(z.object({ name: z.string() })).optional(),
//     });
//     const parsedBody = schema.parse(body);

//     // Create a new bookmark using Prisma.
//     // If tags are provided, connect them (assuming they already exist).
//     const newEntry = await prisma.bookmark.create({
//       data: {
//         title: parsedBody.title,
//         url: parsedBody.url,
//         description: parsedBody.description,
//         visited: 0, // set an initial value for visited
//         tags: parsedBody.tags ? { connect: parsedBody.tags } : undefined,
//       },
//       include: {
//         tags: true,
//       },
//     });

//     console.log("Bookmark created:", newEntry);
//     return NextResponse.json({ message: "New bookmark created", data: newEntry }, { status: 201 });
//   } catch (error) {
//     console.error(error);
//     return NextResponse.json({ error: "Failed to process request" }, { status: 500 });
//   }
// }

export async function PUT(req: Request) {
  try {
    const body = await req.json();
    const schema = z.object({
      id: z.number(),
      title: z.string().optional(),
      description: z.string().optional(),
    });
    const parsedBody = schema.parse(body);

    // Update the bookmark with the provided id using Prisma.
    const updatedEntry = await prisma.bookmark.update({
      where: { id: parsedBody.id },
      data: {
        title: parsedBody.title,
        description: parsedBody.description,
      },
    });

    return NextResponse.json({ message: "Bookmark updated", data: updatedEntry }, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Failed to update data" }, { status: 500 });
  }
}

export async function DELETE(req: Request) {
  try {
    const body = await req.json();
    const schema = z.object({
      id: z.number(),
    });
    const parsedBody = schema.parse(body);

    // Delete the bookmark using Prisma.
    await prisma.bookmark.delete({
      where: { id: parsedBody.id },
    });

    return NextResponse.json({ message: "Bookmark deleted" }, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Failed to delete data" }, { status: 500 });
  }
}
