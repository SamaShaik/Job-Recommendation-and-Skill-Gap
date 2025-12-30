import { useState, useRef } from "react";
import axios from "axios";
import { API_BASE_URL } from "../config/api";

export default function ResumeUpload({ onSuccess }) {
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const fileInputRef = useRef(null);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleUpload = async () => {
    if (!file) {
      alert("Please select a PDF resume");
      return;
    }

    const formData = new FormData();
    formData.append("resume", file);

    try {
      setLoading(true);
      const res = await axios.post(
        `${API_BASE_URL}/upload-resume`,
        formData,
        { headers: { "Content-Type": "multipart/form-data" } }
      );

      onSuccess(res.data);
      localStorage.setItem("resumeUploaded", "true");

    } catch (err) {
      alert("Resume upload failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="w-full max-w-xl mx-auto p-10 rounded-3xl
      bg-white/10 backdrop-blur-xl
      border border-white/20 shadow-2xl text-center"
    >
      {/* ICON */}
      <div className="text-5xl mb-4">📄</div>

      <h3 className="text-2xl font-semibold mb-2">
        Upload Your Resume
      </h3>

      <p className="text-gray-300 mb-6">
        Upload a PDF resume to get AI-powered job recommendations
      </p>

      {/* HIDDEN FILE INPUT */}
      <input
        type="file"
        accept=".pdf"
        ref={fileInputRef}
        onChange={handleFileChange}
        className="hidden"
      />
      {/* CUSTOM UPLOAD BOX */}
      <div
        onClick={() => fileInputRef.current.click()}
        className="cursor-pointer
        border-2 border-dashed border-white/30
        rounded-2xl p-8 mb-6
        hover:border-cyan-400
        hover:bg-white/5
        transition-all duration-300"
      >
        <p className="text-gray-200">
          {file ? file.name : "Click to select your resume (PDF)"}
        </p>
      </div>

      {/* UPLOAD BUTTON */}
      <button
        onClick={handleUpload}
        disabled={loading}
        className="px-8 py-3 rounded-xl font-semibold text-lg
        bg-gradient-to-r from-cyan-400 to-blue-500
        hover:from-cyan-300 hover:to-blue-400
        transition-all duration-300 shadow-lg
        hover:shadow-cyan-500/40 disabled:opacity-60"
      >
        {loading ? "Uploading..." : "Upload Resume"}
      </button>

      <p className="mt-4 text-sm text-gray-400">
        Supported format: PDF only
      </p>
    </div>
  );
}
