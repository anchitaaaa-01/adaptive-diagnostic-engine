import { useState, useCallback } from "react";
import { AnimatePresence } from "framer-motion";
import MeshBackground from "@/components/MeshBackground";
import LandingPage from "@/components/LandingPage";
import QuestionInterface from "@/components/QuestionInterface";
import ResultsDashboard from "@/components/ResultsDashboard";
import StudyPlanDisplay from "@/components/StudyPlanDisplay";

const API = "http://127.0.0.1:8000";

type AppState = "landing" | "quiz" | "results" | "studyPlan";

interface AnswerRecord {
  questionIndex: number;
  correct: boolean;
  difficulty: number;
  topic: string;
}

const Index = () => {

  const [state, setState] = useState<AppState>("landing");

  const [sessionId, setSessionId] = useState<string | null>(null);

  interface Question {
    id: number;
    text: string;
    options: string[];
    correctIndex: number;
    difficulty: number;
    topic: string;
    // Add other fields as needed based on your backend response
  }
  
    const [question, setQuestion] = useState<Question | null>(null);

  const [answers, setAnswers] = useState<AnswerRecord[]>([]);

  const [currentQ, setCurrentQ] = useState(0);

  const [ability, setAbility] = useState(0);

  const [abilityHistory, setAbilityHistory] = useState<number[]>([]);

  const [studyPlan, setStudyPlan] = useState<string>("");

  // ---------------- START SESSION ----------------

  const handleStart = useCallback(async () => {

    const res = await fetch(`${API}/start-session`, {
      method: "POST",
    });

    const data = await res.json();

    setSessionId(data.session_id);

    const q = await fetch(`${API}/next-question/${data.session_id}`);
    const questionData = await q.json();

    setQuestion({
      id: Number(questionData.id ?? questionData.question_id),
      text: questionData.text,
      options: questionData.options,
      correctIndex: questionData.correctIndex,
      difficulty: questionData.difficulty,
      topic: questionData.topic,
    });

    setCurrentQ(0);
    setAnswers([]);
    setAbility(0);
    setAbilityHistory([0]);

    setState("quiz");

  }, []);

  // ---------------- SUBMIT ANSWER ----------------

  const handleAnswer = useCallback(
    async (selectedIndex: number) => {

      if (!sessionId || !question) return;

      const selectedAnswer = question.options[selectedIndex];

      const res = await fetch(`${API}/submit-answer`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          session_id: sessionId,
          question_id: question.id,
          answer: selectedAnswer
        })
      });

      const result = await res.json();

      const newAbility = result.new_ability;

      const record: AnswerRecord = {
        questionIndex: currentQ,
        correct: result.correct,
        difficulty: question.difficulty,
        topic: question.topic,
      };

      setAnswers((prev) => [...prev, record]);
      setAbility(newAbility);
      setAbilityHistory((prev) => [...prev, newAbility]);

      // get next question
      const q = await fetch(`${API}/next-question/${sessionId}`);
      const nextQ = await q.json();

      if (!nextQ || currentQ >= 9) {
        setState("results");
      } else {
        setQuestion({
          id: Number(nextQ.id ?? nextQ.question_id),
          text: nextQ.text,
          options: nextQ.options,
          correctIndex: nextQ.correctIndex,
          difficulty: nextQ.difficulty,
          topic: nextQ.topic,
        });
        setCurrentQ((prev) => prev + 1);
      }
    },
    [sessionId, question, currentQ]
  );

  // ---------------- GENERATE STUDY PLAN ----------------

  const generateStudyPlan = async () => {

    if (!sessionId) return;

    const res = await fetch(`${API}/generate-study-plan/${sessionId}`);

    const data = await res.json();

    setStudyPlan(data.study_plan);

    setState("studyPlan");
  };

  return (
    <div className="relative min-h-screen">

      <MeshBackground />

      <AnimatePresence mode="wait">

        {state === "landing" && (
          <LandingPage key="landing" onStart={handleStart} />
        )}

        {state === "quiz" && question && (
          <QuestionInterface
            key={`q-${currentQ}`}
            question={question}
            questionIndex={currentQ}
            totalQuestions={10}
            onAnswer={handleAnswer}
            abilityScore={ability}
          />
        )}

        {state === "results" && (
          <ResultsDashboard
            key="results"
            answers={answers}
            finalAbility={ability}
            abilityHistory={abilityHistory}
            onGeneratePlan={generateStudyPlan}
          />
        )}

        {state === "studyPlan" && (
          <StudyPlanDisplay
            key="plan"
            steps={
              Array.isArray(studyPlan)
                ? studyPlan
                : [
                    {
                      step: 1,
                      title: "Study Recommendation",
                      description: typeof studyPlan === "string" ? studyPlan : "",
                      resources: [],
                      icon: "book"
                    }
                  ]
            }
            onBack={() => setState("results")}
          />
        )}

      </AnimatePresence>

    </div>
  );
};

export default Index;