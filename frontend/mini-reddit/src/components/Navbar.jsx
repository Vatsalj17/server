import { clearToken, getToken } from "../api/client";

export default function Navbar({ onLogout }) {
  const token = getToken();

  return (
    <nav className="bg-gradient-to-r from-gray-900 via-black to-gray-900 shadow-2xl border-b border-gray-700">
      <div className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex justify-between items-center">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-r from-orange-500 to-red-600 rounded-xl flex items-center justify-center transform hover:scale-110 transition-all duration-300">
                <span className="text-white text-xl font-bold">R</span>
              </div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-orange-400 to-red-500 bg-clip-text text-transparent">
                Laal-ji 🦖 🍒
              </h1>
            </div>
            
            {/* Search bar placeholder for future */}
            <div className="hidden md:block ml-8">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search communities, posts..."
                  className="w-96 px-4 py-2 bg-gray-800/60 border border-gray-600 rounded-full text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-500/50 focus:border-orange-500 transition-all duration-300"
                  readOnly
                />
                <svg className="absolute right-3 top-2.5 w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
            </div>
          </div>

          <div className="flex items-center space-x-4">
            {token ? (
              <>
                <div className="hidden md:flex items-center space-x-2 text-gray-300">
                  <div className="w-8 h-8 bg-gradient-to-r from-gray-600 to-gray-500 rounded-full flex items-center justify-center">
                    <span className="text-sm font-semibold">U</span>
                  </div>
                  <span className="text-sm">User</span>
                </div>
                
                <button
                  onClick={() => {
                    clearToken();
                    onLogout && onLogout();
                  }}
                  className="bg-gray-800 hover:bg-gray-700 text-gray-300 hover:text-white px-4 py-2 rounded-lg transition-all duration-300 border border-gray-600 hover:border-gray-500 flex items-center space-x-2"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                  </svg>
                  <span>Logout</span>
                </button>
              </>
            ) : (
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-gradient-to-r from-orange-500/20 to-red-600/20 rounded-full border border-orange-500/30 flex items-center justify-center">
                  <span className="text-orange-400 text-sm">?</span>
                </div>
                <span className="text-gray-400 text-sm">Guest</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
