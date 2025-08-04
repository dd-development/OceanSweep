"use client";

import React, { useState } from "react";
import RSVPButton from "./RSVPButton";

interface RSVPSectionProps {
  eventId: number;
  initialRsvpCount: number;
}

const RSVPSection: React.FC<RSVPSectionProps> = ({ eventId, initialRsvpCount }) => {
  const [eventRsvpCount, setEventRsvpCount] = useState(initialRsvpCount);

  return (
    <div>
      <h2 className="text-2xl font-semibold text-gray-800">
        🎟️ RSVPs: {eventRsvpCount}
      </h2>
      <RSVPButton eventId={eventId} eventRsvpCount={eventRsvpCount} setEventRsvpCount={setEventRsvpCount} />
    </div>
  );
};

export default RSVPSection;
