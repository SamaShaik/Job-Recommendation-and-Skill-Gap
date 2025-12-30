# resume_parser.py
import re
import pandas as pd
import os

# Load skills dynamically from dataset
DATASET_PATH = os.path.join("..", "dataset", "new_jobs.csv")

df = pd.read_csv(DATASET_PATH)

def build_skill_list(df):
    skills = set()

    for skill_str in df["Skills"].dropna():
        for s in skill_str.split(","):
            s = s.strip().lower()
            if len(s) > 1:
                skills.add(s)

    return sorted(skills)

SKILL_LIST = build_skill_list(df)


def extract_skills(text):
    text = text.lower()
    found = set()

    for skill in SKILL_LIST:
        # word boundary + flexible spacing
        pattern = r"\b" + re.escape(skill) + r"\b"
        if re.search(pattern, text):
            found.add(skill)

    return sorted(found)
