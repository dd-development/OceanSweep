import { notFound } from "next/navigation";
import CommentsSection from "./CommentsSection";
import BackButton from "./BackButton";
import ShareButton from "./ShareButton";
import RSVPSection from "./RSVPSection";
import EventImage from "./EventImage";

interface EventData {
  id: number;
  scheduleddate: string;
  content: {
    title: string;
    description: string;
    image?: string | null;
  };
  rsvpCount: number;
  address: string;
}

async function getEventData(eventId: string): Promise<EventData | null> {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/events/${eventId}`,
      {
        cache: "no-store",
      }
    );

    if (!response.ok) return null;
    return response.json();
  } catch {
    return null;
  }
}

export default async function EventPage({
  params,
}: {
  params: { id: string };
}) {
  const { id } = await params;
  if (!id) return notFound();

  // Fetch event data
  const event = await getEventData(id);
  if (!event) return notFound();

  return (
    <div className="max-w-7xl mx-auto px-6 py-12 bg-gray-50">
      <BackButton />

      {/* Event Card */}
      <div className="bg-white shadow-xl rounded-xl p-8 border border-gray-200">
        {/* Image Section */}
        {event.content.image && (
          <EventImage src={event.content.image} alt={event.content.title} />
        )}

        {/* Event Details */}
        <div className="mt-6 space-y-6">
          <div className="flex justify-between items-center">
            <h1 className="text-4xl font-extrabold text-gray-900">
              {event.content.title}
            </h1>
            <ShareButton eventTitle={event.content.title} eventId={event.id} />
          </div>

          <p className="text-gray-600 text-lg">{event.content.description}</p>

          {/* Scheduled Date & Address Section */}
          <div className="bg-gray-100 p-5 rounded-lg flex flex-col md:flex-row md:items-center gap-6">
            {/* Date */}
            <div className="flex items-center gap-3">
              <p className="text-gray-700 text-lg">
                <span className="font-semibold">📅 Scheduled:</span>{" "}
                {new Date(event.scheduleddate).toLocaleString()}
              </p>
            </div>

            {/* Address */}
            <div className="flex items-center gap-3">
              <p className="text-gray-700 text-lg">
                <span className="font-semibold">📍 Location:</span>{" "}
                {event.address}
              </p>
            </div>
          </div>

          {/* RSVP Section */}
          <div className="mt-8">
            <RSVPSection
              eventId={event.id}
              initialRsvpCount={event.rsvpCount}
            />
          </div>
        </div>
      </div>

      {/* Comments Section */}
      <div className="mt-12">
        <CommentsSection eventId={event.id} />
      </div>
    </div>
  );
}
