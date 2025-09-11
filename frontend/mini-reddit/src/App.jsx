import { useState, useEffect } from "react";
import { getToken } from "./api/client";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Login from "./pages/Login";

export default function App() {
  const [authed, setAuthed] = useState(false);

  useEffect(() => {
    setAuthed(!!getToken());
  }, []);

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar onLogout={() => setAuthed(false)} />
      {authed ? (
        <Home />
      ) : (
        <Login onAuth={() => setAuthed(true)} />
      )}
    </div>
  );
}
