
import { NextResponse } from "next/server";
import { prisma } from "../../../lib/prisma";

// GET event details including RSVP count and comments
export async function GET(
  req: Request,
  { params }: { params: { id: string } }
) {
  const eventParam = await params;
  const eventId = Number(eventParam.id);
  console.log("eventId ", eventId);

  // Validate eventId
  if (!eventId || isNaN(eventId)) {
    return NextResponse.json({ error: "Invalid Event ID" }, { status: 400 });
  }

  try {
    // Fetch event details
    const event = await prisma.events.findFirst({
      where: { contentid: eventId }, // eventId here is actually a contentId now
      include: {
        content: {
          select: {
            title: true,
            description: true,
            image: true,
            address: true,
            city: true,
            statecode: true,
            zip: true,
          },
        },
        comments: {
          include: {
            user: { select: { id: true, firstname: true, lastname: true } },
          },
          orderBy: { createdDate: "desc" },
        },
        _count: {
          select: {
            event_rsvps: {
              where: {
                status: "GOING",
              },
            },
          },
        },
      },
    });
    

    // If event is not found, return 404
    if (!event) {
      return NextResponse.json({ error: "Event not found" }, { status: 404 });
    }

    const { address, city, statecode, zip } = event.content || {};
    const formattedAddress = address && city && statecode && zip
      ? `${address}, ${city}, ${statecode} ${zip}`
      : "Address not available";

    // Return the event data
    return NextResponse.json({
        ...event,
        rsvpCount: event._count.event_rsvps,  // Explicitly adding RSVP count
        address: formattedAddress,
      }, { status: 200 });
  } catch (error) {
    console.error("Error fetching event:", error);
    return NextResponse.json(
      { error: "Failed to fetch event" },
      { status: 500 }
    );
  }
}