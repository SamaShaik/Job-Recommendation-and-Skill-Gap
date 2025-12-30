import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const [open, setOpen] = useState(false);
  const dropdownRef = useRef(null);

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  useEffect(() => {
    const handler = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  if (!user) return null;

  return (
    <nav className="absolute top-0 left-0 w-full z-50">
      <div className="max-w-6xl mx-auto px-6 py-4 flex justify-end">
        <div className="relative" ref={dropdownRef}>
          {/* PROFILE BUTTON */}
          <button
            onClick={() => setOpen(!open)}
            className="
              w-11 h-11 rounded-full
              bg-gradient-to-br from-cyan-400 to-blue-500
              flex items-center justify-center
              text-white font-bold text-lg
              shadow-lg
              hover:scale-105 transition
            "
          >
            {user.name?.charAt(0).toUpperCase()}
          </button>

          {/* PROFILE PANEL */}
          <div
            className={`
              absolute right-0 mt-4 w-80
              rounded-3xl
              bg-white/10 backdrop-blur-xl
              border border-white/20
              shadow-2xl
              transition-all duration-300
              ${open ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-3 pointer-events-none"}
            `}
          >
            {/* HEADER */}
            <div className="p-6 border-b border-white/20">
              <p className="text-lg font-semibold text-white">
                {user.name}
              </p>
              <p className="text-sm text-gray-300">
                {user.email}
              </p>
            </div>

            {/* DETAILS */}
            <div className="p-6 space-y-3 text-sm text-gray-200">
              <p>
                <span className="text-gray-400">Profession:</span>{" "}
                {user.profession || "Not provided"}
              </p>
              <p>
                <span className="text-gray-400">Phone:</span>{" "}
                {user.phone || "Not provided"}
              </p>
            </div>

            {/* ACTION */}
            <div className="p-6 border-t border-white/20">
              <button
                onClick={handleLogout}
                className="
                  w-full py-2 rounded-xl
                  bg-red-500/90 hover:bg-red-600
                  text-white font-semibold
                  transition
                "
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}
