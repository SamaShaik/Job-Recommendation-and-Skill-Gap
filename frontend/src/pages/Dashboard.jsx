// Dashboard.jsx ✅ FINAL
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Dashboard() {
  const { user } = useAuth();

  return (
    <div
      className="
      relative overflow-hidden
      min-h-[calc(100vh-64px)]
      bg-gradient-to-br from-slate-900 via-indigo-900 to-purple-900
      text-white
      "
    >
      {/* BACKGROUND GLOWS */}
      <div className="absolute -top-40 -left-40 w-[500px] h-[500px] bg-cyan-400 rounded-full blur-[140px] opacity-25"></div>
      <div className="absolute top-1/3 -right-40 w-[500px] h-[500px] bg-pink-500 rounded-full blur-[140px] opacity-25"></div>

      {/* CONTENT */}
      <div className="relative z-10 max-w-6xl mx-auto px-6 py-20">

        {/* HEADER */}
        <h1
          className="
          text-4xl md:text-5xl font-extrabold mb-4
          text-transparent bg-clip-text
          bg-gradient-to-r from-cyan-300 to-pink-300
          "
        >
          Welcome{user?.name ? `, ${user.name}` : ""}
        </h1>

        <p className="text-gray-300 text-lg mb-14 max-w-2xl">
          Choose what you want to do next. Upload your resume inside
          each section to get personalized insights.
        </p>

        {/* ACTION CARDS */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">

          {/* JOB RECOMMENDATION */}
          <Link
            to="/job-recommendation"
            className="
            group p-10 rounded-3xl
            bg-white/10 backdrop-blur-xl
            border border-white/20
            transition-all duration-300
            hover:scale-[1.04]
            hover:border-cyan-400
            hover:shadow-[0_0_60px_rgba(34,211,238,0.35)]
            "
          >
            <h2 className="text-2xl font-semibold mb-3">
              🔍 Job Recommendations
            </h2>

            <p className="text-gray-300 mb-6">
              Get AI-powered job role suggestions based on your resume
              and skill set.
            </p>

            <span className="text-cyan-300 font-semibold group-hover:underline">
              Explore →
            </span>
          </Link>

          {/* SKILL GAP */}
          <Link
            to="/skill-gap"
            className="
            group p-10 rounded-3xl
            bg-white/10 backdrop-blur-xl
            border border-white/20
            transition-all duration-300
            hover:scale-[1.04]
            hover:border-pink-400
            hover:shadow-[0_0_60px_rgba(236,72,153,0.35)]
            "
          >
            <h2 className="text-2xl font-semibold mb-3">
              📊 Skill Gap Analysis
            </h2>

            <p className="text-gray-300 mb-6">
              Compare your skills with your target role and discover
              what to learn next.
            </p>

            <span className="text-pink-300 font-semibold group-hover:underline">
              Analyze →
            </span>
          </Link>

        </div>

        {/* FOOTER */}
        <footer className="py-10 text-center text-sm text-gray-400">
          © {new Date().getFullYear()} Skill Gap Platform. All rights reserved.
        </footer>
      </div>
    </div>
  );
}

