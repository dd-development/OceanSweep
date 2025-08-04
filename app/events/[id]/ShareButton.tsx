"use client";

import { useState, useEffect } from "react";
import { toast } from "react-hot-toast";
import { Share2 } from "lucide-react"; // Icons for Share & Copy

export default function ShareButton({
  eventTitle,
  eventId,
}: {
  eventTitle: string;
  eventId: number;
}) {
  const [eventUrl, setEventUrl] = useState("");

  // Ensure the full URL is set correctly
  useEffect(() => {
    setEventUrl(`${window.location.origin}/events/${eventId}`);
  }, [eventId]);

  const handleShare = async () => {
    if (!eventUrl) {
      toast.error("Event URL not found!");
      return;
    }

    if (navigator.share) {
      try {
        await navigator.share({
          title: eventTitle,
          text: `Check out this event: ${eventTitle}`,
          url: eventUrl,
        });
        toast.success("Event shared successfully!");
      } catch (error) {
        console.error("Sharing failed:", error);
        toast.error("Could not share event.");
      }
    } else {
      navigator.clipboard.writeText(eventUrl);
      toast.success("Link copied to clipboard!");
    }
  };

  return (
    <button
      onClick={handleShare}
      className="flex items-center gap-2 px-4 py-2 rounded-lg bg-blue-600 text-white font-medium hover:bg-blue-700 transition-all"
    >
      <Share2 size={18} /> Share
    </button>
  );
}