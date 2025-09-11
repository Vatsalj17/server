import { useEffect, useState } from "react";
import { apiFetch } from "../api/client";
import PostCard from "../components/PostCard";
import CreatePostForm from "../components/CreatePostForm";

export default function Home() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  const loadPosts = async () => {
    try {
      setLoading(true);
      const data = await apiFetch("/posts");
      setPosts(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadPosts();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black">
      {/* Animated background elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-r from-orange-500/10 to-red-600/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-gradient-to-r from-purple-500/5 to-pink-600/5 rounded-full blur-3xl animate-pulse delay-1000"></div>
      </div>

      <div className="relative z-10">
        {/* Hero Section */}
        <div className="pt-8 pb-6 px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <div className="mb-8">
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold bg-gradient-to-r from-orange-400 via-red-500 to-pink-500 bg-clip-text text-transparent mb-4">
                Welcome to the Feed
              </h1>
              <p className="text-gray-400 text-lg sm:text-xl max-w-2xl mx-auto">
                Discover amazing content, share your thoughts, and connect with the community
              </p>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pb-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Feed */}
            <div className="lg:col-span-2 space-y-6">
              <CreatePostForm onCreated={loadPosts} />
              
              {loading ? (
                <div className="space-y-6">
                  {[1, 2, 3].map((i) => (
                    <div key={i} className="bg-gradient-to-br from-gray-900/50 via-gray-800/50 to-black/50 rounded-2xl p-6 animate-pulse">
                      <div className="flex space-x-4">
                        <div className="w-12 h-20 bg-gray-700/50 rounded-lg"></div>
                        <div className="flex-1 space-y-3">
                          <div className="h-6 bg-gray-700/50 rounded-lg w-3/4"></div>
                          <div className="h-4 bg-gray-700/50 rounded-lg w-full"></div>
                          <div className="h-4 bg-gray-700/50 rounded-lg w-2/3"></div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : posts.length === 0 ? (
                <div className="bg-gradient-to-br from-gray-900/80 via-gray-800/80 to-black/80 rounded-2xl p-12 text-center border border-gray-700">
                  <div className="w-20 h-20 bg-gradient-to-r from-orange-500/20 to-red-600/20 rounded-full flex items-center justify-center mx-auto mb-6 border border-orange-500/30">
                    <svg className="w-10 h-10 text-orange-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-semibold text-gray-300 mb-2">No posts yet!</h3>
                  <p className="text-gray-500">Be the first to share something amazing with the community.</p>
                </div>
              ) : (
                <div className="space-y-6">
                  {posts.map((p, i) => (
                    <PostCard key={i} post={p.post} votes={p.votes} />
                  ))}
                </div>
              )}
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1 space-y-6">
              {/* Community Stats */}
              <div className="bg-gradient-to-br from-gray-900/80 via-gray-800/80 to-black/80 rounded-2xl p-6 border border-gray-700 sticky top-6">
                <h3 className="text-lg font-semibold text-white mb-4 flex items-center">
                  <div className="w-8 h-8 bg-gradient-to-r from-orange-500 to-red-600 rounded-lg flex items-center justify-center mr-3">
                    <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M16 4c0-1.11.89-2 2-2s2 .89 2 2-.89 2-2 2-2-.89-2-2zM4 18v-4h3v4h2V9H7L5.5 7.5C5.1 7.1 4.6 6.9 4 6.9s-1.1.2-1.5.6L1 9v5h3zm12-9c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2zm-2 4V9.5c0-.8-.7-1.5-1.5-1.5S11 8.7 11 9.5V13h-1V9.5C10 7.6 11.6 6 13.5 6S17 7.6 17 9.5V13h-3z"/>
                    </svg>
                  </div>
                  Community Stats
                </h3>
                
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-400">Total Posts</span>
                    <span className="text-orange-400 font-semibold">{posts.length}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-400">Active Users</span>
                    <span className="text-green-400 font-semibold">🟢 Online</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-400">Total Votes</span>
                    <span className="text-blue-400 font-semibold">
                      {posts.reduce((sum, p) => sum + (p.votes || 0), 0)}
                    </span>
                  </div>
                </div>
              </div>

              {/* Trending Topics */}
              <div className="bg-gradient-to-br from-gray-900/80 via-gray-800/80 to-black/80 rounded-2xl p-6 border border-gray-700">
                <h3 className="text-lg font-semibold text-white mb-4 flex items-center">
                  <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-pink-600 rounded-lg flex items-center justify-center mr-3">
                    <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M16 6l2.29 2.29-4.88 4.88-4-4L2 16.59 3.41 18l6-6 4 4 6.3-6.29L22 12V6h-6z"/>
                    </svg>
                  </div>
                  Trending
                </h3>
                
                <div className="space-y-3">
                  <div className="flex items-center space-x-3 p-3 rounded-xl bg-gray-800/40 hover:bg-gray-800/60 transition-all duration-200 cursor-pointer">
                    <span className="text-orange-400 font-bold">#1</span>
                    <span className="text-gray-300 text-sm">Technology</span>
                  </div>
                  <div className="flex items-center space-x-3 p-3 rounded-xl bg-gray-800/40 hover:bg-gray-800/60 transition-all duration-200 cursor-pointer">
                    <span className="text-orange-400 font-bold">#2</span>
                    <span className="text-gray-300 text-sm">Discussion</span>
                  </div>
                  <div className="flex items-center space-x-3 p-3 rounded-xl bg-gray-800/40 hover:bg-gray-800/60 transition-all duration-200 cursor-pointer">
                    <span className="text-orange-400 font-bold">#3</span>
                    <span className="text-gray-300 text-sm">News</span>
                  </div>
                </div>
              </div>

              {/* Quick Actions */}
              <div className="bg-gradient-to-br from-gray-900/80 via-gray-800/80 to-black/80 rounded-2xl p-6 border border-gray-700">
                <h3 className="text-lg font-semibold text-white mb-4">Quick Actions</h3>
                <div className="space-y-2">
                  <button className="w-full bg-gray-800/60 hover:bg-gray-700/60 text-gray-300 hover:text-white px-4 py-3 rounded-xl transition-all duration-200 text-left flex items-center space-x-3">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 4V2a1 1 0 0 1 1-1h8a1 1 0 0 1 1 1v2h4a1 1 0 0 1 0 2h-1v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6H3a1 1 0 1 1 0-2h4Z"/>
                    </svg>
                    <span>View Saved</span>
                  </button>
                  <button className="w-full bg-gray-800/60 hover:bg-gray-700/60 text-gray-300 hover:text-white px-4 py-3 rounded-xl transition-all duration-200 text-left flex items-center space-x-3">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/>
                    </svg>
                    <span>Recent Activity</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
