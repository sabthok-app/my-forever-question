import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, Heart } from "lucide-react";

const MEMORIES = [
  "First Date",
  "Our Office",
  "Pokhara Trip",
  "First Date",
  "Our Office",
  "Pokhara Trip",
  "Movie Night",
  "Movie Night",
  "Kitchen Dance",
  "Kitchen Dance",
  "Sunrise Walk",
  "Sunrise Walk",
];

interface Card {
  id: number;
  memory: string;
  flipped: boolean;
  matched: boolean;
}

interface MemoryGameProps {
  onComplete: () => void;
}

const EMOJIS: Record<string, string> = {
  "First Date": "🥰",
  "Our Office": "🏢",
  "Pokhara Trip": "🏔️",
  "Movie Night": "🎬",
  "Kitchen Dance": "💃",
  "Sunrise Walk": "🌅",
};

const MemoryGame = ({ onComplete }: MemoryGameProps) => {
  const [cards, setCards] = useState<Card[]>([]);
  const [flippedIds, setFlippedIds] = useState<number[]>([]);
  const [matchedCount, setMatchedCount] = useState(0);
  const [isChecking, setIsChecking] = useState(false);

  useEffect(() => {
    const shuffled = [...MEMORIES]
      .sort(() => Math.random() - 0.5)
      .map((memory, i) => ({
        id: i,
        memory,
        flipped: false,
        matched: false,
      }));
    setCards(shuffled);
  }, []);

  const handleFlip = (id: number) => {
    if (isChecking) return;
    const card = cards.find((c) => c.id === id);
    if (!card || card.flipped || card.matched) return;
    if (flippedIds.length >= 2) return;

    const newCards = cards.map((c) =>
      c.id === id ? { ...c, flipped: true } : c
    );
    setCards(newCards);
    const newFlipped = [...flippedIds, id];
    setFlippedIds(newFlipped);

    if (newFlipped.length === 2) {
      setIsChecking(true);
      const [first, second] = newFlipped.map((fid) =>
        newCards.find((c) => c.id === fid)!
      );

      if (first.memory === second.memory) {
        setTimeout(() => {
          setCards((prev) =>
            prev.map((c) =>
              c.id === first.id || c.id === second.id
                ? { ...c, matched: true }
                : c
            )
          );
          setMatchedCount((prev) => prev + 1);
          setFlippedIds([]);
          setIsChecking(false);
        }, 500);
      } else {
        setTimeout(() => {
          setCards((prev) =>
            prev.map((c) =>
              c.id === first.id || c.id === second.id
                ? { ...c, flipped: false }
                : c
            )
          );
          setFlippedIds([]);
          setIsChecking(false);
        }, 1000);
      }
    }
  };

  const allMatched = matchedCount === MEMORIES.length / 2;

  return (
    <motion.div
      className="min-h-screen valentine-gradient flex flex-col items-center justify-center px-4 py-8"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.6 }}
    >
      <motion.div
        initial={{ y: -30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="text-center mb-8"
      >
        <h2 className="font-display text-2xl md:text-4xl text-foreground mb-2">
          Our Memory Match 💕
        </h2>
        <p className="text-muted-foreground font-body text-sm md:text-base">
          Match our favorite memories to unlock the surprise
        </p>
      </motion.div>

      <div className="grid grid-cols-3 md:grid-cols-4 gap-3 md:gap-4 max-w-lg mx-auto mb-8">
        {cards.map((card, index) => (
          <motion.div
            key={card.id}
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: index * 0.05 }}
            onClick={() => handleFlip(card.id)}
            className="cursor-pointer perspective-1000"
          >
            <motion.div
              className="relative w-20 h-24 md:w-28 md:h-32"
              animate={{ rotateY: card.flipped || card.matched ? 180 : 0 }}
              transition={{ duration: 0.4 }}
              style={{ transformStyle: "preserve-3d" }}
            >
              {/* Back of card */}
              <div
                className="absolute inset-0 rounded-xl cherry-gradient flex items-center justify-center shadow-md"
                style={{ backfaceVisibility: "hidden" }}
              >
                <Heart
                  className="text-cherry-foreground/80"
                  size={28}
                  fill="currentColor"
                />
              </div>

              {/* Front of card */}
              <div
                className="absolute inset-0 rounded-xl glass-card flex flex-col items-center justify-center p-2 shadow-md"
                style={{
                  backfaceVisibility: "hidden",
                  transform: "rotateY(180deg)",
                }}
              >
                <span className="text-2xl mb-1">
                  {EMOJIS[card.memory] || "❤️"}
                </span>
                <span className="font-body text-xs md:text-sm text-foreground text-center leading-tight">
                  {card.memory}
                </span>
                {card.matched && (
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="absolute -top-1 -right-1 bg-cherry text-cherry-foreground rounded-full w-5 h-5 flex items-center justify-center text-xs"
                  >
                    ✓
                  </motion.div>
                )}
              </div>
            </motion.div>
          </motion.div>
        ))}
      </div>

      {/* Progress */}
      <div className="w-64 h-2 bg-muted rounded-full overflow-hidden mb-6">
        <motion.div
          className="h-full cherry-gradient rounded-full"
          animate={{ width: `${(matchedCount / (MEMORIES.length / 2)) * 100}%` }}
          transition={{ duration: 0.5 }}
        />
      </div>

      <AnimatePresence>
        {allMatched && (
          <motion.button
            initial={{ opacity: 0, scale: 0.5, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ type: "spring", stiffness: 200 }}
            onClick={onComplete}
            className="cherry-gradient text-cherry-foreground font-display text-lg px-10 py-4 rounded-full shadow-lg flex items-center gap-3"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            style={{ animation: "pulse-glow 2s infinite" }}
          >
            <Sparkles size={20} />
            Continue to the Big Question
            <Sparkles size={20} />
          </motion.button>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default MemoryGame;
