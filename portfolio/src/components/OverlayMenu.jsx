import { motion, AnimatePresence } from "framer-motion";
import { FiX } from "react-icons/fi";

export default function OverlayMenu({ isOpen, onClose }) {
  // 2 props: 1st is boolean prop and 2nd is functional prop
  const isMobile = typeof window !== "undefined" && window.innerWidth < 1024; // for mobile screens
  const origin = isMobile ? "95% 8%" : "50% 8%"; // in mobile top right else top center

  return (
    <AnimatePresence>
      {isOpen && ( // jab menu open kare to tab openmenu true or tab jo animation hoga wo likha
        <motion.div
          className="fixed inset-0 flex items-center justify-center z-50"
          initial={{ clipPath: `circle(0% at ${origin})` }} // yaha pe overlay menu circle se open hoga
          animate={{ clipPath: `circle(150% at ${origin})` }}
          exit={{ clipPath: `circle(0% at ${origin})` }} // yaha pe overlay menu circle se close hoga
          transition={{ duration: 0.7, ease: [0.4, 0, 0.2, 1] }}
          style={{ backgroundColor: "rgba(0, 0, 0, 0.95)" }}
        >
          <button // button close karne ke liye
            onClick={onClose}
            className="absolute top-6 right-6 text-white text-3xl"
            aria-label="Close Menu"
          >
            <FiX />
          </button>

          <ul className="space-y-6 text-center">
            {[
              // all listName
              "Home",
              "About",
              "Skills",
              "Projects",
              "Experience",
              // "Testimonials",
              "Contact",
            ].map(
              (
                item,
                index // animation and link lagava mate map
              ) => (
                <motion.li
                  key={item}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 + index * 0.1 }}
                >
                  <a
                    href={`#${item.toLowerCase()}`} // sab item ke list ki link
                    onClick={onClose} // jab koi list item pe click hoga tab ye close hoga
                    className="text-4xl text-white font-semibold hover:text-pink-400 transition-colors duration-300"
                  >
                    {item}
                  </a>
                </motion.li>
              )
            )}
          </ul>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
