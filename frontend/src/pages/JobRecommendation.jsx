import { useState } from "react";
import ResumeUpload from "../components/ResumeUpload";
import JobCard from "../components/JobCard";
import axios from "axios";
import { API_BASE_URL } from "../config/api";
import BackButton from "../components/BackButton";

export default function JobRecommendation() {
  const [resumeInfo, setResumeInfo] = useState(null);
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchRecommendations = async () => {
    try {
      setLoading(true);
      const res = await axios.get(`${API_BASE_URL}/recommend-jobs`);
      setJobs(res.data);
    } catch {
      alert("Failed to fetch recommendations");
    } finally {
      setLoading(false);
    }
  };
  <BackButton />

  return (
    <div
      className="min-h-screen relative overflow-hidden
      bg-gradient-to-br from-slate-900 via-indigo-900 to-purple-900 text-white p-10"
    >
      <h2 className="text-4xl font-bold mb-10 text-center">
        Job Recommendations
      </h2>

      {/* Resume Upload */}
      {!resumeInfo && (
        <ResumeUpload onSuccess={setResumeInfo} />
      )}

      {/* After upload */}
      {resumeInfo && (
        <div className="max-w-5xl mx-auto">
          <button
            onClick={fetchRecommendations}
            className="mb-8 px-8 py-3 rounded-xl font-semibold
            bg-gradient-to-r from-cyan-400 to-blue-500
            hover:from-cyan-300 hover:to-blue-400 transition"
          >
            {loading ? "Analyzing..." : "Get Job Recommendations"}
          </button>

          <div className="grid gap-6">
            {jobs.map((job, i) => (
              <JobCard
                key={i}
                title={job.job_title}
                score={job.ml_score}
                matched={job.matched_skills}
                missing={job.missing_skills}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
