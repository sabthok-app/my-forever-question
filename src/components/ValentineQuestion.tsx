import { useState, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Heart, X } from "lucide-react";

interface ValentineQuestionProps {
  onYes: () => void;
}

const ValentineQuestion = ({ onYes }: ValentineQuestionProps) => {
  const [noPos, setNoPos] = useState({ x: 0, y: 0 });
  const [showMeme, setShowMeme] = useState(false);
  const [yesScale, setYesScale] = useState(1);
  const containerRef = useRef<HTMLDivElement>(null);
  const noClickCount = useRef(0);

  const moveNoButton = useCallback(() => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const maxX = rect.width - 120;
    const maxY = rect.height - 60;
    const x = Math.random() * maxX - maxX / 2;
    const y = Math.random() * maxY - maxY / 2;
    setNoPos({ x, y });
    setYesScale((prev) => Math.min(prev + 0.15, 2.5));
  }, []);

  const handleNoClick = () => {
    noClickCount.current += 1;
    if (noClickCount.current >= 3) {
      setShowMeme(true);
      setTimeout(() => {
        setShowMeme(false);
        noClickCount.current = 0;
      }, 3000);
    } else {
      moveNoButton();
    }
  };

  return (
    <motion.div
      ref={containerRef}
      className="min-h-screen valentine-gradient flex flex-col items-center justify-center px-6 relative overflow-hidden"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: "spring", stiffness: 150 }}
        className="text-center mb-12"
      >
        <Heart
          className="mx-auto text-cherry mb-6 floating-heart"
          size={80}
          fill="hsl(345, 75%, 42%)"
          strokeWidth={0}
        />
        <h2 className="font-display text-3xl md:text-5xl lg:text-6xl text-foreground mb-4">
          Will you be my
        </h2>
        <h2 className="font-display text-4xl md:text-6xl lg:text-7xl text-shimmer">
          Valentine?
        </h2>
      </motion.div>

      <div className="flex items-center gap-6 relative">
        <motion.button
          animate={{ scale: yesScale }}
          whileHover={{ scale: yesScale * 1.1 }}
          whileTap={{ scale: yesScale * 0.95 }}
          onClick={onYes}
          className="cherry-gradient text-cherry-foreground font-display text-xl md:text-2xl px-10 py-5 rounded-full shadow-lg z-10"
          style={{ animation: "pulse-glow 2s infinite" }}
        >
          YES! 💕
        </motion.button>

        <motion.button
          animate={{ x: noPos.x, y: noPos.y }}
          transition={{ type: "spring", stiffness: 300, damping: 15 }}
          onMouseEnter={moveNoButton}
          onTouchStart={moveNoButton}
          onClick={handleNoClick}
          className="bg-muted text-muted-foreground font-body text-sm px-6 py-3 rounded-full border border-border hover:bg-muted/80 z-10"
        >
          No 😢
        </motion.button>
      </div>

      {/* Funny meme overlay */}
      <AnimatePresence>
        {showMeme && (
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.5 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-foreground/60 backdrop-blur-sm"
          >
            <div className="glass-card rounded-2xl p-8 max-w-sm text-center mx-4">
              <div className="text-6xl mb-4">🥺🐶</div>
              <h3 className="font-display text-2xl text-foreground mb-2">
                Nice try!
              </h3>
              <p className="text-muted-foreground font-body text-lg mb-1">
                Error 404: Heart not found
              </p>
              <p className="text-muted-foreground font-body text-sm">
                The correct answer is always YES 💕
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default ValentineQuestion;
