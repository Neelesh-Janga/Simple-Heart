import { useEffect, useState } from "react";
import { Heart } from "lucide-react";
import { motion } from "framer-motion";

interface FloatingHeartsProps {
  count?: number;
}

export function FloatingHearts({ count = 15 }: FloatingHeartsProps) {
  const [hearts, setHearts] = useState<{ id: number; x: number; delay: number; scale: number; duration: number }[]>([]);

  useEffect(() => {
    const newHearts = Array.from({ length: count }, (_, i) => ({
      id: i,
      x: Math.random() * 100, // percentage
      delay: Math.random() * 5,
      scale: 0.5 + Math.random() * 0.5,
      duration: 10 + Math.random() * 20,
    }));
    setHearts(newHearts);
  }, [count]);

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {hearts.map((heart) => (
        <motion.div
          key={heart.id}
          initial={{ y: "110vh", x: `${heart.x}vw`, opacity: 0 }}
          animate={{
            y: "-10vh",
            opacity: [0, 0.8, 0],
            rotate: [0, 45, -45, 0],
          }}
          transition={{
            duration: heart.duration,
            delay: heart.delay,
            repeat: Infinity,
            ease: "linear",
          }}
          className="absolute text-pink-200"
          style={{ scale: heart.scale }}
        >
          <Heart fill="currentColor" strokeWidth={0} className="w-8 h-8 md:w-12 md:h-12" />
        </motion.div>
      ))}
    </div>
  );
}
