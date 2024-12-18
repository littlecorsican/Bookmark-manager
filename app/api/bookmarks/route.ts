import { NextResponse } from "next/server";
// const { Bookmark } = require('./models');
import { Op, fn, col } from "sequelize";
import models from "../../../models";
import { z } from "zod";
import sequelize from "sequelize";


export async function GET(req: Request) {
  try {

    interface PaginatedResult<T> {
      data: T[];
      currentPage: number;
      totalPages: number;
      totalItems: number;
    }

    async function getPaginatedBookmarks(page: number, limit: number): Promise<PaginatedResult<Bookmark>> {
      try {
        // Default values for page and limit
        const pageNumber = page || 1;
        const pageSize = limit || 10;
    
        // Offset calculation
        const offset = (pageNumber - 1) * pageSize;
    
        // Fetch data with count and limit
        const { count, rows } = await models.Bookmark.findAndCountAll({
          include: [{ model: models.Tag, as: "tags"}],
          offset,
          limit: pageSize,
          order: [["createdAt", "DESC"]],
        });
    
        // Total pages
        const totalPages = Math.ceil(count / pageSize);
    
        return {
          data: rows,
          currentPage: pageNumber,
          totalPages,
          totalItems: count,
        };
      } catch (error: unknown) {
        throw new Error(`Failed to fetch bookmarks: ${error?.message}`);
      }
    }
    
    const url = new URL(req.url);
    const page = parseInt(url.searchParams.get("page") || "1");
    const limit = parseInt(url.searchParams.get("limit") || "10");

    console.log("page", page)

    const result = await getPaginatedBookmarks(page, limit);
    console.log("", result)

    return NextResponse.json(result, { status: 200 });
  } catch (error) {
    console.error("error", error)
    return NextResponse.json({ error: "Failed to fetch data" }, { status: 500 });
  }
}


export async function POST(req: Request) {
  const transaction = await models.sequelize.transaction();
  try {
    const body = await req.json();
    console.log("body", body)

    const schema = z.object({
      title: z.string(),
      url: z.string().url(),
      description: z.string().optional(),
      // tags: 
      // count: z.number(),
      // last_visited: z.date().optional(),
    });
    schema.parse(body)

    // return NextResponse.json({}, { status: 201 });

    const newEntry = await models.Bookmark.create({
      ...body
    } ,{ transaction: transaction });

    // insert relationship

    for (const tag of body.tags) {
      if (!tag.id) {
        throw new Error("Tag id is missing");
      }

      const newRelationship = await models.BookmarkTags.create({
        bookmarkId: newEntry.id,
        tagId: tag.id,
      }, { transaction: transaction });

      console.log("newRelationship", newRelationship);
    }

    await transaction.commit();

    console.log('Bookmark created:', newEntry.toJSON());
    const response = { message: "New bookmark created", data: newEntry };

    return NextResponse.json(response, { status: 201 });
  } catch (error) {
    console.error(error)
    await transaction.rollback();
    return NextResponse.json({ error: "Failed to process request" }, { status: 500 });
  }
}

export async function PUT(req: Request) {
  try {
    const body = await req.json();
    const id = body.id

    const schema = z.object({
      id: z.number(),
      title: z.string().optional(),
      description: z.string().optional(),
    });
    schema.parse(body)

    const updatedEntry = await models.Bookmark.update(
      {
        ...body
      },
      {
        where: {
          id
        },
      },
    );

    const response = { message: "PUT request received", data: updatedEntry };
    return NextResponse.json(response, { status: 200 });
  } catch (error) {
    console.error(error)
    return NextResponse.json({ error: "Failed to update data" }, { status: 500 });
  }
}

export async function DELETE(req: Request) {
  try {
    const body = await req.json();
    const id = body.id

    const schema = z.object({
      id: z.number(),
    });
    schema.parse(body)
    await models.Bookmark.destroy({
      where: {
        id,
      },
    });
    return NextResponse.json({ message: "DELETE request received" }, { status: 200 });
  } catch (error) {
    console.error(error)
    return NextResponse.json({ error: "Failed to delete data" }, { status: 500 });
  }
}
