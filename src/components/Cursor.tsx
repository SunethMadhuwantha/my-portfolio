"use client";
import { useEffect } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

export default function Cursor() {
  // Use Motion Values (They don't trigger React re-renders, so they are fast)
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);

  // Add slight spring smoothing (low damping = faster response)
  const springConfig = { damping: 25, stiffness: 700 };
  const cursorXSpring = useSpring(cursorX, springConfig);
  const cursorYSpring = useSpring(cursorY, springConfig);

  useEffect(() => {
    const moveCursor = (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
    };

    window.addEventListener("mousemove", moveCursor);
    return () => window.removeEventListener("mousemove", moveCursor);
  }, [cursorX, cursorY]);

  return (
    <motion.div
      className="fixed top-0 left-0 w-5 h-5 bg-blue-500 rounded-full pointer-events-none z-[9999] mix-blend-difference"
      style={{
        translateX: cursorXSpring,
        translateY: cursorYSpring,
        left: -10, // Center the dot on the tip
        top: -10,
      }}
    />
  );
}