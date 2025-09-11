import AuthForm from "../components/AuthForm";

export default function Login({ onAuth }) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Main gradient orbs */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-to-r from-orange-500/20 to-red-600/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-gradient-to-r from-purple-500/15 to-pink-600/15 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-gradient-to-r from-blue-500/10 to-cyan-600/10 rounded-full blur-3xl animate-pulse delay-2000"></div>
        
        {/* Floating particles */}
        <div className="absolute top-20 left-20 w-2 h-2 bg-orange-400 rounded-full animate-ping"></div>
        <div className="absolute top-40 right-32 w-1 h-1 bg-red-400 rounded-full animate-ping delay-500"></div>
        <div className="absolute bottom-32 left-1/3 w-3 h-3 bg-purple-400 rounded-full animate-ping delay-1000"></div>
        <div className="absolute bottom-20 right-20 w-1 h-1 bg-pink-400 rounded-full animate-ping delay-1500"></div>
        <div className="absolute top-1/3 right-1/4 w-2 h-2 bg-cyan-400 rounded-full animate-ping delay-2000"></div>
      </div>

      {/* Grid pattern overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-transparent via-gray-900/5 to-transparent bg-[size:50px_50px] opacity-20"
           style={{
             backgroundImage: `
               linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
               linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)
             `
           }}>
      </div>

      {/* Main content */}
      <div className="relative z-10 flex items-center justify-center min-h-screen p-4 sm:p-6 lg:p-8">
        <div className="w-full max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          
          {/* Left side - Branding */}
          <div className="hidden lg:block text-center lg:text-left">
            <div className="mb-8">
              <div className="inline-flex items-center space-x-4 mb-6">
                <div className="w-16 h-16 bg-gradient-to-r from-orange-500 to-red-600 rounded-2xl flex items-center justify-center transform hover:scale-110 transition-all duration-300 shadow-lg shadow-orange-500/25">
                  <span className="text-white text-2xl font-bold">R</span>
                </div>
                <h1 className="text-4xl xl:text-5xl font-bold bg-gradient-to-r from-orange-400 via-red-500 to-pink-500 bg-clip-text text-transparent">
                                    Laal-ji
                </h1>
              </div>
              
              <h2 className="text-3xl xl:text-4xl font-bold text-white mb-6 leading-tight">
                Dive into anything
              </h2>
              
              <p className="text-xl text-gray-400 mb-8 leading-relaxed max-w-lg">
                Connect with communities, share your thoughts, and discover amazing content from around the world.
              </p>
            </div>

            {/* Feature highlights */}
            <div className="space-y-6">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-gradient-to-r from-green-500/20 to-emerald-600/20 rounded-xl flex items-center justify-center border border-green-500/30">
                  <svg className="w-6 h-6 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a1.994 1.994 0 01-2-2V10a2 2 0 012-2h2V6a2 2 0 012-2h2a2 2 0 012 2v2z" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-white font-semibold">Real-time Discussions</h3>
                  <p className="text-gray-400 text-sm">Engage in meaningful conversations</p>
                </div>
              </div>
              
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-gradient-to-r from-blue-500/20 to-cyan-600/20 rounded-xl flex items-center justify-center border border-blue-500/30">
                  <svg className="w-6 h-6 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 11.5V14m0-2.5v-6a1.5 1.5 0 113 0m-3 6a1.5 1.5 0 00-3 0v2a7.5 7.5 0 0015 0v-5a1.5 1.5 0 00-3 0m-6-3V11m0-5.5v-1a1.5 1.5 0 013 0v1m0 0V11m0-5.5a1.5 1.5 0 013 0v3m0 0V11" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-white font-semibold">Trending Content</h3>
                  <p className="text-gray-400 text-sm">Discover what's popular right now</p>
                </div>
              </div>
              
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-gradient-to-r from-purple-500/20 to-pink-600/20 rounded-xl flex items-center justify-center border border-purple-500/30">
                  <svg className="w-6 h-6 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-white font-semibold">Community Driven</h3>
                  <p className="text-gray-400 text-sm">Built by users, for users</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right side - Auth Form */}
          <div className="w-full max-w-md mx-auto lg:mx-0">
            <AuthForm onAuth={onAuth} />
            
            {/* Mobile branding */}
            <div className="lg:hidden text-center mt-8">
              <div className="inline-flex items-center space-x-3 mb-4">
                <div className="w-12 h-12 bg-gradient-to-r from-orange-500 to-red-600 rounded-xl flex items-center justify-center">
                  <span className="text-white text-lg font-bold">R</span>
                </div>
                <h1 className="text-2xl font-bold bg-gradient-to-r from-orange-400 to-red-500 bg-clip-text text-transparent">
                  Laal-ji
                </h1>
              </div>
              <p className="text-gray-400 text-sm">
                Join the community and start sharing!
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom gradient fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-black/80 to-transparent pointer-events-none"></div>
    </div>
  );
}
