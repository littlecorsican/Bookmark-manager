import { NextResponse } from "next/server";
import { Op, fn, col } from "sequelize";
import models from "../../../models";


export async function POST(req: Request) {

  const body = await req.json();
  console.log("body", body)
  const url = body.url

  try {
    if (!url || typeof url !== "string") {
      return NextResponse.json({ error: "URL is required" }, { status: 400 });
    }

    const bookmark = await models.Bookmark.findOne({
      where: { url },
    });

    if (!bookmark) {
      return NextResponse.json({ error: "Bookmark not found" }, { status: 404 });
    }

    return NextResponse.json({ data: bookmark }, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Failed to fetch bookmark" }, { status: 500 });
  }
}