"use client";

import { getUserIdRoute } from "@/app/utility/useUser";
import { useState, useEffect } from "react";

interface RSVPButtonProps {
  eventId: number;
  eventRsvpCount: number;
  setEventRsvpCount: (count: number) => void;
}

const RSVP_STATUS_DISPLAY: Record<string, string> = {
  GOING: "Going",
  MAYBE: "Maybe",
  NOT_GOING: "Not Going",
  NOT_RESPONDED: "Not Responded",
};

export default function RSVPButton({
  eventId,
  eventRsvpCount,
  setEventRsvpCount,
}: RSVPButtonProps) {
  const [rsvpStatus, setRsvpStatus] = useState<
    "GOING" | "MAYBE" | "NOT_GOING" | "NOT_RESPONDED"
  >("NOT_RESPONDED");
  const [userId, setUserId] = useState<number | null>(null);
  const [previousStatus, setPreviousStatus] = useState<
    "GOING" | "MAYBE" | "NOT_GOING" | "NOT_RESPONDED"
  >("NOT_RESPONDED");

  useEffect(() => {
    async function fetchUserId() {
      const id = await getUserIdRoute();
      if (id) setUserId(parseInt(id));
    }
    fetchUserId();
  }, []);

  useEffect(() => {
    if (userId === null) return;

    async function fetchData() {
      console.log("Fetching RSVP for userId:", userId);
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/api/events/${eventId}/rsvp?userId=${userId}`
        );
        if (response.ok) {
          const data = await response.json();
          setRsvpStatus(data.status);
          setPreviousStatus(data.status); // Store the initial RSVP status
        } else {
          console.error("Failed to fetch RSVP status");
        }
      } catch (error) {
        console.error("Error fetching RSVP:", error);
      }
    }

    fetchData();
  }, [userId, eventId]);

  // Handle RSVP
  const handleRSVP = async (status: "GOING" | "MAYBE" | "NOT_GOING") => {
    if (userId === null) return;

    console.log("Handling RSVP:", { userId, eventId, status });

    try {
      const response = await fetch(`/api/events/${eventId}/rsvp`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId, status }),
      });

      if (!response.ok) {
        console.error("Failed to update RSVP status");
        return;
      }

      const data = await response.json();
      console.log("RSVP update response:", data);

      // Adjust the RSVP count
      if (previousStatus !== "GOING" && status === "GOING") {
        setEventRsvpCount(eventRsvpCount + 1);
      } else if (previousStatus === "GOING" && status !== "GOING") {
        setEventRsvpCount(eventRsvpCount - 1);
      }

      // Update states
      setPreviousStatus(status);
      setRsvpStatus(status);
    } catch (error) {
      console.error("Error handling RSVP:", error);
    }
  };

  return (
    <div className="mt-6">
      <p className="text-lg font-semibold text-gray-800 mb-2">
        Your RSVP Status
      </p>

      <div className="flex gap-4 items-center mt-3">
        <button
          onClick={() => handleRSVP("GOING")}
          className={`flex items-center gap-2 px-6 py-3 rounded-lg font-semibold transition-all duration-300 shadow-md ${
            rsvpStatus === "GOING"
              ? "bg-green-600 text-white shadow-lg scale-105"
              : "bg-green-100 text-green-600 hover:bg-green-200"
          }`}
          title="You're going to this event!"
        >
          <span className="text-xl">✅</span> Going
        </button>

        <button
          onClick={() => handleRSVP("MAYBE")}
          className={`flex items-center gap-2 px-6 py-3 rounded-lg font-semibold transition-all duration-300 shadow-md ${
            rsvpStatus === "MAYBE"
              ? "bg-yellow-500 text-white shadow-lg scale-105"
              : "bg-yellow-100 text-yellow-600 hover:bg-yellow-200"
          }`}
          title="You're unsure if you'll attend."
        >
          <span className="text-xl">🤔</span> Maybe
        </button>

        <button
          onClick={() => handleRSVP("NOT_GOING")}
          className={`flex items-center gap-2 px-6 py-3 rounded-lg font-semibold transition-all duration-300 shadow-md ${
            rsvpStatus === "NOT_GOING"
              ? "bg-red-500 text-white shadow-lg scale-105"
              : "bg-red-100 text-red-600 hover:bg-red-200"
          }`}
          title="You won't be attending this event."
        >
          <span className="text-xl">❌</span> Not Going
        </button>
      </div>

      <div className="mt-4 text-gray-600 text-sm">
        {rsvpStatus === "NOT_RESPONDED" ? (
          <p>You haven't responded yet. Please choose your RSVP status.</p>
        ) : (
          <p>
            You have RSVP'd as{" "}
            <span className="font-semibold">
              {RSVP_STATUS_DISPLAY[rsvpStatus] || rsvpStatus}
            </span>
          </p>
        )}
      </div>
    </div>
  );
}
