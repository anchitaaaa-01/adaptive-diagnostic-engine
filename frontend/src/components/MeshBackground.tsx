import { motion } from "framer-motion";

const MeshBackground = () => {
  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none -z-10">
      <div className="absolute inset-0 mesh-gradient" />
      
      {/* Animated orbs */}
      <motion.div
        className="absolute w-[600px] h-[600px] rounded-full opacity-[0.07]"
        style={{ background: "radial-gradient(circle, hsl(217 91% 60%), transparent 70%)" }}
        animate={{
          x: [0, 100, -50, 0],
          y: [0, -80, 60, 0],
        }}
        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        initial={{ top: "10%", left: "60%" }}
      />
      <motion.div
        className="absolute w-[500px] h-[500px] rounded-full opacity-[0.06]"
        style={{ background: "radial-gradient(circle, hsl(263 83% 66%), transparent 70%)" }}
        animate={{
          x: [0, -80, 40, 0],
          y: [0, 60, -40, 0],
        }}
        transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
        initial={{ top: "50%", left: "10%" }}
      />
      <motion.div
        className="absolute w-[400px] h-[400px] rounded-full opacity-[0.05]"
        style={{ background: "radial-gradient(circle, hsl(187 94% 43%), transparent 70%)" }}
        animate={{
          x: [0, 60, -30, 0],
          y: [0, -50, 80, 0],
        }}
        transition={{ duration: 18, repeat: Infinity, ease: "linear" }}
        initial={{ bottom: "10%", right: "20%" }}
      />

      {/* Grid overlay */}
      <div 
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `linear-gradient(hsl(215 20% 65%) 1px, transparent 1px), linear-gradient(90deg, hsl(215 20% 65%) 1px, transparent 1px)`,
          backgroundSize: "60px 60px",
        }}
      />
    </div>
  );
};

export default MeshBackground;
