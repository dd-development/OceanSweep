import { NextResponse } from "next/server";
import { prisma } from "@/app/lib/prisma";
import { getUserId } from "@/app/utility/useUser";

export async function GET() {
  try {
    // Get the user ID using the utility function
    const currentUserId = await getUserId();

    if (!currentUserId) {
      return NextResponse.json(
        { error: "Not authenticated or user not found" },
        { status: 401 }
      );
    }

    // Convert user ID to a number (TypeScript fix)
    const userIdNumber = Number(currentUserId);
    if (isNaN(userIdNumber)) {
      return NextResponse.json(
        { error: "Invalid user ID format" },
        { status: 500 }
      );
    }

    // Query user-created posts from `content`
    const userPosts = await prisma.content.findMany({
      where: {
        createdby: userIdNumber,
        type: "POST",
      },
    });

    // Query attending events by checking `eventAttendees`
    const attendingEvents = await prisma.event_rsvps.findMany({
      where: {
        userId: userIdNumber,
        status: "GOING",
      },
      include: {
        event: {
          select: {
            scheduleddate: true,
            content: true,
          },
        },
      },
    });

    // Return the data
    const sortedAttendingEvents = attendingEvents
      .filter((att) => att.event.content) // skip if content is null
      .map((att) => ({
        id: att.event.content!.id,
        ...att.event.content,
        scheduleddate: att.event.scheduleddate,
      }))
      .sort(
        (a, b) =>
          new Date(a.scheduleddate).getTime() -
          new Date(b.scheduleddate).getTime()
      ); // Sort in descending order

    // Return the sorted data
    return NextResponse.json({
      posts: userPosts,
      events: sortedAttendingEvents,
    });
  } catch (error) {
    console.error("Error in GET /api/dashboard:", error);
    return NextResponse.json(
      { error: "Something went wrong." },
      { status: 500 }
    );
  }
}
