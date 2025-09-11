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
    <div className="max-w-sm mx-auto mt-10 bg-white shadow rounded-lg p-6">
      <h2 className="text-xl font-bold mb-4 text-center">
        {isLogin ? "Login" : "Register"}
      </h2>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="Email"
          className="w-full p-2 mb-3 border rounded"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          className="w-full p-2 mb-3 border rounded"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button
          type="submit"
          className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
        >
          {isLogin ? "Login" : "Register"}
        </button>
      </form>
      <p className="text-sm text-center mt-4">
        {isLogin ? "No account?" : "Already have an account?"}{" "}
        <button
          type="button"
          onClick={toggleForm}
          className="text-blue-500 hover:underline"
        >
          {isLogin ? "Register" : "Login"}
        </button>
      </p>
    </div>
  );
}
