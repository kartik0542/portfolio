import { useMemo } from "react";
import ParticlesBackground from "../components/ParticlesBackground";
import { motion } from "framer-motion";
import React from "react";
import { FaXTwitter, FaLinkedinIn, FaGithub } from "react-icons/fa6";
import avator from "../assets/avator.png";

export default function Home() {
  const socials = [
    {
      Icon: FaXTwitter,
      label: "X",
      href: "https://twitter.com/KartikKathrotiya",
    },
    {
      Icon: FaLinkedinIn,
      label: "LinkedinIn",
      href: "https://www.linkedin.com/in/kartik-kathrotiya-927ba5234/",
    },
    { Icon: FaGithub, label: "Github", href: "https://github.com/kartik0542" },
  ];
  const glowVarients = {
    // ye hover effect ke liye hai icon ke
    initial: { scale: 1, y: 0, filter: "drop-shadow(0 0 0 rgba(0,0,0,0))" },
    hover: {
      sacle: 1.2,
      y: -3,
      filter:
        "drop-shadow(0 0 8px rgba(13,88,204,0.9)) drop-shadow(0 0 18px rgba(16,185,129,0.8))",
      transition: { type: "spring", stiffness: 300, damping: 15 },
    },
    tap: { scale: 0.95, y: 0, transition: { duration: 0.08 } },
  };

  const roles = useMemo(() => ["Web Developer", "MERN Stack Developer"], []);
  const [index, setIndex] = React.useState(0);
  const [subIndex, setSubIndex] = React.useState(0);
  const [deleting, setDeleting] = React.useState(false);

  React.useEffect(() => {
    const currentRole = roles[index];
    const timeout = setTimeout(
      () => {
        if (!deleting && subIndex < currentRole.length)
          setSubIndex((v) => v + 1);
        else if (!deleting && subIndex === currentRole.length)
          setTimeout(() => setDeleting(true), 1200);
        else if (deleting && subIndex > 0) setSubIndex((v) => v - 1);
        else if (deleting && subIndex === 0) {
          setDeleting(false);
          setIndex((p) => (p + 1) % roles.length);
        }
      },
      deleting ? 35 : 70
    );
    return () => clearTimeout(timeout);
  }, [subIndex, deleting, index, roles]);

  return (
    <section
      id="home"
      className="w-full h-screen relative bg-black overflow-hidden"
    >
      <ParticlesBackground />
      <div className="absolute inset-0">
        <div // Top Left Blur Circle on home page
          className="absolute -top-32 -left-32
        w-[70vw] sm:w-[z-500vw] md:w-[40vw]
        h-[70vw] sm:h-[50vw] md:h-[40vw]
        max-w-][500px] max-h-500px
        rounded-full
        bg-linear-to-r from-[#302b63] via-[#00bf8f] to to-[#1cd8d2]
        opacity-30 sm:opacity-20 md:opacity-10
        blur-[100px] sm:blur-[130px] md:blur-[150px]
        animate-pulse"
        ></div>
        <div // Bottom Right Blur Circle on home page
          className="absolute bottom-0 right-0
        w-[70vw] sm:w-[z-500vw] md:w-[40vw]
        h-[70vw] sm:h-[50vw] md:h-[40vw]
        max-w-][500px] max-h-500px
        rounded-full
        bg-linear-to-r from-[#302b63] via-[#00bf8f] to to-[#1cd8d2]
        opacity-30 sm:opacity-20 md:opacity-10
        blur-[100px] sm:blur-[130px] md:blur-[150px]
        animate-pulse delay-500"
        ></div>
      </div>

      <div className="relative z-10 h-full w-full max-w-7xl mx-auto px-4 grid grid-cols-1 lg:grid-cols-2">
        <div className="flex flex-col justify-center h-full text-center lg:text-left relative">
          <div className="w-full pl-2 lg:pr-24 mx-auto max-w-48rem">
            <motion.div
              className="mb-3 text-xl sm:text-xl md:text-2xl lg:text-3xl font-semibold text-white tracking-wide min-h-[1.6em] "
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <span>{roles[index].substring(0, subIndex)}</span>
              <span
                className="inline-block w-0.5 ml-1 bg-white animate-pulse align-middle"
                style={{ height: "1em" }}
              ></span>
            </motion.div>
            <motion.h1
              className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-transparent bg-clip-text
            bg-linear-to-r from-[#1cd8d2] via-[#00bf8f] to-[#302b63] drop-shadow-lg"
              initial={{ opacity: 0, y: 20 }} // Fade-in from bottom animation
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1 }}
            >
              Hello, I'm
              <br />
              <span className="text-white font-bold text-4xl sm:text-5xl md:text-6xl lg:text-7xl lg:whitespace-nowrap">
                Kartik Kathrotiya
              </span>
            </motion.h1>

            <motion.p
              className="mt-6 text-base sm:text-lg md:text-xl text-gray-300 max-w-2xl mx-auto lg:mx-0"
              initial={{ opacity: 0, y: 20 }} // Fade-in from bottom animation
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.8 }}
            >
              I turn complex ideas into seamless, high-impact web experiences —
              building modern, scalable, and lightning-fast applications that
              make a difference.
            </motion.p>

            <motion.div
              className="mt-10 flex flex-wrap justify-center lg:justify-start gap-6"
              initial={{ opacity: 0 }} // Fade-in from bottom animation
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8, duration: 0.8 }}
            >
              <a
                href="#projects"
                className="px-6 py-3 rounded-full font-medium text-lg text-white
              bg-linear-to-r from-[#1cd8d2] via-[#00bf8f] to-[#302b63]
              shadow-lg hover:scale-105 transition-all"
              >
                View My Work
              </a>
              <a
                href="/Kartik_Resume.pdf"
                download
                className="px-6 py-3 rounded-full font-medium text-lg text-black bg-white hover:bg-gray-200
              shadow-lg hover:scale-105 transition-all"
              >
                My Resume
              </a>
            </motion.div>
            <div className="mt-10 flex gap-5 text-2xl md:text-3xl justify-center lg:justify-start">
              {socials.map(({ Icon, label, href }) => (
                <motion.a
                  href={href} // link pe jaane ke liye
                  key={label} // unique key for each icon
                  target="_blank" // new tab me open hoga
                  aria-label={label} // accessibility ke liye
                  rel="noopener noreferrer" // security ke liye
                  variants={glowVarients} // hover effect ke liye
                  initial="initial"
                  whileHover="hover"
                  whileTap="tap"
                  className="text-gray-300"
                >
                  <Icon />
                </motion.a>
              ))}
            </div>
          </div>
        </div>

        <div className="relative hidden lg:block">
          <div // Glow Effect behind avator image
            className="absolute top-1/2 -translate-y-1/2 pointer-events-none"
            style={{
              right: "10px",
              width: "min(22vw, 410px)",
              maxHeight: "min(40vw, 760px)",
              borderRadius: "50%",
              filter: "blur(38px)",
              opacity: 0.32,
              background:
                "conic-gradient(from 0deg, #1cd8d2, #00bf8f, #302b63, #1cd8d2)",
            }}
          />
          <motion.img // Avator Image on home page
            src={avator}
            alt="Kartik Kathrotiya"
            className="absolute top-1/2 -translate-y-1/2 object-contain select-none pointer-events-none"
            style={{
              right: "-30px",
              width: "min(45vw, 780px)",
              maxHeight: "90vh",
            }}
            initial={{ opacity: 0, y: 40, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ delay: 0.2, duration: 0.8 }}
          />
        </div>
      </div>
    </section>
  );
}
