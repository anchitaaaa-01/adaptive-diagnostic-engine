import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle2, XCircle } from "lucide-react";
import type { Question } from "@/lib/mockData";

interface QuestionInterfaceProps {
  question: Question;
  questionIndex: number;
  totalQuestions: number;
  onAnswer: (selectedIndex: number) => void;
  abilityScore: number;
}

const QuestionInterface = ({
  question,
  questionIndex,
  totalQuestions,
  onAnswer,
  abilityScore,
}: QuestionInterfaceProps) => {
  const [selected, setSelected] = useState<number | null>(null);
  const [showResult, setShowResult] = useState(false);
  const progress = ((questionIndex) / totalQuestions) * 100;

  useEffect(() => {
    setSelected(null);
    setShowResult(false);
  }, [question.id]);

  const handleSelect = (index: number) => {
    if (showResult) return;
    setSelected(index);
    setShowResult(true);

    setTimeout(() => {
      onAnswer(index);
    }, 1200);
  };

  const isCorrect = selected === question.correctIndex;
  const difficultyColor = question.difficulty <= 3
    ? "text-cyan" : question.difficulty <= 6
    ? "text-primary" : "text-amber";

  return (
    <motion.div
      className="min-h-screen flex flex-col items-center justify-center px-4 py-8"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      {/* Top bar */}
      <div className="w-full max-w-2xl mb-8">
        <div className="flex items-center justify-between mb-3">
          <span className="text-sm font-display font-500 text-muted-foreground">
            Question {questionIndex + 1}/{totalQuestions}
          </span>
          <div className="flex items-center gap-2">
            <span className="text-xs text-muted-foreground">Difficulty</span>
            <span className={`text-sm font-display font-600 ${difficultyColor}`}>
              {question.difficulty}/10
            </span>
          </div>
        </div>
        {/* Progress bar */}
        <div className="w-full h-1.5 rounded-full bg-muted overflow-hidden">
          <motion.div
            className="h-full rounded-full"
            style={{ background: "linear-gradient(90deg, hsl(var(--primary)), hsl(var(--secondary)))" }}
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.5, ease: "easeOut" }}
          />
        </div>
      </div>

      {/* Ability indicator (small) */}
      <motion.div
        className="glass-card px-4 py-2 mb-6 flex items-center gap-2"
        layout
      >
        <div className="w-3 h-3 rounded-full" style={{
          background: `linear-gradient(135deg, hsl(var(--cyan)), hsl(var(--amber)))`,
        }} />
        <span className="text-xs text-muted-foreground">Ability</span>
        <span className="text-sm font-display font-600 text-foreground">
          {abilityScore.toFixed(1)}
        </span>
      </motion.div>

      {/* Question card */}
      <AnimatePresence mode="wait">
        <motion.div
          key={question.id}
          className="glass-card-elevated glow-border w-full max-w-2xl p-8"
          initial={{ y: 20, opacity: 0, scale: 0.97 }}
          animate={{ y: 0, opacity: 1, scale: 1 }}
          exit={{ y: -20, opacity: 0, scale: 0.97 }}
          transition={{ duration: 0.4 }}
        >
          <span className="text-xs font-display text-muted-foreground uppercase tracking-wider mb-2 block">
            {question.topic}
          </span>
          <h2 className="text-xl sm:text-2xl font-display font-600 text-foreground mb-8 leading-relaxed">
            {question.text}
          </h2>

          <div className="space-y-3">
            {question.options.map((option, i) => {
              let borderStyle = "border-border/50 hover:border-primary/40";
              let bgStyle = "";
              
              if (showResult && i === question.correctIndex) {
                borderStyle = "border-emerald-500/50";
                bgStyle = "bg-emerald-500/10";
              } else if (showResult && i === selected && !isCorrect) {
                borderStyle = "border-destructive/50";
                bgStyle = "bg-destructive/10";
              } else if (selected === i && !showResult) {
                borderStyle = "border-primary/60";
              }

              return (
                <motion.button
                  key={i}
                  onClick={() => handleSelect(i)}
                  className={`w-full text-left p-4 rounded-lg border transition-all duration-200 flex items-center gap-4 ${borderStyle} ${bgStyle} ${
                    !showResult ? "cursor-pointer hover:bg-muted/30" : "cursor-default"
                  }`}
                  whileHover={!showResult ? { x: 4 } : {}}
                  whileTap={!showResult ? { scale: 0.99 } : {}}
                >
                  <span className="w-8 h-8 rounded-lg bg-muted flex items-center justify-center text-sm font-display font-600 text-muted-foreground shrink-0">
                    {String.fromCharCode(65 + i)}
                  </span>
                  <span className="font-body text-foreground">{option}</span>
                  {showResult && i === question.correctIndex && (
                    <CheckCircle2 className="w-5 h-5 text-emerald-400 ml-auto shrink-0" />
                  )}
                  {showResult && i === selected && !isCorrect && (
                    <XCircle className="w-5 h-5 text-destructive ml-auto shrink-0" />
                  )}
                </motion.button>
              );
            })}
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Correct answer celebration */}
      <AnimatePresence>
        {showResult && isCorrect && (
          <motion.div
            className="mt-6 flex items-center gap-2 text-emerald-400 font-display font-600"
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <CheckCircle2 className="w-5 h-5" />
            Correct!
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default QuestionInterface;
