import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import heroBg from "@/assets/hero-bg.webp";
import { Heart } from "lucide-react";

interface HeroSectionProps {
  onContinue: () => void;
}

const HeroSection = ({ onContinue }: HeroSectionProps) => {
  const fullText = "I have a very important question to ask you...";
  const [displayText, setDisplayText] = useState("");
  const [showButton, setShowButton] = useState(false);

  useEffect(() => {
    let i = 0;
    const interval = setInterval(() => {
      if (i < fullText.length) {
        setDisplayText(fullText.slice(0, i + 1));
        i++;
      } else {
        clearInterval(interval);
        setTimeout(() => setShowButton(true), 600);
      }
    }, 70);
    return () => clearInterval(interval);
  }, []);

  return (
    <motion.div
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, y: -50 }}
      transition={{ duration: 0.8 }}
    >
      {/* Blurred background */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: `url(${heroBg})`,
          filter: "blur(12px) brightness(0.6)",
          transform: "scale(1.1)",
        }}
      />

      {/* Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-foreground/40 via-foreground/20 to-foreground/50" />

      {/* Content */}
      <div className="relative z-10 text-center px-6 max-w-2xl">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.3, type: "spring", stiffness: 200 }}
          className="mb-8"
        >
          <Heart
            className="mx-auto text-cherry"
            size={64}
            fill="hsl(345, 75%, 42%)"
            strokeWidth={0}
          />
        </motion.div>

        <h1 className="font-display text-3xl md:text-5xl lg:text-6xl text-primary-foreground leading-tight mb-8">
          {displayText}
          <span
            className="inline-block w-0.5 h-8 md:h-12 bg-primary-foreground ml-1 align-middle"
            style={{ animation: "typewriter-cursor 0.8s infinite" }}
          />
        </h1>

        {showButton && (
          <motion.button
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            onClick={onContinue}
            className="cherry-gradient text-cherry-foreground font-display text-lg md:text-xl px-10 py-4 rounded-full shadow-lg hover:shadow-xl transition-all duration-300"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            style={{ animation: "pulse-glow 2s infinite" }}
          >
            But first, a little game... 💕
          </motion.button>
        )}
      </div>
    </motion.div>
  );
};

export default HeroSection;
