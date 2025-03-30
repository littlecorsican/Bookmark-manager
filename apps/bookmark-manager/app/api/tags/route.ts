import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { z } from "zod";

const prisma = new PrismaClient();

export async function GET(req: Request) {
  try {
    // Retrieve all tags and their count concurrently.
    const [tags, count] = await Promise.all([
      prisma.tag.findMany(),
      prisma.tag.count(),
    ]);

    const result = {
      data: tags,
      totalItems: count,
    };

    return NextResponse.json(result, { status: 200 });
  } catch (error) {
    console.error("error", error);
    return NextResponse.json({ error: "Failed to fetch data" }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    console.log("body", body);

    // Validate the input using Zod.
    const schema = z.object({
      name: z.string(),
    });
    const parsedBody = schema.parse(body);

    // Check if the tag already exists.
    const existingTag = await prisma.tag.findUnique({
      where: { name: parsedBody.name },
    });

    if (existingTag) {
      return NextResponse.json({ error: "Tag already exists" }, { status: 400 });
    }

    // Create a new tag.
    const newEntry = await prisma.tag.create({
      data: {
        name: parsedBody.name,
      },
    });

    console.log("Tag created:", newEntry);
    const response = { message: "New tag created", data: newEntry };

    return NextResponse.json(response, { status: 201 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Failed to process request" }, { status: 500 });
  }
}


export async function PUT(req: Request) {
  try {
    const body = await req.json();

    // For updating, we expect both the current tag name and the new desired name.
    const schema = z.object({
      currentName: z.string(),
      newName: z.string(),
    });
    const parsedBody = schema.parse(body);

    // Update the tag's name.
    const updatedEntry = await prisma.tag.update({
      where: { name: parsedBody.currentName },
      data: { name: parsedBody.newName },
    });

    const response = { message: "Tag updated", data: updatedEntry };
    return NextResponse.json(response, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Failed to update data" }, { status: 500 });
  }
}

// export async function DELETE(req: Request) {
//   try {
//     const body = await req.json();

//     // For deletion, expect the tag name.
//     const schema = z.object({
//       name: z.string(),
//     });
//     const parsedBody = schema.parse(body);

//     // Delete the tag using its unique name.
//     await prisma.tag.delete({
//       where: { name: parsedBody.name },
//     });
//     return NextResponse.json({ message: "Tag deleted" }, { status: 200 });
//   } catch (error) {
//     console.error(error);
//     return NextResponse.json({ error: "Failed to delete data" }, { status: 500 });
//   }
// }
