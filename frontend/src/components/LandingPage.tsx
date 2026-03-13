import { motion } from "framer-motion";
import { Zap, Brain, BarChart3, ArrowRight } from "lucide-react";

interface LandingPageProps {
  onStart: () => void;
}

const features = [
  { icon: Brain, label: "AI-Powered", desc: "Adaptive difficulty" },
  { icon: Zap, label: "10 Questions", desc: "Quick & precise" },
  { icon: BarChart3, label: "Insights", desc: "Detailed analytics" },
];

const LandingPage = ({ onStart }: LandingPageProps) => {
  return (
    <motion.div
      className="min-h-screen flex flex-col items-center justify-center px-4 relative"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      {/* Floating badge */}
      <motion.div
        className="glass-card px-4 py-2 mb-8 flex items-center gap-2"
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2 }}
      >
        <span className="w-2 h-2 rounded-full bg-primary animate-pulse_glow" />
        <span className="text-sm font-body text-muted-foreground">Powered by Adaptive AI</span>
      </motion.div>

      {/* Hero */}
      <motion.h1
        className="text-5xl sm:text-7xl md:text-8xl font-display font-800 text-center leading-[0.95] tracking-tight mb-6"
        initial={{ y: 30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.3, duration: 0.6 }}
      >
        <span className="gradient-text">Adaptive</span>
        <br />
        <span className="text-foreground">Diagnostic</span>
        <br />
        <span className="text-foreground">Engine</span>
      </motion.h1>

      <motion.p
        className="text-lg sm:text-xl text-muted-foreground max-w-md text-center mb-10 font-body"
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.5 }}
      >
        Discover your true ability with AI-driven questions that adapt to your skill level in real time.
      </motion.p>

      {/* CTA */}
      <motion.button
        onClick={onStart}
        className="group relative px-8 py-4 rounded-xl bg-primary font-display font-600 text-lg text-primary-foreground btn-glow flex items-center gap-3"
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.7 }}
        whileHover={{ scale: 1.03 }}
        whileTap={{ scale: 0.98 }}
      >
        Start Assessment
        <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
      </motion.button>

      {/* Features row */}
      <motion.div
        className="flex flex-wrap justify-center gap-4 mt-14"
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.9 }}
      >
        {features.map((f, i) => (
          <div key={i} className="glass-card px-5 py-3 flex items-center gap-3">
            <f.icon className="w-5 h-5 text-primary" />
            <div>
              <p className="text-sm font-display font-600 text-foreground">{f.label}</p>
              <p className="text-xs text-muted-foreground">{f.desc}</p>
            </div>
          </div>
        ))}
      </motion.div>

      {/* Decorative rings */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none -z-[1]">
        {[300, 500, 700].map((size, i) => (
          <motion.div
            key={size}
            className="absolute rounded-full border"
            style={{
              width: size,
              height: size,
              top: -size / 2,
              left: -size / 2,
              borderColor: `hsla(217, 91%, 60%, ${0.06 - i * 0.015})`,
            }}
            animate={{ rotate: 360 }}
            transition={{ duration: 40 + i * 20, repeat: Infinity, ease: "linear" }}
          />
        ))}
      </div>
    </motion.div>
  );
};

export default LandingPage;
