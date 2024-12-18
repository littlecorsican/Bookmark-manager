import { NextResponse } from "next/server";
import { Op, fn, col } from "sequelize";
import models from "../../../models";
import { z } from "zod";

export async function GET(req: Request) {
  try {

    const { count, rows } = await models.Tag.findAndCountAll();

    const result = {
        data: rows,
        totalItems: count,
    };

    return NextResponse.json(result, { status: 200 });
  } catch (error) {
    console.error("error", error)
    return NextResponse.json({ error: "Failed to fetch data" }, { status: 500 });
  }
}


export async function POST(req: Request) {
  try {
    const body = await req.json();
    console.log("body", body)

    const schema = z.object({
      name: z.string(),
    });
    schema.parse(body)

    const newEntry = await models.Tag.create({
      ...body
    });
    console.log('Tag created:', newEntry.toJSON());
    const response = { message: "New tag created", data: newEntry };

    return NextResponse.json(response, { status: 201 });
  } catch (error) {
    console.error(error)
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
    });
    schema.parse(body)

    const updatedEntry = await models.Tag.update(
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
    await models.Tag.destroy({
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
