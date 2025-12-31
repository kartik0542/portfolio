import { FaJava, FaReact } from "react-icons/fa";
import { SiNextdotjs, SiTypescript, SiTailwindcss, SiFastapi, SiPython, SiDocker, SiMongodb, SiAngular} from "react-icons/si";
import { DiNodejsSmall } from "react-icons/di";
import { motion, useMotionValue } from "framer-motion";
import { useEffect, useRef, useState } from "react";

export default function Skills() {
  const skills = [
    { icon: <FaJava />, name: "Java" },
    { icon: <FaReact />, name: "React" },
    { icon: <SiNextdotjs />, name: "Next.js" },
    { icon: <SiTypescript />, name: "TypeScript" },
    { icon: <SiTailwindcss />, name: "Tailwind CSS" },
    { icon: <SiFastapi />, name: "FastAPI" },
    { icon: <SiPython />, name: "Python" },
    { icon: <SiDocker />, name: "Docker" },
    { icon: <DiNodejsSmall />, name: "Node.js" },
    { icon: <SiMongodb />, name: "MongoDB" },
    { icon: <SiAngular />, name: "Angular" },
  ];

  const repeated = [...skills, ...skills]; // repeat ke liye

  const [dir, setDir] = useState(-1); // -1 : icon right se left
  const [active, setActive] = useState(false); // skill ka section visible hai ya nahi agar hai to true warna false
  const sectionRef = useRef(null); // pure section ke liye - ye attach hogi main section ke sath [line-92]
  const trackRef = useRef(null); // icons move section ke liye - ye attach hogi Icon vale div  ke sath [line-131]
  const touchY = useRef(null); // mobile display ke liye touch
  const x = useMotionValue(0); // horizontal translation batata hai ki konsi position pe he 

  useEffect(() => {
    // skill vala sec screen pe visible hai ya nahi
    const el = sectionRef.current;         // actual dom element ka reference lake dega
    if (!el) return;                       // jo present nahi hai to return  

    const io = new IntersectionObserver(   // IntersectionObserver is web API jo batati he ki koi bhi section hamare view port pe kitna visible hai
      ([entry]) => {                       // basically ye API hame entries ka array deta hai lekin hame use destructuring karke hame entry ka sirf 1st element hi chahiye 
        setActive(entry.isIntersecting && entry.intersectionRatio > 0.1); // entry.isIntersecting is a boolean hai jo check karta hai ki hamara skill section screen pe visible hai ya nahi agar hai to true deta hai && wo agar 10%[0.1] se jyada hai to hamara obeserver stat hoga
      },
      { threshold: [0.1] }                 // skill part 10% se jyada hoga to trigger hoga
    );
    io.observe(el);                        // start obeserve
    return () => io.disconnect();          // clean up fun unmount hone pe disconnect
  }, []);                                  

  useEffect(() => {
    // pehle touch ko dettect karenge and usse ham define karenge ki hamare skill kis direction me move karenge
    if (!active) return;                   // screen active nahi to return kuch karna hi nahi

    const onWheel = (e) => setDir(e.deltaY > 0 ? -1 : 1);                //laptop : e.deltaY Y ki progress batata hai - uski value 0 se badi ho to icon R to L and 0 se kam ho to L to R
    const onTouchStart = (e) => (touchY.current = e.touches[0].clientY); //Mobile : 1st touch store on Y
    const onTouchMove = (e) => {                                         
      if (touchY.current == null) return;                                //agar galti se line-52 line-51 se pehle run hui to return ho jayenge
      const delta = e.touches[0].clientY - touchY.current;               // y exis pe progress batata hai
      setDir(delta > 0 ? 1 : -1);                                        // 0 se jyada hoga to L to R and kam hogi to R to L
      touchY.current = e.touches[0].clientY;                             // last position = update 1st position
    };
    window.addEventListener("wheel", onWheel, { passive: true });
    window.addEventListener("touchstart", onTouchStart, { passive: true });
    window.addEventListener("touchmove", onTouchMove, { passive: true });

    return () => {
      window.removeEventListener("wheel", onWheel);
      window.removeEventListener("touchstart", onTouchStart);
      window.removeEventListener("touchmove", onTouchMove);
    };
  }, [active]);

  useEffect(() => {
    // isse icon move hona start karenge
    let id;
    let last = performance.now();            // hamara animation frame by frame chal raha hai isme ham current vale se pichla vala store karta hai
    const SPEED = 80;                        // icon speed
    const tick = (now) => {                  // now hamara current frame batata hai 
      const dt = (now - last) / 1000;        // distance find and second me counting ke liye 1000 se devide kiya
      last = now;                            // ab now vala last hoga
      let next = x.get() + SPEED * dir * dt; // dir mean direction and distance = speed*dt 
      const loop = trackRef.current?.scrollWidth / 2 || 0;
      if (loop) {                            
        if (next <= -loop) next += loop;      // agar hamara icon jyada left jake khatam ho gaye tab wapas se right side se start honge
        if (next >= 0) next -= loop;          // agar hamara icon jyada right jake khatam ho gaye tab wapas se left side se start honge
      }
      x.set(next);                            // 
      id = requestAnimationFrame(tick);
    };
    id = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(id);
  }, [dir, x]);

  return (
    <section
      id="skills"
      ref={sectionRef}
      className="h-1/2 w-full pb-8 flex flex-col items-center relative bg-black text-white overflow-hidden"
    >
      
      {/* Glows */}
      <div className="absolute inset-0 pointer-events-none">
        <div
          className="absolute top-1/4 left-0 w-75 h-75 rounded-full bg-linear-to-r from-[#302b63] via-[#00bf8f] to-[#1cd8d2]
        opacity-20 blur-[120px] animate-pulse
        "
        />
        <div
          className="absolute bottom-1/4 right-0 w-75 h-75 rounded-full bg-linear-to-r from-[#302b63] via-[#00bf8f] to-[#1cd8d2]
        opacity-20 blur-[120px] animate-pulse delay-500
        "
        />
      </div>

      {/* My Skills */}
      <motion.h2
        className=" text-4xl mt-5 sm:text-5xl font-bold bg-clip-text text-transparent bg-linear-to-r from-[#1cd8d2] via-[#00bf8f] to-[#302b63] z-10"
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.1 }}
      >
        My Skills
      </motion.h2>
      <motion.p
        className="mt-2 mb-8 text-white/90 text-base sm:text-lg z-10"
        initial={{ opacity: 0, y: -10 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
      >
        Modern Applications | Modern Technologies
      </motion.p>

      {/* Icons */}
      <div className="relative w-full overflow-hidden">
        <motion.div
          ref={trackRef}
          className="flex gap-10 text-6xl text-[#1cd8d2]"
          style={{ x, whiteSpace: "nowrap", willChange: "transform" }} // willchange means har animation pe transform property lagayenge
        >
          {repeated.map((s, i) => (
            <div
              key={i}
              className="flex flex-col items-center gap-2 min-w-30"
              aria-label={s.name}
              title={s.name}
            >
              <span className="hover:scale-125 transition-transform duration-300">
                {s.icon}
              </span>
              <p className="text-sm mt-2">{s.name}</p>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
