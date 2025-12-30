import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import api from "../services/api";
import { useAuth } from "../context/AuthContext";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();
  const { login } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const res = await api.post("/login", { email, password });
      login(res.data.user);
      navigate("/dashboard");
    } catch {
      setError("Invalid email or password");
    }
  };

  return (
    <div
      className="min-h-screen relative overflow-hidden
      bg-gradient-to-br from-slate-900 via-indigo-900 to-purple-900 text-white"
    >
      <div className="absolute -top-40 -left-40 w-[500px] h-[500px] bg-cyan-400 rounded-full blur-[140px] opacity-25"></div>
      <div className="absolute top-1/3 -right-40 w-[500px] h-[500px] bg-pink-500 rounded-full blur-[140px] opacity-25"></div>

      {/* CONTENT */}
      <div className="relative z-10 flex items-center justify-center px-6 py-24">
        {/* LOGIN CARD */}
        <div
          className="w-full max-w-md p-8 rounded-2xl
          bg-white/10 backdrop-blur-xl border border-white/20 shadow-2xl"
        >
          <h2
            className="text-3xl font-extrabold text-center
            text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 to-pink-300"
          >
            Welcome Back
          </h2>

          <p className="text-center text-gray-200 mt-2">
            Login to continue your career journey
          </p>

          {error && (
            <p className="mt-4 text-red-400 text-sm text-center">
              {error}
            </p>
          )}

          <form onSubmit={handleSubmit} className="mt-6 space-y-4">
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="
                w-full px-4 py-3 rounded-xl
                bg-white/10 text-white placeholder-gray-300
                border border-white/20
                focus:outline-none focus:ring-2
                focus:ring-cyan-400
              "
            />

            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="
                w-full px-4 py-3 rounded-xl
                bg-white/10 text-white placeholder-gray-300
                border border-white/20
                focus:outline-none focus:ring-2
                focus:ring-cyan-400
              "
            />

            <button
              type="submit"
              className="
                w-full py-3 rounded-xl font-semibold text-lg
                bg-gradient-to-r from-cyan-400 to-blue-500
                hover:from-cyan-300 hover:to-blue-400
                transition-all duration-300
                shadow-lg hover:shadow-cyan-500/40
              "
            >
              Login
            </button>
          </form>

          <p className="text-center text-sm text-gray-300 mt-6">
            Don’t have an account?{" "}
            <Link
              to="/signup"
              className="text-cyan-300 hover:underline font-medium"
            >
              Create one
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
