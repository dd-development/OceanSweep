import { NextResponse } from "next/server";
import { prisma } from "../../lib/prisma";

//TODO - Pagination
export async function GET() {
  try {
    const events = await prisma.content.findMany({
      where: {
        type: "EVENT",
      },
      include: {
        events: true,
        users: {
          select: {
            firstname: true,
            lastname: true,
            image: true,
          },
        },
      },
      distinct: ["id"],
    });

    const sortedEvents = events.sort((a, b) => {
      const dateA = a.events[0]?.scheduleddate
        ? new Date(a.events[0].scheduleddate)
        : new Date(0);
      const dateB = b.events[0]?.scheduleddate
        ? new Date(b.events[0].scheduleddate)
        : new Date(0);
      return dateA.getTime() - dateB.getTime();
    });

    const eventsWithAuthors = sortedEvents.map((event) => ({
      ...event,
      scheduleddate: event.events[0]?.scheduleddate,
      author: event.users ? {
        firstname: event.users.firstname,
        lastname: event.users.lastname,
        image: event.users.image,
      } : null,
    }));

    return NextResponse.json(eventsWithAuthors);

  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch events" },
      { status: 500 }
    );
  }
}
