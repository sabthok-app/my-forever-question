import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import confetti from "canvas-confetti";
import { Heart, Clock, CalendarHeart } from "lucide-react";

const FinalReveal = () => {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    // Heart confetti explosion
    const duration = 4000;
    const end = Date.now() + duration;

    const heartShape = confetti.shapeFromPath({
      path: "M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z",
    });

    const frame = () => {
      confetti({
        particleCount: 3,
        angle: 60,
        spread: 55,
        origin: { x: 0 },
        colors: ["#b5304f", "#d4a0a0", "#fff5ee", "#ff6b8a"],
        shapes: [heartShape, "circle"],
        scalar: 1.2,
      });
      confetti({
        particleCount: 3,
        angle: 120,
        spread: 55,
        origin: { x: 1 },
        colors: ["#b5304f", "#d4a0a0", "#fff5ee", "#ff6b8a"],
        shapes: [heartShape, "circle"],
        scalar: 1.2,
      });
      if (Date.now() < end) requestAnimationFrame(frame);
    };
    frame();
  }, []);

  useEffect(() => {
    // Countdown to Valentine's Day 2026
    const valentines = new Date("2026-02-14T19:00:00").getTime();

    const timer = setInterval(() => {
      const now = Date.now();
      const diff = valentines - now;

      if (diff <= 0) {
        clearInterval(timer);
        return;
      }

      setTimeLeft({
        days: Math.floor(diff / (1000 * 60 * 60 * 24)),
        hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((diff / (1000 * 60)) % 60),
        seconds: Math.floor((diff / 1000) % 60),
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <motion.div
      className="min-h-screen valentine-gradient flex flex-col items-center justify-center px-6 py-12"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
    >
      <motion.div
        initial={{ scale: 0, rotate: -180 }}
        animate={{ scale: 1, rotate: 0 }}
        transition={{ type: "spring", stiffness: 100, delay: 0.5 }}
        className="mb-8"
      >
        <Heart
          className="text-cherry floating-heart"
          size={100}
          fill="hsl(345, 75%, 42%)"
          strokeWidth={0}
        />
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1, duration: 0.8 }}
        className="glass-card rounded-3xl p-8 md:p-12 max-w-lg text-center mb-10"
      >
        <h2 className="font-display text-3xl md:text-5xl text-foreground mb-4">
          She said{" "}
          <span className="text-shimmer">YES!</span>
        </h2>

        <div className="w-16 h-0.5 bg-cherry mx-auto my-6 rounded-full" />

        <p className="font-body text-lg md:text-xl text-muted-foreground mb-2">
          🌹 See you at dinner 🌹
        </p>
        <p className="font-display text-2xl md:text-3xl text-foreground">
          7:00 PM
        </p>

        <div className="mt-6 flex items-center justify-center gap-2 text-muted-foreground">
          <CalendarHeart size={18} />
          <span className="font-body text-sm">February 14, 2026</span>
        </div>
      </motion.div>

      {/* Countdown */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.5 }}
        className="text-center"
      >
        <div className="flex items-center justify-center gap-2 mb-4 text-muted-foreground">
          <Clock size={16} />
          <span className="font-body text-sm uppercase tracking-widest">
            Countdown to Valentine's Day
          </span>
        </div>

        <div className="flex gap-3 md:gap-5">
          {[
            { label: "Days", value: timeLeft.days },
            { label: "Hours", value: timeLeft.hours },
            { label: "Min", value: timeLeft.minutes },
            { label: "Sec", value: timeLeft.seconds },
          ].map(({ label, value }) => (
            <div key={label} className="glass-card rounded-xl p-3 md:p-4 min-w-[60px] md:min-w-[80px]">
              <div className="font-display text-2xl md:text-4xl text-foreground">
                {String(value).padStart(2, "0")}
              </div>
              <div className="font-body text-xs text-muted-foreground uppercase tracking-wider">
                {label}
              </div>
            </div>
          ))}
        </div>
      </motion.div>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.5 }}
        className="mt-12 font-display text-lg text-muted-foreground italic"
      >
        Forever & always, yours 💕
      </motion.p>
    </motion.div>
  );
};

export default FinalReveal;
