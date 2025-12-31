import CustomCursor from "./components/CustomCursor";
// import ParticalesBackground from "./components/ParticlesBackground";
import Navbar from "./components/Navbar";
import Home from "./sections/Home";
import About from "./sections/About";
import Skills from "./sections/Skills";
import Projects from "./sections/Projects";
import Experience from "./sections/Experience";
import Testimonials from "./sections/Testimonials";
import Contact from "./sections/Contact";
import Footer from "./sections/Footer";
import React from "react";
import IntroAnimation from "./components/IntroAnimation";

export default function App() {
  const [introDone, setIntroDone] = React.useState(false);

  return (
    <>

      {/* jab tak hamara intro done nahi hoga tab ham is IntroAnimation ko show karna chenge */}
      {!introDone && <IntroAnimation onFinish={() => setIntroDone(true)} />}
      
      {/*    */}
      {introDone && (
        <div className="relative gradient text-white">
          <CustomCursor />
          {/* <ParticalesBackground /> */}
          <Navbar />
          <Home />
          <About />
          <Skills />
          <Projects />
          <Experience />
          {/* <Testimonials /> */}
          <Contact />
          <Footer />
        </div>
      )}
    </>
  );
}
