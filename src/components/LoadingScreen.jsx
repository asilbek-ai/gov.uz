import { motion } from "framer-motion";

export default function LoadingScreen() {
  return (
    <motion.div
      className="fixed inset-0 z-[200] flex flex-col items-center justify-center bg-gradient-to-br from-dark via-primaryDark to-dark"
      exit={{ opacity: 0 }}
      transition={{ duration: 0.8 }}
    >
      <motion.div
        className="relative w-32 h-32"
        animate={{ rotate: 360 }}
        transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
      >
        <div className="absolute inset-0 border-4 rounded-full border-accent/30" />
        <div className="absolute inset-0 border-t-4 rounded-full border-accent" />
        <div className="absolute border-r-4 rounded-full inset-2 border-accentBlue/50" />
      </motion.div>
      
      <motion.div
        className="mt-8 text-2xl font-bold"
        animate={{ opacity: [0.5, 1, 0.5] }}
        transition={{ duration: 1.5, repeat: Infinity }}
      >
        <span className="text-white">JONDOR</span>
        <span className="text-accent neon-text">.UZ</span>
      </motion.div>
      
      <motion.div className="w-48 h-1 mt-4 overflow-hidden rounded-full bg-white/20">
        <motion.div
          className="h-full bg-gradient-to-r from-accent to-accentBlue"
          initial={{ width: "0%" }}
          animate={{ width: "100%" }}
          transition={{ duration: 2.2 }}
        />
      </motion.div>
    </motion.div>
  );
}