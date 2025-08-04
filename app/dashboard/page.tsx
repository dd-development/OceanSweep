"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { usePageTitle } from "../context/PageTitleContext";
import StatsCard from "./StatsCard";
import Volunteers from "./Volunteers";
import EventCard from "./EventCard";

// Fetch function for dashboard data
async function fetchDashboardData() {
  const res = await fetch("/api/dashboard");
  if (!res.ok) throw new Error("Failed to fetch dashboard data");
  console.log(res);
  return res.json();
}

export default function Dashboard() {
  const { setTitle } = usePageTitle();

  // State
  const [activeTab, setActiveTab] = useState<"events" | "posts">("events");
  const [events, setEvents] = useState<any[]>([]);
  const [posts, setPosts] = useState<any[]>([]);

  // Fetch data on mount
  useEffect(() => {
    setTitle("Dashboard");
    (async () => {
      try {
        const data = await fetchDashboardData();
        setEvents(data.events || []);
        console.log("Events:", events);
        setPosts(data.posts || []);
      } catch (error) {
        console.error("Error fetching dashboard data:", error);
      }
    })();
  }, [setTitle]);

  return (
    <div className="flex">
      <main className="flex-grow p-6">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-8">
          <StatsCard
            title="Plastic Collected"
            value="230 Tons"
            description="Since 2020"
          />
          <StatsCard
            title="Volunteers"
            value="12,000+"
            description="Active participants"
          />
          <StatsCard
            title="Cleanups Organized"
            value="350+"
            description="In various locations"
          />
        </div>

        {/* Toggle Buttons */}
        <div className="flex space-x-6 mb-4">
          <button
            onClick={() => setActiveTab("events")}
            className={`px-4 py-2 rounded ${
              activeTab === "events" ? "bg-blue-500 text-white" : "bg-gray-300"
            }`}
          >
            Events
          </button>
          <button
            onClick={() => setActiveTab("posts")}
            className={`px-4 py-2 rounded ${
              activeTab === "posts" ? "bg-blue-500 text-white" : "bg-gray-300"
            }`}
          >
            Posts
          </button>
        </div>

        {/* Main Grid */}
        <div className="grid grid-cols-4 gap-6 md:grid-cols-8 lg:grid-cols-12">
          {/* Left Section (Events & Posts) */}
          <div className="col-span-4 lg:col-span-9">
            <div className="bg-white p-6 rounded-lg shadow-md">
              {/* Events Section */}
              {activeTab === "events" && (
                <>
                  <h3 className="text-lg font-semibold text-gray-700 mb-4">
                    🗓️ Your Upcoming Events
                  </h3>
                  <div className="space-y-4">
                    {events.length === 0 && (
                      <p className="text-gray-500">No upcoming events.</p>
                    )}
                    {events.map((event, index) => {
                      return (
                        <Link key={`l${event.id}`} href={`/events/${event.id}`}>
                          <EventCard
                            key={event.id }
                            title={event.title || "Untitled Event"}
                            description={event.description || ""}
                            city={event.city || ""}
                            state={event.statecode || ""}
                            zipcode={event.zip || ""}
                            date={
                              event.scheduleddate
                                ? new Date(
                                    event.scheduleddate.replace(" ", "T")
                                  ).toLocaleDateString()
                                : "Unknown"
                            }
                          />
                        </Link>
                      );
                    })}
                  </div>
                </>
              )}

              {/* Posts Section */}
              {activeTab === "posts" && (
                <>
                  <h3 className="text-lg font-semibold text-gray-700 mb-4">
                    📝 Your Posts
                  </h3>
                  {posts.length === 0 && (
                    <p className="text-gray-500">
                      You haven't written any posts yet.
                    </p>
                  )}
                  <ul className="space-y-4">
                    {posts.map((post, index) => (
                      <li
                        key={post.id || `post-${index}`}
                        className="p-4 bg-gray-100 rounded-md"
                      >
                        <h4 className="text-xl font-semibold mb-2">
                          {post.title || "Untitled Post"}
                        </h4>
                        <p>{post.description}</p>
                      </li>
                    ))}
                  </ul>
                </>
              )}
            </div>
          </div>

          {/* Right Section (Volunteers) */}
          <div className="col-span-4 lg:col-span-3">
            <Volunteers />
          </div>
        </div>

        {/* Button to Engagement Page */}
        <div className="mt-8">
          <Link href="/events">
            <button className="bg-blue-500 text-white px-4 py-2 rounded shadow hover:bg-blue-600">
              Go to Community Feed
            </button>
          </Link>
        </div>
      </main>
    </div>
  );
}
