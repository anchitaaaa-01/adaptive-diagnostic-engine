const API_URL = "http://127.0.0.1:8000";

export async function startSession() {
  const res = await fetch(`${API_URL}/start-session`, {
    method: "POST"
  });

  return res.json();
}

export async function getNextQuestion(sessionId: string) {
  const res = await fetch(`${API_URL}/next-question/${sessionId}`);
  return res.json();
}

export async function submitAnswer(
  sessionId: string,
  questionId: string,
  answer: string
) {

  const res = await fetch(`${API_URL}/submit-answer`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      session_id: sessionId,
      question_id: questionId,
      answer: answer
    })
  });

  return res.json();
}

export async function getStudyPlan(sessionId: string) {
  const res = await fetch(`${API_URL}/generate-study-plan/${sessionId}`);
  return res.json();
}