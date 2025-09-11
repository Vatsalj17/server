import { useState } from "react";
import { apiFetch, setToken } from "../api/client";

export default function AuthForm({ onAuth }) {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const toggleForm = () => setIsLogin(!isLogin);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (isLogin) {
        // Login
        const formData = new URLSearchParams();
        formData.append("username", email);
        formData.append("password", password);

        const res = await fetch("http://127.0.0.1:8000/login", {
          method: "POST",
          headers: { "Content-Type": "application/x-www-form-urlencoded" },
          body: formData,
        });

        if (!res.ok) throw new Error("Login failed");
        const data = await res.json();
        setToken(data.access_token);
        onAuth && onAuth();
      } else {
        // Register
        await apiFetch("/users", {
          method: "POST",
          body: JSON.stringify({ email, password }),
        });
        alert("Registered successfully. Please log in.");
        setIsLogin(true);
      }
    } catch (err) {
      console.error(err);
      alert("Authentication failed");
    }
  };

  return (
    <div className="max-w-md mx-auto mt-20 bg-gradient-to-br from-gray-900 via-gray-800 to-black shadow-2xl rounded-2xl p-8 border border-gray-700">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold bg-gradient-to-r from-orange-400 to-red-500 bg-clip-text text-transparent mb-2">
          {isLogin ? "Welcome Back" : "Join Us"}
        </h2>
        <p className="text-gray-400 text-sm">
          {isLogin ? "Sign in to your account" : "Create your account"}
        </p>
      </div>
      
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="relative">
          <input
            type="email"
            placeholder="Email"
            className="w-full p-4 bg-gray-800/50 border border-gray-600 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-500/50 focus:border-orange-500 transition-all duration-300"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        
        <div className="relative">
          <input
            type="password"
            placeholder="Password"
            className="w-full p-4 bg-gray-800/50 border border-gray-600 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-500/50 focus:border-orange-500 transition-all duration-300"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        
        <button
          type="submit"
          className="w-full bg-gradient-to-r from-orange-500 to-red-600 text-white p-4 rounded-xl font-semibold hover:from-orange-600 hover:to-red-700 transform hover:scale-[1.02] transition-all duration-300 shadow-lg hover:shadow-orange-500/25"
        >
          {isLogin ? "Sign In" : "Create Account"}
        </button>
      </form>
      
      <div className="mt-8 text-center">
        <p className="text-gray-400 text-sm mb-4">
          {isLogin ? "New to Reddit Clone?" : "Already have an account?"}
        </p>
        <button
          type="button"
          onClick={toggleForm}
          className="text-orange-400 hover:text-orange-300 font-medium transition-colors duration-200 border-b border-orange-400/30 hover:border-orange-300/50"
        >
          {isLogin ? "Create Account" : "Sign In Instead"}
        </button>
      </div>
    </div>
  );
}
