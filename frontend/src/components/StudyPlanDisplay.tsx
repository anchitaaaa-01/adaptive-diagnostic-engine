import { motion } from "framer-motion";
import { BookOpen, Code2, Target, ArrowLeft, ExternalLink } from "lucide-react";
import type { StudyStep } from "@/lib/mockData";

const iconMap = {
  book: BookOpen,
  code: Code2,
  target: Target,
};

const gradients = [
  "from-primary/10 to-secondary/5",
  "from-secondary/10 to-primary/5",
  "from-amber/10 to-primary/5",
];

interface StudyPlanDisplayProps {
  steps: StudyStep[];
  onBack: () => void;
}

const StudyPlanDisplay = ({ steps, onBack }: StudyPlanDisplayProps) => {
  return (
    <motion.div
      className="min-h-screen px-4 py-12 max-w-4xl mx-auto"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <motion.button
        onClick={onBack}
        className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors mb-8 font-body text-sm"
        initial={{ x: -20, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
      >
        <ArrowLeft className="w-4 h-4" />
        Back to Results
      </motion.button>

      <motion.div
        className="text-center mb-12"
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.1 }}
      >
        <h1 className="text-4xl sm:text-5xl font-display font-700 text-foreground mb-2">
          Your AI Study Plan
        </h1>
        <p className="text-muted-foreground font-body">Personalized learning path based on your assessment</p>
      </motion.div>

      <div className="space-y-6">
        {steps.map((step, i) => {
          const Icon = iconMap[step.icon];
          return (
            <motion.div
              key={step.step}
              className={`glass-card-elevated glow-border p-8 bg-gradient-to-br ${gradients[i]}`}
              initial={{ x: -30, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.2 + i * 0.15 }}
            >
              <div className="flex items-start gap-5">
                <div className="w-12 h-12 rounded-xl bg-primary/20 flex items-center justify-center shrink-0">
                  <Icon className="w-6 h-6 text-primary" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <span className="text-xs font-display font-600 text-primary bg-primary/10 px-2 py-0.5 rounded-full">
                      Step {step.step}
                    </span>
                  </div>
                  <h3 className="text-xl font-display font-600 text-foreground mb-3">
                    {step.title}
                  </h3>
                  <p className="text-muted-foreground font-body leading-relaxed mb-4">
                    {step.description}
                  </p>
                  <div className="space-y-2">
                    <p className="text-xs font-display font-500 text-muted-foreground uppercase tracking-wider">
                      Recommended Resources
                    </p>
                    {step.resources.map((r, ri) => (
                      <div
                        key={ri}
                        className="flex items-center gap-2 text-sm text-foreground/80 font-body"
                      >
                        <ExternalLink className="w-3 h-3 text-primary shrink-0" />
                        {r}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </motion.div>
  );
};

export default StudyPlanDisplay;
