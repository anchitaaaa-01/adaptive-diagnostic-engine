from fastapi import APIRouter, HTTPException
from bson import ObjectId

from app.database import sessions_collection, questions_collection
from app.services.adaptive_service import get_next_question
from app.services.irt_engine import update_ability
from app.services.ai_analysis_service import generate_study_plan

router = APIRouter()


# -----------------------------
# START SESSION
# -----------------------------
@router.post("/start-session")
def start_session():

    session = {
        "ability": 0.0,
        "questions_answered": 0,
        "history": []
    }

    result = sessions_collection.insert_one(session)

    return {
        "session_id": str(result.inserted_id),
        "message": "Session started successfully"
    }


# -----------------------------
# GET NEXT QUESTION
# -----------------------------
@router.get("/next-question/{session_id}")
def next_question(session_id: str):

    session = sessions_collection.find_one({"_id": ObjectId(session_id)})

    if not session:
        raise HTTPException(status_code=404, detail="Session not found")

    ability = session["ability"]

    question = get_next_question(ability)

    if not question:
        raise HTTPException(status_code=404, detail="No questions available")

    return {
        "question_id": str(question["_id"]),
        "question": question["question_text"],
        "options": question["options"],
        "difficulty": question["difficulty"],
        "topic": question["topic"]
    }


# -----------------------------
# SUBMIT ANSWER
# -----------------------------
@router.post("/submit-answer")
def submit_answer(session_id: str, question_id: str, answer: str):

    session = sessions_collection.find_one({"_id": ObjectId(session_id)})

    if not session:
        raise HTTPException(status_code=404, detail="Session not found")

    question = questions_collection.find_one({"_id": ObjectId(question_id)})

    if not question:
        raise HTTPException(status_code=404, detail="Question not found")

    correct = answer == question["correct_answer"]

    # Update ability using IRT
    new_ability = update_ability(
        session["ability"],
        question["discrimination"],
        question["difficulty"],
        question["guessing"],
        correct
    )

    history_entry = {
        "question_id": str(question["_id"]),
        "correct": correct,
        "difficulty": question["difficulty"],
        "topic": question["topic"]
    }

    sessions_collection.update_one(
        {"_id": ObjectId(session_id)},
        {
            "$set": {"ability": new_ability},
            "$push": {"history": history_entry},
            "$inc": {"questions_answered": 1}
        }
    )

    return {
        "correct": correct,
        "new_ability": new_ability
    }


# -----------------------------
# SESSION SUMMARY
# -----------------------------
@router.get("/session-summary/{session_id}")
def session_summary(session_id: str):

    session = sessions_collection.find_one({"_id": ObjectId(session_id)})

    if not session:
        raise HTTPException(status_code=404, detail="Session not found")

    history = session.get("history", [])

    weak_topics = [h["topic"] for h in history if not h["correct"]]

    return {
        "ability_score": session["ability"],
        "questions_answered": session["questions_answered"],
        "weak_topics": weak_topics
    }

@router.get("/generate-study-plan/{session_id}")
def study_plan(session_id: str):

    session = sessions_collection.find_one({"_id": ObjectId(session_id)})

    if not session:
        raise HTTPException(status_code=404, detail="Session not found")

    history = session.get("history", [])

    weak_topics = [h["topic"] for h in history if not h["correct"]]

    ability = session["ability"]

    plan = generate_study_plan(weak_topics, ability)

    return {
        "ability_score": ability,
        "weak_topics": weak_topics,
        "study_plan": plan
    }