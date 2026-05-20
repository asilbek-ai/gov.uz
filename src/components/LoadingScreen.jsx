import { motion } from 'framer-motion';

export default function LoadingScreen() {
  return (
    <motion.div
      className="fixed inset-0 z-[200] flex flex-col items-center justify-center bg-gradient-to-br from-[#003580] to-[#001a4a]"
      exit={{ opacity: 0 }}
      transition={{ duration: 0.8 }}
    >
      <motion.div
        className="relative w-32 h-32"
        animate={{ rotate: 360 }}
        transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
      >
        <div className="absolute inset-0 border-4 rounded-full border-white/30" />
        <div className="absolute inset-0 border-t-4 border-white rounded-full" />
        <div className="absolute inset-2 rounded-full border-r-4 border-[#00b4d8]/50" />
      </motion.div>
      <motion.div
        className="mt-8 text-3xl font-bold text-white"
        animate={{ opacity: [0.5, 1, 0.5] }}
        transition={{ duration: 1.5, repeat: Infinity }}
      >
        JONDOR.UZ
      </motion.div>
      <motion.div className="w-64 h-1 mt-6 overflow-hidden rounded-full bg-white/20">
        <motion.div
          className="h-full bg-white"
          initial={{ width: "0%" }}
          animate={{ width: "100%" }}
          transition={{ duration: 1.8 }}
        />
      </motion.div>
    </motion.div>
  );
}