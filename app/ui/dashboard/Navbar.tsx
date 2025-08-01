"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { handleSignOut } from "@/app/lib/action";
import Avatar from "@/app/components/Avatar";
import { ChatBubbleOvalLeftEllipsisIcon, HandRaisedIcon } from "@heroicons/react/24/outline";
import { usePageTitle } from "@/app/context/PageTitleContext";
import { GiftIcon } from "lucide-react";
import { getUserIdRoute } from "@/app/utility/useUser";

interface NavbarProps {
  title?: string;
}

export default function Navbar({ title: initialTitle }: NavbarProps) {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const { title } = usePageTitle();
  const [username, setUsername] = useState<string | null>(null);
  const [userId, setUserId] = useState<number | null>(null);
  const [avatarPath, setAvatarPath] = useState<string | null>(null);

  useEffect(() => {
    /** 
    const fetchUsername = async () => {
      const username = await getUserName();
      setUsername(username);
    };
    fetchUsername();
    */
    const fetchUsername = async () => {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/user/`);
      const data = await response.json();
      setUsername(data.username);
    };
    fetchUsername();

    async function fetchUserId() {
      const id = await getUserIdRoute();
      setUserId(id ? parseInt(id) : null);
    }
    fetchUserId();
    
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
    imageUrl: avatarPath || "", // Add user image URL here TODO
  };

  return (
    <nav className="bg-blue-600 text-white p-4 shadow-md flex items-center relative rounded-md">
      <div className="text-xl font-bold">{title}</div>
      <div className="flex-grow"></div>

      <Link href="/donation" className="mr-4">
        <GiftIcon className="h-6 w-6 text-white hover:text-gray-300" />
      </Link>
      <Link href="/feedback" className="mr-4">
        <ChatBubbleOvalLeftEllipsisIcon className="h-6 w-6 text-white hover:text-gray-300" />
      </Link>
      
      <div className="relative">
        <div
          className="cursor-pointer"
          onClick={() => setDropdownOpen(!dropdownOpen)}
        >
          <Avatar name={userInfo.name} imageUrl={userInfo.imageUrl} />
        </div>

        {dropdownOpen && (
          <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-2 text-black" style={{ zIndex: 100 }}>
            <Link href="/profile" className="block px-4 py-2 hover:bg-gray-100">
              Profile
            </Link>
            <button
              onClick={async () => {
                await handleSignOut();
              }}
              className="block w-full text-left px-4 py-2 hover:bg-gray-100"
            >
              Sign Out
            </button>
          </div>
        )}
      </div>
    </nav>
  );
}
