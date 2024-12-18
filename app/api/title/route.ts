import { NextResponse } from "next/server";


export async function POST(req: Request) {
  try {
    const body = await req.json();
    console.log("body", body)
    const url = body.url
    const response = await fetch(url)
    const re = new RegExp('<title>(.*?)<\/title>');
    const response2 = await response.text()
    const title_re = re.exec(response2);
    console.log('title=>', title_re[1])

    return NextResponse.json({
        title : title_re[1] || ""
    }, { status: 200 });
  } catch (error) {
    console.error("error", error)
    return NextResponse.json({ error: "Failed to fetch data" }, { status: 500 });
  }
}
