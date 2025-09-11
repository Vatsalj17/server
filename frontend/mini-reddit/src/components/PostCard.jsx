/* Reddit-like post card */
import { useState } from "react";
import { apiFetch } from "../api/client";

export default function PostCard({ post, votes: initialVotes }) {
  const [votes, setVotes] = useState(initialVotes);
  const [userVote, setUserVote] = useState(null); // Track user's vote state

  const handleVote = async (dir) => {
    try {
      await apiFetch("/vote", {
        method: "POST",
        body: JSON.stringify({ post_id: post.id, dir }),
      });
      
      // Update vote count based on previous vote state
      if (userVote === null) {
        setVotes((v) => (dir === 1 ? v + 1 : v - 1));
        setUserVote(dir);
      } else if (userVote !== dir) {
        setVotes((v) => (dir === 1 ? v + 1 : v - 1));
        setUserVote(dir);
      } else {
        // Remove vote if clicking same direction
        setVotes((v) => (dir === 1 ? v - 1 : v + 1));
        setUserVote(null);
      }
    } catch (err) {
      console.error(err);
      alert("Vote failed");
    }
  };

  const getVoteColor = (direction) => {
    if (userVote === direction) {
      return direction === 1 ? "text-orange-500" : "text-blue-500";
    }
    return "text-gray-500";
  };

  return (
    <div className="flex bg-gradient-to-br from-gray-900 via-gray-800 to-black rounded-2xl shadow-2xl p-6 mb-6 border border-gray-700 hover:border-gray-600 transition-all duration-300 hover:shadow-orange-500/5">
      {/* Left vote section */}
      <div className="flex flex-col items-center pr-6 mr-2">
        <button
          className={`${getVoteColor(1)} hover:text-orange-400 transform hover:scale-125 transition-all duration-200 p-2 rounded-lg hover:bg-orange-500/10`}
          onClick={() => handleVote(1)}
        >
          <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 4l8 8h-6v8h-4v-8H4l8-8z"/>
          </svg>
        </button>
        
        <span className={`font-bold text-lg my-2 px-2 py-1 rounded-lg ${
          votes > 0 ? 'text-orange-400 bg-orange-500/10' : 
          votes < 0 ? 'text-blue-400 bg-blue-500/10' : 
          'text-gray-400 bg-gray-800/50'
        }`}>
          {votes > 0 ? '+' : ''}{votes}
        </span>
        
        <button
          className={`${getVoteColor(0)} hover:text-blue-400 transform hover:scale-125 transition-all duration-200 p-2 rounded-lg hover:bg-blue-500/10`}
          onClick={() => handleVote(0)}
        >
          <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 20l-8-8h6V4h4v8h6l-8 8z"/>
          </svg>
        </button>
      </div>

      {/* Post content */}
      <div className="flex-1">
        <div className="mb-3">
          <h3 className="text-xl font-bold text-white mb-2 hover:text-orange-400 transition-colors duration-200 cursor-pointer">
            {post.title}
          </h3>
          <p className="text-gray-300 leading-relaxed">{post.content}</p>
        </div>
        
        <div className="flex items-center justify-between text-sm text-gray-500 mt-4 pt-4 border-t border-gray-700">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <div className="w-6 h-6 bg-gradient-to-r from-orange-500 to-red-600 rounded-full flex items-center justify-center">
                <span className="text-white text-xs font-bold">
                  {post.owner.email.charAt(0).toUpperCase()}
                </span>
              </div>
              <span className="font-medium text-orange-400">
                u/{post.owner.email.split('@')[0]}
              </span>
            </div>
            
            <span className="text-gray-600">•</span>
            
            <span className="text-gray-400">
              {new Date(post.created_at).toLocaleString()}
            </span>
          </div>
          
          <div className="flex items-center space-x-4">
            <button className="flex items-center space-x-1 text-gray-500 hover:text-gray-300 transition-colors duration-200">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
              </svg>
              <span className="text-xs">Comment</span>
            </button>
            
            <button className="flex items-center space-x-1 text-gray-500 hover:text-gray-300 transition-colors duration-200">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.367 2.684 3 3 0 00-5.367-2.684z" />
              </svg>
              <span className="text-xs">Share</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
