import { NextRequest, NextResponse } from "next/server";
import { prisma } from "../../../../lib/prisma";

// POST: User RSVPs for an event
export async function POST(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const { userId, status } = await req.json();
  const eventParam = await params;
  const eventId = Number(eventParam.id);

  if (!userId || !eventId || !status) {
    console.error("Missing required fields:", { userId, eventId, status });
    return NextResponse.json(
      { error: "Missing required fields: userId, eventId, or status" },
      { status: 400 }
    );
  }

  const allowedStatuses = ["GOING", "NOT_GOING", "MAYBE"];
  if (!allowedStatuses.includes(status)) {
    console.error("Invalid status value:", status);
    return NextResponse.json(
      { error: "Invalid status value" },
      { status: 400 }
    );
  }

  try {
    // Ensure the event exists
    const event = await prisma.events.findUnique({
      where: { id: eventId },
    });

    if (!event) {
      console.error("Event not found:", eventId);
      return NextResponse.json({ error: "Event not found" }, { status: 404 });
    }

    // Upsert RSVP record
    const upsertResult = await prisma.event_rsvps.upsert({
      where: { userId_eventId: { userId, eventId } },
      update: { status },
      create: { userId, eventId, status },
    });

    console.log("Upsert result:", upsertResult);

    // Get updated RSVP count
    const rsvpCount = await prisma.event_rsvps.count({
      where: { eventId, status: "GOING" },
    });

    // Fetch the updated event with RSVP count
    const updatedEvent = await prisma.events.findUnique({
      where: { id: eventId },
      include: { content: true }, // Fetch associated content
    });

    if (!updatedEvent) {
      console.error("Updated event not found:", eventId);
      return NextResponse.json(
        { error: "Updated event not found" },
        { status: 404 }
      );
    }

    console.log("RSVP successful:", { userId, eventId, status });
    return NextResponse.json(
      { ...updatedEvent, rsvpCount: rsvpCount || 0 },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error in POST /api/events/[id]:", error);
    return NextResponse.json({ error: "Failed to RSVP" }, { status: 500 });
  }
}

// GET: Fetch a user's RSVP status for the event
export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const { searchParams } = new URL(req.url);
  const eventParam = await params;
  let userId = Number(searchParams.get("userId")); // Extract userId from query params
  const eventId = Number(eventParam.id);

  // Input validation
  if (!userId || !eventId) {
    return NextResponse.json(
      { error: "Missing required fields: userId or eventId" },
      { status: 400 }
    );
  }

  try {
    // Check if the event exists
    const event = await prisma.events.findUnique({
      where: { id: eventId },
    });

    if (!event) {
      return NextResponse.json({ error: "Event not found" }, { status: 404 });
    }

    // Fetch the user's RSVP status
    const rsvp = await prisma.event_rsvps.findUnique({
      where: { userId_eventId: { userId, eventId } },
      select: { status: true },
    });

    return NextResponse.json(
      { status: rsvp?.status || "NOT_RESPONDED" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error in GET /api/events/[id]:", error);
    return NextResponse.json(
      { error: "Failed to fetch RSVP status" },
      { status: 500 }
    );
  }
}
