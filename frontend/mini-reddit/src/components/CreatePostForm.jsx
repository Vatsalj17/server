import { useState } from "react";
import { apiFetch } from "../api/client";

export default function CreatePostForm({ onCreated }) {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const newPost = await apiFetch("/posts", {
        method: "POST",
        body: JSON.stringify({ title, content, published: true }),
      });
      setTitle("");
      setContent("");
      onCreated && onCreated(newPost);
    } catch (err) {
      console.error(err);
      alert("Failed to create post");
    }
  };

  return (
    <div className="bg-gradient-to-br from-gray-900 via-gray-800 to-black shadow-2xl rounded-2xl p-6 mb-6 border border-gray-700">
      <div className="flex items-center mb-6">
        <div className="w-10 h-10 bg-gradient-to-r from-orange-500 to-red-600 rounded-full flex items-center justify-center mr-4">
          <span className="text-white font-bold text-lg">+</span>
        </div>
        <h2 className="text-2xl font-bold bg-gradient-to-r from-orange-400 to-red-500 bg-clip-text text-transparent">
          Create Post
        </h2>
      </div>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="relative">
          <input
            type="text"
            placeholder="An interesting title..."
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full p-4 bg-gray-800/60 border border-gray-600 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-500/50 focus:border-orange-500 transition-all duration-300 text-lg"
            required
          />
        </div>
        
        <div className="relative">
          <textarea
            placeholder="What's on your mind? Share your thoughts..."
            value={content}
            onChange={(e) => setContent(e.target.value)}
            rows="4"
            className="w-full p-4 bg-gray-800/60 border border-gray-600 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-500/50 focus:border-orange-500 transition-all duration-300 resize-none"
            required
          />
        </div>
        
        <div className="flex justify-end pt-2">
          <button
            type="submit"
            className="bg-gradient-to-r from-orange-500 to-red-600 text-white px-8 py-3 rounded-xl font-semibold hover:from-orange-600 hover:to-red-700 transform hover:scale-[1.02] transition-all duration-300 shadow-lg hover:shadow-orange-500/25 flex items-center space-x-2"
          >
            <span>Post</span>
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
            </svg>
          </button>
        </div>
      </form>
    </div>
  );
}
