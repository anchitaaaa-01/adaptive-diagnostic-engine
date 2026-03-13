# AI-Driven Adaptive Diagnostic Engine

## Demo

Frontend: http://localhost:8080  
API Docs: http://localhost:8000/docs

This project is a prototype of an adaptive assessment system that dynamically adjusts question difficulty to estimate a student's proficiency level.

The system mimics how exams like GRE, GMAT, and Duolingo English Test work by selecting questions based on the student's previous answers.

The project was built as part of an internship assignment focused on system design, adaptive algorithms, and AI-assisted development.

---

# Project Overview

Traditional quizzes show the same questions to every student.

This system instead:

1. Starts with a medium difficulty question.
2. If the student answers correctly → the next question becomes harder.
3. If the student answers incorrectly → the next question becomes easier.
4. After every response, the student's ability score is updated.
5. At the end of the test, an AI model generates a personalized study plan.

The goal is to quickly estimate a student's real ability level with fewer questions.

---

# Tech Stack

Backend
- Python
- FastAPI
- MongoDB Atlas
- PyMongo

Frontend
- React
- Vite
- TailwindCSS
- Framer Motion

AI Integration
- OpenAI API (used to generate personalized study plans)

---

# System Architecture

Frontend (React UI)
        ↓
FastAPI Backend
        ↓
Adaptive Testing Algorithm
        ↓
MongoDB Database
        ↓
AI Study Plan Generator

The frontend communicates with the backend using REST APIs.
The backend performs adaptive question selection and stores session data in MongoDB.

---

# Database Design

The project uses two MongoDB collections.

## Questions Collection

Stores GRE-style questions with difficulty and metadata.

Example document:

{
  "question": "Solve for x: 2x + 3 = 11",
  "options": ["2","3","4","5"],
  "correct_answer": "4",
  "difficulty": 0.6,
  "topic": "Algebra",
  "tags": ["equations","linear"]
}

Each question includes:
- difficulty score (0.1 – 1.0)
- topic
- tags
- correct answer

---

## UserSession Collection

Tracks the progress of a student taking the test.

Example document:

{
  "ability": 0.5,
  "questions_answered": 3,
  "history": [
    {
      "question_id": "...",
      "correct": true,
      "topic": "Algebra"
    }
  ]
}

This allows the system to:
- track student progress
- update ability score
- detect weak topics

---

# Adaptive Algorithm Logic

The adaptive testing system follows a simplified Item Response Theory (IRT) approach.

### Starting Point

The student begins with an ability score of:

0.5

The first question is selected with a difficulty close to this value.

---

### Question Selection Logic

After each answer:

If correct → next question is harder  
If incorrect → next question is easier

The next question is chosen based on the difference between:

| question difficulty − user ability |

The closest match is selected.

---

### Ability Score Update

After every response the ability score is updated using a logistic function.

Probability of correct answer:

P(correct) = 1 / (1 + e^(difficulty − ability))

Ability update rule:

ability_new = ability + learning_rate × (correct − P(correct))

Where:

correct = 1 if answer is correct  
correct = 0 if answer is incorrect

This gradually moves the ability score toward the student's real skill level.

---

# AI Study Plan Generation

After the adaptive test finishes (around 10 questions), the system analyzes:

- topics the student answered incorrectly
- final ability score

This data is sent to an LLM which generates a personalized study plan.

Example AI output:

1. Review algebra fundamentals with daily practice questions.
2. Improve vocabulary by learning 10 new words each day.
3. Take weekly timed quizzes focusing on weak topics.

This demonstrates how AI can assist students with targeted learning recommendations.

---

# API Documentation

## Start Session

POST /start-session

Creates a new test session.

Response example:

{
  "session_id": "123abc"
}

---

## Get Next Question

GET /next-question/{session_id}

Returns the next adaptive question.

---

## Submit Answer

POST /submit-answer

Request example:

{
  "session_id": "123abc",
  "question_id": "q1",
  "answer": "4"
}

Response example:

{
  "correct": true,
  "new_ability": 0.63
}

---

## Get Analytics

GET /analytics/{session_id}

Returns:
- ability score
- number of questions answered
- accuracy
- weak topics

---

## Generate Study Plan

GET /generate-study-plan/{session_id}

Returns an AI-generated personalized study plan.

---

# Running the Project

# Backend Setup

Create virtual environment

python -m venv .venv

Activate environment

.venv\Scripts\activate

Install dependencies

pip install -r requirements.txt

Run backend server

python -m uvicorn app.main:app --reload

Backend API docs will be available at:

http://localhost:8000/docs

---

# Frontend Setup

Navigate to frontend folder

cd frontend

Install dependencies

npm install

Run development server

npm run dev

Frontend will run at:

http://localhost:8080

---

# AI Development Log

AI tools used during development:

- ChatGPT
- Cursor
- Lovable

How AI helped:

- generating FastAPI project structure
- designing MongoDB schema
- implementing adaptive algorithm
- generating frontend UI components
- debugging integration between frontend and backend

Challenges AI could not fully solve:

- integrating Lovable frontend with backend APIs
- handling CORS configuration
- fixing deployment issues

These were solved through manual debugging and testing.

---

# Future Improvements

Possible improvements for this system include:

- multi-dimensional IRT models
- better question difficulty calibration
- student analytics dashboard
- AI tutoring chatbot
- larger question bank

---

# Author

Anchita Jain

AI-Driven Adaptive Diagnostic Engine
