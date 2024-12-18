import { NextResponse } from "next/server";
import { Op, fn, col } from "sequelize";
import models from "../../../../models";
import { z } from "zod";

export async function GET(req: Request, { params }: { params: { name: string } }) {
    const { name } = params; 
  
    try {
      if (!name || typeof name !== "string") {
        return NextResponse.json({ error: "Tag name is required" }, { status: 400 });
      }

      console.log("route name", name)
  
      const tag = await models.Tag.findOne({
        where: { name },
      });

      console.log("route tag", tag)
  
      if (!tag) {
        return NextResponse.json({ error: "Tag not found" }, { status: 404 });
      }
  
      return NextResponse.json({ data: tag }, { status: 200 });
    } catch (error) {
      console.error(error);
      return NextResponse.json({ error: "Failed to fetch tag" }, { status: 500 });
    }
  }