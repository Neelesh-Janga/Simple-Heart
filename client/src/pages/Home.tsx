import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Heart, Stars, Music } from "lucide-react";
import confetti from "canvas-confetti";
import { FloatingHearts } from "@/components/FloatingHearts";
import { CatEmoji } from "@/components/CatEmoji";
import { useCreateResponse } from "@/hooks/use-responses";

export default function Home() {
  const [stage, setStage] = useState<"loading" | "question" | "success">("loading");
  const [noButtonState, setNoButtonState] = useState<"no" | "yes">("no");
  const [catState, setCatState] = useState<"neutral" | "shy" | "love">("neutral");
  const { mutate: saveResponse } = useCreateResponse();

  // Initial loading sequence
  useEffect(() => {
    const timer = setTimeout(() => {
      setStage("question");
    }, 4500);
    return () => clearTimeout(timer);
  }, []);

  const handleYesClick = () => {
    setStage("success");
    // saveResponse({ accepted: true, visitorName: "Anonymous Love" }); // Removed DB connectivity
    
    // Fire confetti
    const duration = 3000;
    const end = Date.now() + duration;

    (function frame() {
      confetti({
        particleCount: 5,
        angle: 60,
        spread: 55,
        origin: { x: 0 },
        colors: ['#ec4899', '#f472b6', '#fbcfe8']
      });
      confetti({
        particleCount: 5,
        angle: 120,
        spread: 55,
        origin: { x: 1 },
        colors: ['#ec4899', '#f472b6', '#fbcfe8']
      });

      if (Date.now() < end) {
        requestAnimationFrame(frame);
      }
    })();
  };

  return (
    <div className="min-h-screen w-full bg-background overflow-hidden relative selection:bg-pink-200">
      <FloatingHearts count={20} />
      
      {/* Background Grid Pattern */}
      <div className="absolute inset-0 bg-grid-pattern opacity-40 z-0" />

      <div className="relative z-10 min-h-screen flex items-center justify-center p-4">
        <AnimatePresence mode="wait">
          
          {/* STAGE 1: LOADING */}
          {stage === "loading" && (
            <motion.div
              key="loading"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0, scale: 1.1, filter: "blur(10px)" }}
              className="text-center max-w-md bg-white/40 backdrop-blur-xl p-8 rounded-3xl border border-white/50 shadow-xl"
            >
              <motion.div 
                animate={{ rotate: 360 }}
                transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                className="inline-block mb-6"
              >
                <div className="relative">
                  <Heart className="w-16 h-16 text-primary fill-primary/20" />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <Stars className="w-8 h-8 text-accent animate-pulse" />
                  </div>
                </div>
              </motion.div>
              
              <h2 className="text-3xl font-display font-bold text-foreground mb-3">
                Wait for it...
              </h2>
              <p className="text-lg text-muted-foreground font-body">
                Preparing something special just for you.
              </p>
              
              <div className="mt-8 h-1 w-48 mx-auto bg-primary/20 rounded-full overflow-hidden">
                <motion.div 
                  className="h-full bg-gradient-to-r from-primary to-accent"
                  initial={{ width: "0%" }}
                  animate={{ width: "100%" }}
                  transition={{ duration: 4.5, ease: "easeInOut" }}
                />
              </div>
            </motion.div>
          )}

          {/* STAGE 2: THE QUESTION */}
          {stage === "question" && (
            <motion.div
              key="question"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="w-full max-w-lg"
            >
              <div className="bg-white/60 backdrop-blur-2xl p-8 md:p-12 rounded-[2rem] shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-white/60 relative overflow-hidden group">
                
                {/* Decorative corner elements */}
                <div className="absolute top-0 right-0 p-4 opacity-50">
                  <Music className="w-6 h-6 text-pink-400 animate-bounce" />
                </div>

                <div className="text-center space-y-8">
                  {/* Dynamic Cat Emoji */}
                  <div className="h-32 flex items-center justify-center">
                    <CatEmoji state={catState} />
                  </div>

                  <div className="space-y-4">
                    <h1 className="text-4xl md:text-5xl font-display font-bold text-foreground leading-tight">
                      Will you go out with me?
                    </h1>
                    <p className="text-lg font-body text-muted-foreground">
                      I promise to bring snacks and bad jokes 🥺
                    </p>
                  </div>

                  <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-4 min-h-[80px]">
                    {/* YES BUTTON */}
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={handleYesClick}
                      onMouseEnter={() => setCatState("love")}
                      onMouseLeave={() => setCatState("neutral")}
                      className="px-10 py-4 bg-gradient-to-r from-primary to-pink-500 text-white font-bold text-xl rounded-2xl shadow-lg shadow-pink-500/30 hover:shadow-xl hover:shadow-pink-500/40 transition-all w-48 font-display tracking-wide"
                    >
                      Yes! 💖
                    </motion.button>

                    {/* NO BUTTON (Trick) */}
                    <div 
                      className="relative w-48 h-14"
                      onMouseEnter={() => {
                        setNoButtonState("yes");
                        setCatState("shy");
                      }}
                      onMouseLeave={() => {
                        setNoButtonState("no");
                        setCatState("neutral");
                      }}
                    >
                      <motion.button
                        layout
                        onClick={noButtonState === "yes" ? handleYesClick : undefined}
                        className={`absolute inset-0 w-full h-full rounded-2xl font-bold text-xl transition-all duration-300 font-display tracking-wide border-2 ${
                          noButtonState === "yes"
                            ? "bg-gradient-to-r from-primary to-pink-500 text-white border-transparent shadow-lg shadow-pink-500/30"
                            : "bg-white text-muted-foreground border-slate-200 hover:bg-slate-50"
                        }`}
                      >
                        {noButtonState === "yes" ? "Yes! 💖" : "No"}
                      </motion.button>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {/* STAGE 3: SUCCESS */}
          {stage === "success" && (
            <motion.div
              key="success"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="w-full max-w-2xl text-center z-50"
            >
              <div className="bg-white/80 backdrop-blur-3xl p-10 rounded-[2.5rem] shadow-2xl border border-pink-200">
                <div className="flex justify-center -space-x-8 mb-8">
                  <div className="animate-meet-right z-10 text-[6rem] md:text-[8rem]">
                    😽
                  </div>
                  <div className="animate-meet-left z-20 text-[6rem] md:text-[8rem]">
                    😺
                  </div>
                </div>

                <h1 className="text-5xl md:text-7xl font-handwriting font-bold text-transparent bg-clip-text bg-gradient-to-r from-primary to-purple-600 mb-6 py-2">
                  Destiny Sealed!
                </h1>
                
                <p className="text-xl md:text-2xl font-body text-foreground mb-8">
                  Best decision you've made today! <br/>
                  <span className="text-muted-foreground text-lg block mt-2">
                    (No take backs 😉)
                  </span>
                </p>

                <div className="flex justify-center gap-2 text-primary/60">
                  <Heart className="w-6 h-6 animate-heartbeat fill-current" />
                  <Heart className="w-6 h-6 animate-heartbeat fill-current delay-75" />
                  <Heart className="w-6 h-6 animate-heartbeat fill-current delay-150" />
                </div>
              </div>
            </motion.div>
          )}

        </AnimatePresence>
      </div>

      <div className="absolute bottom-4 left-0 right-0 text-center text-xs text-muted-foreground/50 font-mono pointer-events-none">
        Made for fun by Neelesh
      </div>
    </div>
  );
}
