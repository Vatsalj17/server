/* Reddit-like post card */
import { useState } from "react";
import { apiFetch } from "../api/client";

export default function PostCard({ post, votes: initialVotes }) {
  const [votes, setVotes] = useState(initialVotes);

  const handleVote = async (dir) => {
    try {
      await apiFetch("/vote", {
        method: "POST", // <-- change your FastAPI to POST instead of GET
        body: JSON.stringify({ post_id: post.id, dir }),
      });
      setVotes((v) => (dir === 1 ? v + 1 : v - 1));
    } catch (err) {
      console.error(err);
      alert("Vote failed");
    }
  };

  return (
    <div className="flex bg-white rounded-lg shadow p-4 mb-4">
      {/* Left vote section */}
      <div className="flex flex-col items-center pr-4">
        <button
          className="text-gray-500 hover:text-red-500"
          onClick={() => handleVote(1)}
        >
          ⬆
        </button>
        <span className="font-bold">{votes}</span>
        <button
          className="text-gray-500 hover:text-blue-500"
          onClick={() => handleVote(0)}
        >
          ⬇
        </button>
      </div>

      {/* Post content */}
      <div className="flex-1">
        <h3 className="text-lg font-semibold">{post.title}</h3>
        <p className="text-gray-700">{post.content}</p>
        <div className="text-sm text-gray-500 mt-2">
          Posted by <span className="font-medium">{post.owner.email}</span> ·{" "}
          {new Date(post.created_at).toLocaleString()}
        </div>
      </div>
    </div>
  );
}
