import os
from dotenv import load_dotenv
from openai import OpenAI

# Load environment variables
load_dotenv()

# Get OpenAI API key
OPENAI_API_KEY = os.getenv("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")

# Initialize OpenAI client
client = OpenAI(api_key=OPENAI_API_KEY)


def generate_study_plan(weak_topics, ability_score):
    """
    Generates a personalized 3-step study plan based on the student's
    weak topics and estimated ability score.
    """

    if not weak_topics:
        weak_topics = ["general practice"]

    prompt = f"""
You are an educational AI tutor.

A student has completed an adaptive diagnostic test.

Student ability score: {ability_score}

Weak topics identified:
{weak_topics}

Based on this performance, generate a clear 3-step study plan to help the student improve.

Rules:
- Be concise
- Focus on practical learning steps
- Mention practice recommendations
"""

    try:
        response = client.chat.completions.create(
            model="gpt-4o-mini",
            messages=[
                {
                    "role": "system",
                    "content": "You are a helpful AI learning coach."
                },
                {
                    "role": "user",
                    "content": prompt
                }
            ],
            temperature=0.7
        )

        study_plan = response.choices[0].message.content

        return study_plan

    except Exception as e:
        return f"Error generating study plan: {str(e)}"