"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { usePageTitle } from "../context/PageTitleContext";
import { PlusCircleIcon } from "@heroicons/react/24/solid";
import Link from "next/link";
import { CldImage } from "next-cloudinary";
import Avatar from "../components/Avatar";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import marker from "leaflet/src/images/marker.svg";
import { Icon } from "leaflet";

type Author = {
  firstname: string;
  lastname: string;
  image: string;
};

type Event = {
  id: number;
  title: string;
  description: string;
  createddate: string;
  city: string;
  statecode: string;
  image?: string;
  author: Author;
  latitude: number;
  longitude: number;
  scheduleddate: string;
};

type Post = {
  id: number;
  title: string;
  description: string;
  createddate: string;
  image?: string;
  city: string;
  statecode: string;
  author: Author;
};

const myIcon = new Icon({
  iconUrl: marker,
  iconSize: [64, 64],
});

export default function FeedPage() {
  const [activeTab, setActiveTab] = useState<"events" | "posts" | "map View">(
    "events"
  );
  const [events, setEvents] = useState<Event[]>();
  const [posts, setPosts] = useState<Post[]>();
  const router = useRouter();
  const { setTitle } = usePageTitle();
  const [loading, setLoading] = useState(true);
  const [userLocation, setUserLocation] = useState({
    latitude: 41.87214,
    longitude: -87.64794,
  }); // Default lat/long is at UIC

  useEffect(() => {
    setTitle("Community Feed");
    fetchData();
    getCurrentPosition();
  }, [activeTab]);

  const fetchData = async () => {
    console.log("Fetching data for:", activeTab);
    try {
      let url = activeTab === "events" ? "/api/events" : "/api/post";
      const response = await fetch(url);
      if (!response.ok) throw new Error("Failed to fetch");
      const data = await response.json();
      if (activeTab === "events") {
        setEvents(data);
      } else if (activeTab === "posts") {
        setPosts(data);
      }
    } catch (error) {
      console.error("Failed to fetch data:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleCreate = () => {
    router.push(activeTab === "events" ? "event" : "post");
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white flex flex-col items-center p-6">
      {/* Page Title */}
      <h1 className="text-4xl font-bold mb-6 text-gray-800">Community Feed</h1>

      {/* Tab Navigation & Create Button */}
      <div className="flex justify-between w-full max-w-3xl items-center mb-6">
        <div className="flex space-x-4">
          {["events", "posts", "map View"].map((tab) => (
            <button
              key={tab}
              onClick={() =>
                setActiveTab(tab as "events" | "posts" | "map View")
              }
              className={`py-2 px-5 rounded-lg font-semibold transition-all ${
                activeTab === tab
                  ? "bg-blue-600 text-white shadow-md"
                  : "bg-gray-200 text-gray-700 hover:bg-gray-300"
              }`}
            >
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
            </button>
          ))}
        </div>

        {/* Create Button */}
        {activeTab != "map View" ? (
          <button
            onClick={handleCreate}
            className="flex items-center space-x-2 bg-blue-500 text-white py-2 px-4 rounded-lg shadow-md hover:bg-blue-600 transition-transform transform hover:scale-105"
          >
            <PlusCircleIcon className="w-5 h-5" />
            <span>New {activeTab === "events" ? "Event" : "Post"}</span>
          </button>
        ) : (
          <div></div>
        )}
      </div>

      {/* Content Feed */}
      <div className="w-full max-w-3xl space-y-6">
        {loading ? (
          /* Skeleton Loader */
          <div className="space-y-4">
            {Array(3)
              .fill("")
              .map((_, index) => (
                <div
                  key={index}
                  className="bg-white rounded-lg shadow-md p-6 animate-pulse"
                >
                  <div className="h-40 bg-gray-300 rounded"></div>
                  <div className="h-6 bg-gray-300 rounded w-2/3 mt-4"></div>
                  <div className="h-4 bg-gray-300 rounded w-1/2 mt-2"></div>
                </div>
              ))}
          </div>
        ) : activeTab === "events" ? (
          (events ?? []).map((event) => (
            <Link key={event.id} href={`/events/${event.id}`}>
              <div className="cursor-pointer bg-white rounded-lg shadow-md hover:shadow-xl transition-shadow overflow-hidden mt-6">
                {event.image && (
                  <div className="relative w-full h-48">
                    <CldImage
                      src={event.image}
                      alt={event.title}
                      width={500}
                      height={200}
                      className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                    />
                  </div>
                )}
                <div className="p-6">
                  <h2 className="text-2xl font-semibold text-gray-800">
                    {event.title}
                  </h2>
                  <p className="text-gray-600 mt-2">{event.description}</p>
                  <div className="mt-4 flex justify-between text-gray-500 text-sm">
                    <span>
                      📅{" "}
                      {new Date(
                        event.scheduleddate.replace(" ", "T")
                      ).toLocaleDateString()}
                    </span>
                    <span>
                      📍 {event.city}, {event.statecode}
                    </span>
                  </div>

                  <div className="flex items-center space-x-3 mt-4">
                    <Avatar
                      name={
                        event.author
                          ? `${event.author.firstname} ${event.author.lastname}`
                          : "Unknown"
                      }
                      imageUrl={event.author.image}
                      size={30}
                    />
                    <span className="text-gray-700 font-medium">
                      <span>
                        ✍️{" "}
                        {event.author
                          ? `${event.author.firstname} ${event.author.lastname}`
                          : "Unknown"}
                      </span>
                    </span>
                  </div>
                </div>
              </div>
            </Link>
          ))
        ) : activeTab === "posts" ? (
          (posts ?? []).map((post) => (
            <div
              key={post.id}
              className="bg-white rounded-lg shadow-md hover:shadow-xl transition-shadow overflow-hidden mt-6"
            >
              {post.image && (
                <div className="relative w-full h-48">
                  <a href={post.image} target="_blank" rel="noopener noreferrer">
                  <CldImage
                    src={post.image}
                    alt={post.title}
                    width={500}
                    height={200}
                    className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                  />
                  </a>
                </div>
              )}
              <div className="p-6">
                <h2 className="text-2xl font-semibold text-gray-800">
                  {post.title}
                </h2>
                <p className="text-gray-600 mt-2">{post.description}</p>
                <div className="mt-4 flex justify-between text-gray-500 text-sm">
                  <span>
                    📅{" "}
                    {new Date(
                      post.createddate.replace(" ", "T")
                    ).toLocaleDateString()}
                  </span>
                  <span>
                    📍 {post.city}, {post.statecode}
                  </span>
                </div>

                <div className="flex items-center space-x-3 mt-4">
                  <Avatar
                    name={
                      post.author
                        ? `${post.author.firstname} ${post.author.lastname}`
                        : "Unknown"
                    }
                    imageUrl={post.author.image}
                    size={30}
                  />
                  <span className="text-gray-700 font-medium">
                    <span>
                      ✍️{" "}
                      {post.author
                        ? `${post.author.firstname} ${post.author.lastname}`
                        : "Unknown"}
                    </span>
                  </span>
                </div>
              </div>
            </div>
          ))
        ) : (
          <MapContainer
            style={{ height: 536 }}
            center={[userLocation.latitude, userLocation.longitude]}
            zoom={13}
            scrollWheelZoom={true}
          >
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />

            {(events ?? []).map((event) => (
              <Marker
                key={`m${event.id}`}
                position={[event.latitude, event.longitude]}
                icon={myIcon}
              >
                <Popup>
                  <Link key={`l${event.id}`} href={`/events/${event.id}`}><b>{event.title} </b></Link>
                  📅 <i>({new Date(event.createddate.replace(" ", "T")).toLocaleDateString()})</i>
                        
                  <br/> {event.description}
                </Popup>
              </Marker>
            ))}
          </MapContainer>
        )}
      </div>
    </div>
  );

  function getCurrentPosition() {
    if (navigator.geolocation) {
      // Get the user's current location
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setUserLocation({ latitude, longitude });
        },
        (error) => {
          console.error("Error getting user location:", error);
        }
      );
    } else {
      console.error("Geolocation is not supported by browser.");
    }
  }
}
