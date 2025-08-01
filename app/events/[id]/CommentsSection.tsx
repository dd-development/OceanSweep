"use client";

import { useState, useEffect } from "react";
import { getUserIdRoute } from "@/app/utility/useUser";
import Avatar from "@/app/components/Avatar";

interface User {
  id: number;
  firstname: string;
  lastname: string;
  image: string;
}

interface Comment {
  id: number;
  content: string;
  createdDate: string;
  user: User;
}

export default function CommentsSection({ eventId }: { eventId: number }) {
  const [comments, setComments] = useState<Comment[]>([]);
  const [newComment, setNewComment] = useState("");
  const [userId, setUserId] = useState<number | null>(null);
  const [username, setUsername] = useState<string | null>(null);
  const [avatarPath, setAvatarPath] = useState<string | null>(null);

  useEffect(() => {
    // Fetch comments
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/comments?eventId=${eventId}`)
      .then((res) => res.json())
      .then((data) => setComments(data))

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
  }, [eventId]);

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

  const submitComment = async () => {
    if (!newComment.trim() || !userId) return;

    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/comments`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ content: newComment, eventId, userId }),
    });

    if (response.ok) {
      //const newCommentData = await response.json();
      //setComments([newCommentData, ...comments]);
      //setNewComment("");

      setNewComment("");

      // Refetch all comments to ensure data consistency
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/comments?eventId=${eventId}`);
      const data = await res.json();
      setComments(data);
    }
  };

  return (
    <div className="bg-white shadow-lg rounded-lg p-6 border">
      <h2 className="text-2xl font-semibold text-gray-800 mb-4">💬 Comments</h2>
      
      {/* Comments List */}
      <div className="space-y-6">
        {comments.length > 0 ? (
          comments.map((comment) => (
            <div key={comment.id} className="flex items-start space-x-4 border-b pb-4">
             
              <Avatar name={comment.user.firstname + " " + comment.user.lastname} imageUrl={comment.user.image}/>
              
              <div className="flex-1">
                <div className="flex justify-between items-center">
                  <p className="font-medium text-gray-900">
                    {comment.user.firstname} {comment.user.lastname}
                  </p>
                  <span className="text-xs text-gray-500">{new Date(comment.createdDate).toLocaleString()}</span>
                </div>
                <p className="text-gray-700 mt-1">{comment.content}</p>
              </div>
            </div>
          ))
        ) : (
          <p className="text-gray-500 text-center">No comments yet. Be the first to comment! 💬</p>
        )}
      </div>

      {/* Add Comment Form */}
      <div className="mt-6">
        <div className="flex items-start space-x-4">
          <Avatar name={userInfo.name || "Anonymous"} imageUrl={userInfo.imageUrl}/>
          
          <div className="flex-1">
            <textarea
              className="w-full border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
              rows={3}
              placeholder="Write your comment..."
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
            />
            <button
              className={`mt-2 px-4 py-2 rounded-lg font-semibold transition-all ${
                newComment.trim()
                  ? "bg-blue-500 text-white hover:bg-blue-600"
                  : "bg-gray-300 text-gray-500 cursor-not-allowed"
              }`}
              onClick={submitComment}
              disabled={!newComment.trim()}
            >
              Submit
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}