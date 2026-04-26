import { NextRequest, NextResponse } from "next/server"
import { revalidateTag } from "next/cache"

export const runtime = "nodejs"
export const dynamic = "force-dynamic"

export async function GET(req: NextRequest) {
  return handleRevalidate(req)
}

export async function POST(req: NextRequest) {
  return handleRevalidate(req)
}

async function handleRevalidate(req: NextRequest) {
  try {
    const searchParams = req.nextUrl.searchParams
    const tag = searchParams.get("tag")
    const secret = searchParams.get("secret")

    if (secret !== process.env.REVALIDATE_SECRET) {
      return NextResponse.json({ error: "Invalid secret" }, { status: 401 })
    }

    if (!tag) {
      return NextResponse.json({ error: "No tag provided" }, { status: 400 })
    }

    const tagsArray = tag.split(",").map((t) => t.trim()).filter(Boolean)
    for (const t of tagsArray) {
      revalidateTag(t)
    }

    return NextResponse.json({ revalidated: true, now: Date.now(), tags: tagsArray }, { status: 200 })
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unknown error"
    return NextResponse.json({ error: "Revalidation failed", message }, { status: 500 })
  }
}
