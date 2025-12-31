import { useEffect, useState } from "react";

export default function CustomCursor() {
  const [position, setPosition] = useState({ x: 0, y: 0 }); // ui change use useEffect
  useEffect(() => {
    // fun for jaha mouse move hoga waha glow bhi jayega
    const moveHandler = (e) => {
      setPosition({ x: e.clientX, y: e.clientY }); // logic
    };

    window.addEventListener("mousemove", moveHandler); // jab jab hamara mouse move karega tab ye eventlistenrt is moveHandler fun ko call karega

    return () => window.removeEventListener("mousemove", moveHandler); // clean up fun: jab cursur unmount hoga tab ye stop ho jayega
  });

  return (
    <div
      className="pointer-events-none fixed top-0 left-0 z-50"
      style={{
        transform: `translate3d(${position.x - 40}px, ${position.y - 40}px, 0)`, // `` ye tabhi use hoti hai jab hame css+js ek hi line use karni ho
      }}
    >
      <div className="w-20 h-20 rounded-full bg-linear-to-r from-pink-700 blur-2xl opacity-80" />
    </div>
  );
}
