import { NextRequest, NextResponse } from "next/server";
import { prisma } from "../../lib/prisma";

// GET all comments for an event
export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const eventId = searchParams.get("eventId");

  if (!eventId) {
    return NextResponse.json({ error: "Event ID is required" }, { status: 400 });
  }

  try {
    const comments = await prisma.comments.findMany({
      where: { eventId: Number(eventId) },
      include: { user: { select: { id: true, firstname: true, lastname: true, image: true } } },
      orderBy: { createdDate: "desc" },
    });

    return NextResponse.json(comments, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch comments" }, { status: 500 });
  }
}

// POST a new comment
export async function POST(req: NextRequest) {
  const { content, eventId, userId } = await req.json();

  if (!content || !eventId || !userId) {
    return NextResponse.json({ error: "All fields are required" }, { status: 400 });
  }

  try {
    const newComment = await prisma.comments.create({
      data: { content, eventId: Number(eventId), userId: Number(userId) },
    });

    return NextResponse.json(newComment, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: "Failed to create comment" }, { status: 500 });
  }
}
