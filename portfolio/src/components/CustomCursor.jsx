import { useEffect, useState } from "react";

export default function CustomCursor() {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  useEffect(() => {
    const moveHandler = (e) => {
      setPosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener("mousemove", moveHandler);

    return () => window.removeEventListener("mousemove", moveHandler);
  });

  return (
    <div
      className="pointer-events-none fixed top-0 left-0 z-50"
      style={{
        transform: `translate3d(${position.x - 40}px, ${position.y - 40}px, 0)`,
      }}
    >
      <div className="w-20 h-20 rounded-full bg-linear-to-r from-pink-700 blur-2xl opacity-80" />
    </div>
  );
}
