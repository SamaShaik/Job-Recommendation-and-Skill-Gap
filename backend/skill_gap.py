def analyze_skill_gap(user_skills, job_skills):
    job_skills = [s.strip().lower() for s in job_skills]
    user_skills = [s.strip().lower() for s in user_skills]

    matched = list(set(user_skills) & set(job_skills))
    missing = list(set(job_skills) - set(user_skills))

    match_percentage = int(
        (len(matched) / len(job_skills)) * 100
    ) if job_skills else 0

    return {
        "match_percentage": match_percentage,
        "matched_skills": matched,
        "missing_skills": missing
    }
