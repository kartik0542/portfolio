import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useMemo } from "react";
import React from "react";

export default function IntroAnimation({ onFinish }) {
  const greeting = useMemo(  //why usememo : array sirf ek baar banta hai or same reference reuse hota hai
    () => ["Hello", "नमस्ते", "Hola", "Ciao", "Olá", "Merhaba", "Γειά", "Hej", "Hallo", "નમસ્તે"], [] ); // Empty dependency array ka matlab hai ki useMemo ka function sirf initial render par execute hoga aur value memoized rahegi.

  const [index, setIndex] = React.useState(0); // ye greeting ke index ko track karne ke liye hai
  const [visible, setVisible] = React.useState(true); // ye greeting ko dikhane ke liye hai

  useEffect(() => {                                              // 
    if (index < greeting.length - 1) {                           // agar index length se -1 kam ho tab tak
      const id = setInterval(() => setIndex((i) => i + 1), 180); // jump +1 greeting and take time 0.18 second
      return () => clearInterval(id);                            // clean up
    } else {
      const t = setTimeout(() => setVisible(false), 300);        // ab ham last insex pe he or wo 0.3 second lega
      return () => clearTimeout(t);                              // clean up
    }
  }, [index, greeting.length]);

  return (
    // jab pura enimation complete hoga tab isko remove karenge
    <AnimatePresence onExitComplete={onFinish}>
      {visible && (                                // visible he tab tak dikhana hai
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black text-white overflow-hidden"
          initial={{ y: 0 }}
          exit={{
            y: "-100%",         // kam khatam hone ke bad puri upar chali jayegi
            transition: {
              duration: 1.05,
              ease: [0.22, 1, 0.36, 1],
            },
          }}
        >
          <motion.h1
            key={index} // key={index} isliye use kiya gaya hai taaki har greeting ko React ek naya element samjhe aur Framer Motion ki enter–exit animations properly trigger ho sakein.
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
