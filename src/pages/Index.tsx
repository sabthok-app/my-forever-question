import { useState } from "react";
import { AnimatePresence } from "framer-motion";
import FloatingHearts from "@/components/FloatingHearts";
import HeroSection from "@/components/HeroSection";
import MemoryGame from "@/components/MemoryGame";
import ValentineQuestion from "@/components/ValentineQuestion";
import FinalReveal from "@/components/FinalReveal";

type Stage = "hero" | "game" | "question" | "reveal";

const Index = () => {
  const [stage, setStage] = useState<Stage>("hero");

  return (
    <div className="relative min-h-screen overflow-hidden">
      <FloatingHearts />
      <AnimatePresence mode="wait">
        {stage === "hero" && (
          <HeroSection key="hero" onContinue={() => setStage("game")} />
        )}
        {stage === "game" && (
          <MemoryGame key="game" onComplete={() => setStage("question")} />
        )}
        {stage === "question" && (
          <ValentineQuestion key="question" onYes={() => setStage("reveal")} />
        )}
        {stage === "reveal" && <FinalReveal key="reveal" />}
      </AnimatePresence>
    </div>
  );
};

export default Index;
