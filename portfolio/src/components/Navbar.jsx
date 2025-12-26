import { useEffect, useRef, useState } from "react";
import OverlayMenu from "./OverlayMenu";
import Logo from "../assets/Logo.png";
import { FiMenu } from "react-icons/fi";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [visible, setVisible] = useState(true);
  const [forceVisible, setForceVisible] = useState(false); // to keep navbar visible when home is open

  const lastScrollY = useRef(0);
  const timerId = useRef(null);

  useEffect(() => {
    const homeSection = document.getElementById("home");

    const obeserver = new IntersectionObserver( // ye observer home section ko observe karega
      ([entry]) => {
        if (entry.isIntersecting) {
          setForceVisible(true);
          setVisible(true);
        } else {
          //jab home section se bahar jaye tab close kar dega
          setForceVisible(false);
        }
      },
      { threshold: 0.1 } // jab 50% section viewport me dikhai de tabhi trigger hoga
    );
    if (homeSection) obeserver.observe(homeSection); // observe karna start kar dega

    return () => {
      if (homeSection) obeserver.unobserve(homeSection);
    };
  }, []);

  useEffect(() => {
    const handleScroll = () => {
        if (forceVisible) {                // ye function scroll hone pe call hoga
        setVisible(true); // agar home section me hai to navbar visible rahega
        return;
      }
      const currentScrollY = window.scrollY; // current scroll position le raha hai
      if (currentScrollY < lastScrollY.current) {
        setVisible(false); // scroll up hone pe navbar dikhai dega
      } else {
        setVisible(true); // scroll down hone pe navbar chhup jayega

        if (timerId.current) clearTimeout(timerId.current); // agar timer chal raha hai to use clear kar dega
        timerId.current = setTimeout(() => {
          setVisible(true); // 150ms ke baad navbar dikhai dega
        }, 3000);
      }
      lastScrollY.current = currentScrollY; // last scroll position update kar dega
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", handleScroll);
      if (timerId.current) clearTimeout(timerId.current);
    };
  },[forceVisible]);

  return (
    <>
      <nav
        className={`fixed top-0 left-0 w-full flex items-center justify-between px-6 py-4 z-50 transition-transform duration-300 ${
          visible ? "translate-y-0" : "-translate-y-full"
        }`}
      >
        <div className="flex items-center space-x-2">
          <img src={Logo} alt="logo" className="w-8 h-8" />
          <div className="text-2xl font-bold text-white hidden sm:block">
            Kartik
          </div>
        </div>
        <div className=" block lg:absolute lg:left-1/2 lg:transform lg:-translate-x-1/2">
          <button
            onClick={() => setMenuOpen(true)}
            className="text-white text-3xl focus:outline-none"
            aria-label="Open Menu"
          >
            <FiMenu />
          </button>
        </div>

        <div className="hidden lg:block">
          <a
            href="#contact"
            className="bg-linear-to-r from-pink-500 to-blue-500 text-white px-5 py-2 rounded-full font-medium shadow-lg hover:opacity-90 transition-opacity duration-300"
          >
            Reach Out
          </a>
        </div>
      </nav>
      <OverlayMenu isOpen={menuOpen} onClose={() => setMenuOpen(false)} />
    </>
  );
}
