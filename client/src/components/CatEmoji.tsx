import { motion } from "framer-motion";

interface CatEmojiProps {
  state: "neutral" | "shy" | "love" | "sad" | "excited";
  className?: string;
}

export function CatEmoji({ state, className = "" }: CatEmojiProps) {
  const getEmoji = () => {
    switch (state) {
      case "shy": return "😽";
      case "love": return "😻";
      case "sad": return "😿";
      case "excited": return "😺";
      default: return "🐱";
    }
  };

  return (
    <motion.div 
      className={`text-6xl md:text-8xl select-none ${className}`}
      initial={{ scale: 0.8, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      key={state}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
    >
      {getEmoji()}
    </motion.div>
  );
}
