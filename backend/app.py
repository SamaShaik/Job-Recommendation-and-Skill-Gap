from flask import Flask, request, jsonify
from flask_pymongo import PyMongo
from flask_cors import CORS
from dotenv import load_dotenv
import os
import pandas as pd

from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity

from resume_reader import extract_text_from_pdf
from resume_parser import extract_skills
from skill_gap import analyze_skill_gap

# LOAD ENV
load_dotenv()

# APP SETUP
app = Flask(__name__)
CORS(app)


# MONGODB CONFIG
app.config["MONGO_URI"] = os.getenv("MONGO_URI")
mongo = PyMongo(app)
db = mongo.db

users_col = db.users
resumes_col = db.resumes
recommendations_col = db.recommendations

print("✅ MongoDB connected")

# LOAD DATASET
DATASET_PATH = os.path.join("..", "dataset", "new_jobs.csv")
df = pd.read_csv(DATASET_PATH)[["Job Title", "Skills"]]

def clean_skills(skills):
    if pd.isna(skills):
        return []
    return [s.strip().lower() for s in skills.split(",")]

df["skill_list"] = df["Skills"].apply(clean_skills)
df["skill_text"] = df["skill_list"].apply(lambda x: " ".join(x))

print("✅ Dataset loaded")

# ML MODEL
vectorizer = TfidfVectorizer(stop_words="english")
job_vectors = vectorizer.fit_transform(df["skill_text"])
print("✅ TF-IDF model ready")

# TEMP STORAGE (demo only)
resume_text = ""
resume_skills = []

# UPLOAD RESUME
@app.route("/upload-resume", methods=["POST"])
def upload_resume():
    global resume_text, resume_skills

    if "resume" not in request.files:
        return jsonify({"error": "Resume required"}), 400

    file = request.files["resume"]
    resume_text = extract_text_from_pdf(file).lower()
    resume_skills = extract_skills(resume_text)

    resumes_col.insert_one({
        "resume_text": resume_text,
        "resume_skills": resume_skills
    })

    return jsonify({
        "message": "Resume uploaded successfully",
        "extracted_skills": resume_skills
    })

# JOB RECOMMENDATION
@app.route("/recommend-jobs", methods=["GET"])
def recommend_jobs():
    if not resume_text:
        return jsonify({"error": "Upload resume first"}), 400

    resume_vector = vectorizer.transform([resume_text])
    similarity_scores = cosine_similarity(resume_vector, job_vectors)[0]

    results = []

    for idx, score in enumerate(similarity_scores):
        job_title = df.iloc[idx]["Job Title"]
        job_skills = df.iloc[idx]["skill_list"]

        gap = analyze_skill_gap(resume_skills, job_skills)

        results.append({
            "job_title": job_title,
            "ml_score": round(score * 100, 2),
            "match_percentage": gap["match_percentage"],
            "matched_skills": gap["matched_skills"],
            "missing_skills": gap["missing_skills"]
        })

    results = sorted(results, key=lambda x: x["ml_score"], reverse=True)[:5]

    recommendations_col.insert_one({
        "resume_skills": resume_skills,
        "recommendations": results
    })

    return jsonify(results)

# SKILL GAP (TARGET JOB)
@app.route("/skill-gap", methods=["POST"])
def skill_gap():
    data = request.get_json(force=True)
    job_title = data.get("job_title")

    if not job_title:
        return jsonify({"error": "Job title required"}), 400

    if not resume_skills:
        return jsonify({"error": "Resume not uploaded"}), 400

    job_row = df[df["Job Title"].str.lower() == job_title.lower()]
    if job_row.empty:
        return jsonify({"error": "Job title not found"}), 404

    job_skills = job_row.iloc[0]["skill_list"]
    gap = analyze_skill_gap(resume_skills, job_skills)

    return jsonify({
        "job_title": job_title,
        "matched_skills": gap["matched_skills"],
        "missing_skills": gap["missing_skills"],
        "match_percentage": gap["match_percentage"]
    })

# SIGNUP
@app.route("/signup", methods=["POST"])
def signup():
    data = request.get_json(force=True)

    user = {
        "name": data.get("name"),
        "email": data.get("email"),
        "password": data.get("password"),
        "profession": data.get("profession"),
        "phone": data.get("phone")
    }

    if not user["email"] or not user["password"]:
        return jsonify({"error": "Required fields missing"}), 400

    if users_col.find_one({"email": user["email"]}):
        return jsonify({"error": "User already exists"}), 409

    users_col.insert_one(user)

    return jsonify({"message": "Signup successful"}), 201

# LOGIN
@app.route("/login", methods=["POST"])
def login():
    data = request.get_json(force=True)

    email = data.get("email")
    password = data.get("password")

    user = users_col.find_one({"email": email})
    if not user:
        return jsonify({"error": "User not found"}), 404

    if user["password"] != password:
        return jsonify({"error": "Invalid password"}), 401

    return jsonify({
        "message": "Login successful",
        "user": {
            "name": user["name"],
            "email": user["email"],
            "profession": user.get("profession"),
            "phone": user.get("phone")
        }
    })

# ROOT
@app.route("/")
def home():
    return jsonify({"status": "Backend running"})

# RUN SERVER
if __name__ == "__main__":
    app.run(debug=True)
