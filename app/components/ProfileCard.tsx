"use client";

import { useState, useEffect } from "react";
import ProfileForm from "./ProfileForm";
import { PencilIcon, UserCircleIcon } from "@heroicons/react/24/outline";
import Avatar from "../components/Avatar";
import { getUserIdRoute } from "@/app/utility/useUser";

type UserProfile = {
  firstname: string;
  lastname: string;
  email: string;
  zip: string;
  username: string;
  userrole: "VOLUNTEER" | "EXPERT" | "ORGANIZER" | "CONSULTANT";
};

export default function ProfileCard({ user }: { user: UserProfile }) {
  const [isEditing, setIsEditing] = useState(false);
  const [userId, setUserId] = useState<number | null>(null);
  const [username, setUsername] = useState<string | null>(null);
  const [avatarPath, setAvatarPath] = useState<string | null>(null);

  useEffect(() => {
      // Fetch User ID
      async function fetchUserId() {
        const id = await getUserIdRoute();
        setUserId(id ? parseInt(id) : null);
      }
      fetchUserId();

      const fetchUsername = async () => {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/user/`);
        const data = await response.json();
        setUsername(data.username);
      };
      fetchUsername();
    }, []);

  useEffect(() => {
    if (!userId) return;
  
    async function getAvatar() {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/avatar?userId=${userId}`);
      const data = await response.json();
      setAvatarPath(data.image);
    }
  
    getAvatar();
  }, [userId]);

  const userInfo = {
    name: username || "John Doe",
    imageUrl: avatarPath || "",
  };

  return (
    <div className="max-w-md ml-0 p-6 bg-white/90 backdrop-blur-md shadow-lg rounded-2xl border border-gray-200 transition-all hover:shadow-xl">
      {isEditing ? (
        <ProfileForm user={user} onClose={() => setIsEditing(false)} />
      ) : (
        <>
          {/* Profile Header */}
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-4">
              {/* <UserCircleIcon className="w-12 h-12 text-gray-400" /> */}
              <Avatar name={userInfo.name || "Anonymous"} imageUrl={userInfo.imageUrl}/>
              <div>
                <p className="text-lg font-semibold text-gray-800">
                  {user.firstname} {user.lastname}
                </p>
                <p className="text-sm text-gray-500">@{user.username}</p>
              </div>
            </div>

            <button
              onClick={() => setIsEditing(true)}
              className="p-2 rounded-full hover:bg-gray-100 transition-all"
            >
              <PencilIcon className="w-6 h-6 text-gray-600 hover:text-gray-800" />
            </button>
          </div>

          {/* Profile Details */}
          <div className="space-y-3 text-gray-700">
            <p>
              <strong className="text-gray-600">Email:</strong> {user.email}
            </p>
            <p>
              <strong className="text-gray-600">ZIP Code:</strong> {user.zip}
            </p>
            <p>
              <strong className="text-gray-600">Role:</strong>{" "}
              <span className="inline-block px-3 py-1 rounded-full text-sm font-medium text-white bg-blue-500">
                {user.userrole}
              </span>
            </p>
          </div>
        </>
      )}
    </div>
  );
}