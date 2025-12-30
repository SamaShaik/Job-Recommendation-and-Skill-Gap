import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import api from "../services/api";
import {
  validateName,
  validateEmail,
  validatePhone,
} from "../utils/validations";

export default function Signup() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    profession: "",
    password: "",
  });

  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!validateName(form.name))
      return setError("Name must contain only letters");

    if (!validateEmail(form.email))
      return setError("Invalid email format");

    if (!validatePhone(form.phone))
      return setError("Phone must be 10 digits");

    try {
      await api.post("/signup", {
        name: form.name,
        email: form.email,
        password: form.password,
        profession: form.profession,
        phone: form.phone,
      });

      navigate("/login");
    } catch (err) {
      setError(err.response?.data?.error || "Signup failed");
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
        {/* SIGNUP CARD */}
        <div
          className="w-full max-w-md p-8 rounded-2xl
          bg-white/10 backdrop-blur-xl border border-white/20 shadow-2xl"
        >
          <h2
            className="text-3xl font-extrabold text-center
            text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 to-pink-300"
          >
            Create Your Account
          </h2>

          <p className="text-center text-gray-200 mt-2">
            Join the Skill Gap Platform
          </p>

          {error && (
            <p className="mt-4 text-red-400 text-sm text-center">
              {error}
            </p>
          )}

          <form onSubmit={handleSubmit} className="mt-6 space-y-4">
            {["name", "email", "phone", "profession", "password"].map((field) => (
              <input
                key={field}
                name={field}
                type={field === "password" ? "password" : "text"}
                placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
                onChange={handleChange}
                required
                className="
                  w-full px-4 py-3 rounded-xl
                  bg-white/10 text-white placeholder-gray-300
                  border border-white/20
                  focus:outline-none focus:ring-2
                  focus:ring-cyan-400
                "
              />
            ))}

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
              Sign Up
            </button>
          </form>

          <p className="text-center text-sm text-gray-300 mt-6">
            Already have an account?{" "}
            <Link
              to="/login"
              className="text-cyan-300 hover:underline font-medium"
            >
              Login
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
