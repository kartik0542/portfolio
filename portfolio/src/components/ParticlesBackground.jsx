import { useEffect, useRef } from "react";

export default function ParticlesBackground() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;    // canvas dom element karega
    const ctx = canvas.getContext("2d"); // 2d context lake dega

    let particles = [];
    const particlesCount = 50;
    const colors = ["rgba(255, 255, 255, 0.7)"];

    class Particle {
      constructor() {
        this.x = Math.random() * canvas.width; // yaha pe kahi se bhi originate hoge
        this.y = Math.random() * canvas.height;
        this.radius = Math.random() * 2 + 1; // jitne bhi paticles create hoge wo 1px se 3px k size hi hoge
        this.color = colors[Math.floor(Math.random() * colors.length)]; // line 12 ko loop karega
        this.speedX = (Math.random() - 0.5) * 0.5; // movement of particles
        this.speedY = (Math.random() - 0.5) * 0.5;
      }
      draw() {
        // dikhata hai
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.shadowBlur = 10;
        ctx.shadowColor = this.color;
        ctx.fillStyle = this.color;
        ctx.fill();
      }

      update() {
        // sochta hai
        this.x += this.speedX;
        this.y += this.speedY;
        if (this.x < 0) this.x = canvas.width; // Ek side se nikla → dusri side se aa gaya
        if (this.x > canvas.width) this.x = 0;
        if (this.y < 0) this.y = canvas.height; //Ek side se nikla → dusri side se aa gaya
        if (this.y > canvas.height) this.y = 0;

        this.draw();
      }
    }

    function createParticles() {
      // Purane particles clear ho rahe hain
      particles = []; // particlesCount (50) baar loop
      for (let i = 0; i < particlesCount; i++) {
        // Screen pe particle banenge
        particles.push(new Particle()); // add honge
      }
    }

    function handleResize() {
      // screen ke height according canvas ki height or width / mob-lap
      canvas.width = window.innerWidth; // width
      canvas.height = window.innerHeight; // height
      createParticles(); // canvas ka resize hone par particle create honge
    }
    handleResize();
    window.addEventListener("resize", handleResize); // User browser resize kare and Canvas + particles auto adjust

    let animationId; // keep track of the animation frame request so it can be properly cancelled during cleanup
    function animate() {
      ctx.clearRect(0, 0, canvas.width, canvas.height); // Clear previous frame
      particles.forEach((p) => p.update()); // Update every particle
      animationId = requestAnimationFrame(animate); // Next frame request
    }
    animate(); // Animation start

    return () => {
      window.removeEventListener("resize", handleResize);
      cancelAnimationFrame(animationId); // stop event
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute top-0 left-0 w-full h-full pointer-events-none z-0"
    ></canvas>
  );
}

// Page Load
//    ↓
// handleResize()
//    ↓
// createParticles()
//    ↓
// animate()
//    ↓
// clear screen
//    ↓
// particle.update()
//    ↓
// requestAnimationFrame
//    ↺ repeat
