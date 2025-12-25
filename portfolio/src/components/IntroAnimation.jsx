import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useMemo } from "react";
import React from "react";

export default function IntroAnimation({ onFinish }) {
  const greeting = useMemo(
    () => [
      "Hello",
      "नमस्ते",
      "Hola",
      "Ciao",
      "Olá",
      "Merhaba",
      "Γειά",
      "Hej",
      "Hallo",
      "નમસ્તે",
    ],
    []
  );

  const [index, setIndex] = React.useState(0); // ye greeting ke index ko track karne ke liye hai
  const [visible, setVisible] = React.useState(true); // ye greeting ko dikhane ke liye hai

  useEffect(() => {
    if (index < greeting.length - 1) {
      const id = setInterval(() => setIndex((i) => i + 1), 180);
      return () => clearInterval(id);
    } else {
      const t = setTimeout(() => setVisible(false), 300);
      return () => clearTimeout(t);
    }
  }, [index, greeting.length]);

  return (
    <AnimatePresence onExitComplete={onFinish}>
      {visible && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black text-white overflow-hidden"
          initial={{ y: 0 }}
          exit={{
            y: "-100%",
            transition: {
              duration: 1.05,
              ease: [0.22, 1, 0.36, 1],
            },
          }}
        >
          <motion.h1
            key={index}
            className="text-4xl md:text-6xl lg:text-7xl font-bold "
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.12 }}
          >
            {greeting[index]}
          </motion.h1>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
