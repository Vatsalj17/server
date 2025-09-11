import { clearToken, getToken } from "../api/client";

export default function Navbar({ onLogout }) {
  const token = getToken();

  return (
    <nav className="bg-white shadow p-4 flex justify-between items-center">
      <h1 className="text-xl font-bold text-red-600">Reddit Clone 🦖</h1>
      {token && (
        <button
          onClick={() => {
            clearToken();
            onLogout && onLogout();
          }}
          className="bg-gray-200 px-3 py-1 rounded hover:bg-gray-300"
        >
          Logout
        </button>
      )}
    </nav>
  );
}
