import { useState } from "react";
import ResumeUpload from "../components/ResumeUpload";
import SkillBadge from "../components/SkillBadge";
import Loader from "../components/Loader";

export default function SkillGap() {
  const [resumeUploaded, setResumeUploaded] = useState(false);
  const [jobTitle, setJobTitle] = useState("");
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

const analyzeSkillGap = async () => {
  if (!jobTitle) {
    setError("Job title is required");
    return;
  }

  setLoading(true);
  setError("");
  setResult(null);

  try {
    const res = await fetch("http://127.0.0.1:5000/skill-gap", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        job_title: jobTitle,
      }),
    });

    const data = await res.json();

    if (!res.ok) {
      throw new Error(data.error || "Skill gap failed");
    }

    setResult(data);
  } catch (err) {
    setError(err.message);
  } finally {
    setLoading(false);
  }
};

  return (
    <div
      className="min-h-screen relative overflow-hidden
      bg-gradient-to-br from-slate-900 via-indigo-900 to-purple-900 text-white p-10"
    >
      <h2 className="text-4xl font-bold mb-10 text-center">
        Skill Gap Analysis
      </h2>

      {!resumeUploaded && (
        <ResumeUpload onSuccess={() => setResumeUploaded(true)} />
      )}

      {resumeUploaded && (
        <div className="max-w-md mx-auto bg-white/10 backdrop-blur-xl
          border border-white/20 rounded-2xl p-6">

          <input
            type="text"
            placeholder="Target job title (e.g. Data Analyst)"
            className="w-full p-3 rounded bg-white/20 text-white placeholder-gray-300 mb-4"
            value={jobTitle}
            onChange={(e) => setJobTitle(e.target.value)}
          />

          <button
            onClick={analyzeSkillGap}
            className="w-full py-3 rounded-xl font-semibold
            bg-gradient-to-r from-pink-400 to-purple-500
            hover:from-pink-300 hover:to-purple-400 transition"
          >
            Analyze Skill Gap
          </button>

          {error && <p className="text-red-400 mt-3">{error}</p>}
        </div>
      )}

      {loading && <Loader />}

      {result && (
        <div className="mt-10 max-w-4xl mx-auto">
          <p className="mb-6 text-lg">
            Match Percentage: <b>{result.match_percentage}%</b>
          </p>

          <h3 className="font-semibold mb-2">Matched Skills</h3>
          <div className="flex gap-2 flex-wrap mb-6">
            {result.matched_skills.map((s, i) => (
              <SkillBadge key={i} skill={s} type="matched" />
            ))}
          </div>

          <h3 className="font-semibold mb-2">Missing Skills</h3>
          <div className="flex gap-2 flex-wrap">
            {result.missing_skills.map((s, i) => (
              <SkillBadge key={i} skill={s} type="missing" />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
