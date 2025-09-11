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
    <form
      onSubmit={handleSubmit}
      className="bg-white shadow rounded-lg p-4 mb-4"
    >
      <h2 className="text-xl font-semibold mb-2">Create Post</h2>
      <input
        type="text"
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="w-full p-2 mb-2 border rounded"
        required
      />
      <textarea
        placeholder="Content"
        value={content}
        onChange={(e) => setContent(e.target.value)}
        className="w-full p-2 mb-2 border rounded"
        required
      />
      <button
        type="submit"
        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
      >
        Post
      </button>
    </form>
  );
}
