export default function JobCard({ title, score, matched, missing }) {
  return (
    <div className="bg-white/10 backdrop-blur-xl
      border border-white/20
      rounded-3xl p-6 shadow-xl
      text-white">

      {/* JOB TITLE */}
      <h3 className="text-2xl font-bold mb-2
        text-transparent bg-clip-text
        bg-gradient-to-r from-cyan-300 to-pink-300">
        {title}
      </h3>

      {/* SCORE */}
      <p className="text-sm text-gray-300 mb-4">
        ML Match Score: <b>{score}%</b>
      </p>

      {/* PROGRESS BAR */}
      <div className="w-full bg-white/10 rounded-full h-2 mb-4">
        <div
          className="h-2 rounded-full bg-gradient-to-r from-cyan-400 to-pink-400"
          style={{ width: `${score}%` }}
        />
      </div>

      {/* MATCHED */}
      <p className="text-green-300 text-sm mb-2">
        <b>Matched:</b>{" "}
        {matched.length ? matched.join(", ") : "None"}
      </p>

      {/* MISSING */}
      <p className="text-red-300 text-sm">
        <b>Missing:</b>{" "}
        {missing.length ? missing.join(", ") : "None 🎉"}
      </p>
    </div>
  );
}
