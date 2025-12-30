# 🚀 Job Recommendation & Skill Gap Analysis Platform

An **AI-powered web application** designed to help users understand where they stand in their career journey.  
The platform analyzes a user’s **resume** to recommend relevant **job roles** and identify **missing skills** required for specific target positions.

---

## 🎯 Problem Statement

Many students and job seekers struggle to:

- **Identify suitable job roles** based on their current skills  
- **Understand missing skills** for their desired job roles  
- **Get clear, data-driven guidance** for career growth  

This platform bridges that gap using **Machine Learning** and **Natural Language Processing (NLP)** techniques.

---

## 🧠 System Workflow

1. User creates an account and logs in  
2. Resume (**PDF format**) is uploaded  
3. Resume text is extracted and processed  
4. Skills are identified using **NLP**  
5. Job roles are matched using **ML similarity techniques**  
6. Skill gaps are displayed for selected job roles  

---

## 🔧 Tech Stack Used

### 🖥️ Frontend
- **React (Vite)** – UI development  
- **Tailwind CSS** – Modern, responsive UI styling  
- **Axios** – API communication  
- **React Router** – Navigation & protected routes  

### ⚙️ Backend
- **Python Flask** – REST API development  
- **Flask-CORS** – Cross-origin support  
- **PDF Parsing Libraries** – Resume text extraction  

### 🤖 Machine Learning
- **TF-IDF Vectorization**  
- **Cosine Similarity**  

Used to match resume skills with job requirements.

### 🗄️ Database
- **MongoDB** – Stores user data, resumes, and job recommendations  

---

## ✨ Key Features

- **User authentication** (Signup / Login)  
- **Resume upload and processing**  
- **AI-powered job recommendations**  
- **Skill gap analysis** for selected roles  
- **User profile dashboard**  
- **Clean, professional UI** with gradient design  

---

## ▶️ How to Run the Project

### 🔙 Backend Setup
```bash
cd backend
pip install -r requirements.txt
python app.py
### 🔜 Frontend Setup
cd frontend
npm install
npm run dev

