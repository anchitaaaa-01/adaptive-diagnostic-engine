import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Trophy, Target, TrendingUp, Sparkles, BarChart3, Activity } from "lucide-react";
import {
  LineChart, Line, BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid,
} from "recharts";

interface AnswerRecord {
  questionIndex: number;
  correct: boolean;
  difficulty: number;
  topic: string;
}

interface ResultsDashboardProps {
  answers: AnswerRecord[];
  finalAbility: number;
  abilityHistory: number[];
  onGeneratePlan: () => void;
}

const ResultsDashboard = ({ answers, finalAbility, abilityHistory, onGeneratePlan }: ResultsDashboardProps) => {
  const [displayScore, setDisplayScore] = useState(0);
  const correctCount = answers.filter((a) => a.correct).length;
  const accuracy = (correctCount / answers.length) * 100;

  // Animated counter
  useEffect(() => {
    let start = 0;
    const end = Math.round(finalAbility * 10);
    const duration = 1500;
    const stepTime = duration / end;
    const timer = setInterval(() => {
      start++;
      setDisplayScore(start);
      if (start >= end) clearInterval(timer);
    }, stepTime);
    return () => clearInterval(timer);
  }, [finalAbility]);

  // Topic breakdown
  const topicMap = new Map<string, { correct: number; total: number }>();
  answers.forEach((a) => {
    const existing = topicMap.get(a.topic) || { correct: 0, total: 0 };
    existing.total++;
    if (a.correct) existing.correct++;
    topicMap.set(a.topic, existing);
  });
  const topicData = Array.from(topicMap.entries()).map(([name, data]) => ({
    name,
    score: Math.round((data.correct / data.total) * 100),
  }));

  // Difficulty progression
  const difficultyData = answers.map((a, i) => ({
    question: `Q${i + 1}`,
    difficulty: a.difficulty,
    ability: abilityHistory[i + 1] || abilityHistory[i],
  }));

  const stats = [
    { icon: Trophy, label: "Ability Score", value: `${(displayScore / 10).toFixed(1)}`, color: "text-primary" },
    { icon: Target, label: "Accuracy", value: `${accuracy.toFixed(0)}%`, color: "text-emerald-400" },
    { icon: TrendingUp, label: "Questions", value: `${correctCount}/${answers.length}`, color: "text-amber" },
    { icon: Activity, label: "Avg Difficulty", value: (answers.reduce((s, a) => s + a.difficulty, 0) / answers.length).toFixed(1), color: "text-secondary" },
  ];

  return (
    <motion.div
      className="min-h-screen px-4 py-12 max-w-5xl mx-auto"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <motion.div
        className="text-center mb-12"
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2 }}
      >
        <h1 className="text-4xl sm:text-5xl font-display font-700 text-foreground mb-2">
          Assessment Complete
        </h1>
        <p className="text-muted-foreground font-body">Here's your performance breakdown</p>
      </motion.div>

      {/* Stats grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        {stats.map((s, i) => (
          <motion.div
            key={s.label}
            className="glass-card-elevated p-5 text-center"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3 + i * 0.1 }}
          >
            <s.icon className={`w-6 h-6 mx-auto mb-2 ${s.color}`} />
            <p className={`text-2xl font-display font-700 ${s.color}`}>{s.value}</p>
            <p className="text-xs text-muted-foreground mt-1">{s.label}</p>
          </motion.div>
        ))}
      </div>

      {/* Charts row */}
      <div className="grid md:grid-cols-2 gap-4 mb-8">
        {/* Difficulty progression */}
        <motion.div
          className="glass-card-elevated p-6"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.6 }}
        >
          <div className="flex items-center gap-2 mb-4">
            <TrendingUp className="w-4 h-4 text-primary" />
            <h3 className="font-display font-600 text-foreground text-sm">Difficulty Progression</h3>
          </div>
          <ResponsiveContainer width="100%" height={200}>
            <LineChart data={difficultyData}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsla(215, 20%, 65%, 0.1)" />
              <XAxis dataKey="question" tick={{ fill: "hsl(215, 20%, 65%)", fontSize: 12 }} axisLine={false} />
              <YAxis tick={{ fill: "hsl(215, 20%, 65%)", fontSize: 12 }} axisLine={false} domain={[0, 10]} />
              <Tooltip
                contentStyle={{
                  background: "hsl(216, 50%, 14%)",
                  border: "1px solid hsla(0,0%,100%,0.1)",
                  borderRadius: 8,
                  color: "#fff",
                }}
              />
              <Line type="monotone" dataKey="difficulty" stroke="hsl(217, 91%, 60%)" strokeWidth={2} dot={{ fill: "hsl(217, 91%, 60%)", r: 4 }} />
              <Line type="monotone" dataKey="ability" stroke="hsl(263, 83%, 66%)" strokeWidth={2} dot={{ fill: "hsl(263, 83%, 66%)", r: 4 }} />
            </LineChart>
          </ResponsiveContainer>
        </motion.div>

        {/* Topic breakdown */}
        <motion.div
          className="glass-card-elevated p-6"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.7 }}
        >
          <div className="flex items-center gap-2 mb-4">
            <BarChart3 className="w-4 h-4 text-secondary" />
            <h3 className="font-display font-600 text-foreground text-sm">Performance by Topic</h3>
          </div>
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={topicData} layout="vertical">
              <CartesianGrid strokeDasharray="3 3" stroke="hsla(215, 20%, 65%, 0.1)" horizontal={false} />
              <XAxis type="number" tick={{ fill: "hsl(215, 20%, 65%)", fontSize: 12 }} axisLine={false} domain={[0, 100]} />
              <YAxis dataKey="name" type="category" tick={{ fill: "hsl(215, 20%, 65%)", fontSize: 11 }} axisLine={false} width={120} />
              <Tooltip
                contentStyle={{
                  background: "hsl(216, 50%, 14%)",
                  border: "1px solid hsla(0,0%,100%,0.1)",
                  borderRadius: 8,
                  color: "#fff",
                }}
              />
              <Bar dataKey="score" fill="url(#barGradient)" radius={[0, 4, 4, 0]} />
              <defs>
                <linearGradient id="barGradient" x1="0" y1="0" x2="1" y2="0">
                  <stop offset="0%" stopColor="hsl(217, 91%, 60%)" />
                  <stop offset="100%" stopColor="hsl(263, 83%, 66%)" />
                </linearGradient>
              </defs>
            </BarChart>
          </ResponsiveContainer>
        </motion.div>
      </div>

      {/* Generate Plan CTA */}
      <motion.div
        className="text-center"
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.9 }}
      >
        <motion.button
          onClick={onGeneratePlan}
          className="px-8 py-4 rounded-xl bg-primary font-display font-600 text-lg text-primary-foreground btn-glow inline-flex items-center gap-3"
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.98 }}
        >
          <Sparkles className="w-5 h-5" />
          Generate AI Study Plan
        </motion.button>
      </motion.div>
    </motion.div>
  );
};

export default ResultsDashboard;
