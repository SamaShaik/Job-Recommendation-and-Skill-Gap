import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div className="min-h-screen pt-20 relative overflow-hidden
      bg-gradient-to-br from-slate-900 via-indigo-900 to-purple-900 text-white">

      {/* BACKGROUND GLOW EFFECTS */}
      <div className="absolute -top-40 -left-40 w-[500px] h-[500px] bg-cyan-400 rounded-full blur-[140px] opacity-25"></div>
      <div className="absolute top-1/3 -right-40 w-[500px] h-[500px] bg-pink-500 rounded-full blur-[140px] opacity-25"></div>

      {/* CONTENT */}
      <div className="relative z-10 flex flex-col items-center px-6 py-24">

        <div className="max-w-6xl w-full text-center">

          {/* MAIN TITLE */}
          <h1 className="text-5xl md:text-6xl font-extrabold leading-tight
            text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 to-pink-300">
            Career Recommendation & Skill Analyzer
          </h1>

          <p className="mt-6 text-lg md:text-xl text-gray-200 max-w-3xl mx-auto">
            Upload your resume, receive AI-powered job recommendations,
            and clearly identify the skills you need to reach your dream role.
          </p>

          {/* ACTION BUTTONS */}
          <div className="mt-10 flex justify-center gap-6 flex-wrap">
            <Link
              to="/signup"
              className="px-8 py-3 rounded-xl font-semibold text-lg
              bg-gradient-to-r from-cyan-400 to-blue-500
              hover:from-cyan-300 hover:to-blue-400
              transition-all duration-300 shadow-lg hover:shadow-cyan-500/40"
            >
              Get Started
            </Link>

            <Link
              to="/login"
              className="px-8 py-3 rounded-xl font-semibold text-lg
              border border-white/30
              hover:bg-white/10
              transition-all duration-300"
            >
              Login
            </Link>
          </div>

          <div className="mt-24 grid grid-cols-1 md:grid-cols-2 gap-10 text-left max-w-4xl mx-auto">

            <div className="p-6 rounded-2xl bg-white/10 backdrop-blur
              border border-white/20 hover:scale-105 transition">
              <h3 className="text-xl font-semibold mb-3">
                🔍 Job Recommendations
              </h3>
              <p className="text-gray-200">
                AI-driven job role suggestions tailored to your resume skills.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-white/10 backdrop-blur
              border border-white/20 hover:scale-105 transition">
              <h3 className="text-xl font-semibold mb-3">
                📊 Skill Gap Analysis
              </h3>
              <p className="text-gray-200">
                Instantly identify missing skills for your target role.
              </p>
            </div>
          </div>
        </div>

        {/* FOOTER */}
        <footer className="mt-32 text-sm text-gray-300 text-center">
          © {new Date().getFullYear()} Skill Gap Platform. All rights reserved.
        </footer>

      </div>
    </div>
  );
}

