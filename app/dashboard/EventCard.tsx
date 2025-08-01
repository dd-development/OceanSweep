import React from "react";

interface EventCardProps {
  title: string;
  description: string;
  city: string;
  state: string;
  zipcode: string;
  date: string;
}

const EventCard: React.FC<EventCardProps> = ({
  title,
  description,
  city,
  state,
  zipcode,
  date,
}) => {
  return (
    <div className="p-4 bg-gray-100 rounded-lg shadow-sm hover:shadow-md transition-shadow mt-6">
      <h2 className="text-xl font-semibold text-gray-800 mb-2">{title}</h2>
      <p className="text-gray-600 mb-2">{description}</p>
      <p className="text-sm text-gray-600">
        <span className="font-medium"> 📍 </span> {city}, {state} {zipcode}
      </p>
      <p className="text-sm text-gray-600">
        <span className="font-medium">📅</span> {date}
      </p>
    </div>
  );
};

export default EventCard;
