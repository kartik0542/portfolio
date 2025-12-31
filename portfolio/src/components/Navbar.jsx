import { useEffect, useRef, useState } from "react";
import OverlayMenu from "./OverlayMenu";
import Logo from "../assets/Logo.png";
import { FiMenu } from "react-icons/fi";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false); // menu ko pehle se hi close rakha hai(false)
  const [visible, setVisible] = useState(true);
  const [forceVisible, setForceVisible] = useState(false); // to keep navbar visible when home is open

  const lastScrollY = useRef(0); // jab lastscroll hoga wo save hoga
  const timerId = useRef(null); // timer for auto hide

  useEffect(() => {
    const homeSection = document.getElementById("home"); // dom home section ko find karega

    const obeserver = new IntersectionObserver( // ye observer home section ko observe karega(new IntersectionObserver is a brower API)
      ([entry]) => {
        if (entry.isIntersecting) {
          setForceVisible(true); // jab home section visible hoga
          setVisible(true); // tab navbar ko force karenge ki visible(true) ho
        } else {
          //jab home section se bahar jaye tab close(false) kar dega
          setForceVisible(false);
        }
      },
      { threshold: 0.1 } // jab hamara 10% home section visible hoga tab tak navbar rahega
    );
    if (homeSection) obeserver.observe(homeSection); // observe karna start kar dega

    return () => {
      // clean up: jab home section unmount hoga tab ye observer stop ho jayega
      if (homeSection) obeserver.unobserve(homeSection);
    };
  }, []);

  useEffect(() => {
    // after home section navbar position
    const handleScroll = () => {
      if (forceVisible) {
        // ye function scroll hone pe call hoga
        setVisible(true); // agar home section me hai to navbar visible rahega
        return;
      }
      const currentScrollY = window.scrollY; // current scroll position le raha hai
      if (currentScrollY > lastScrollY.current) {
        // Matlab user neeche scroll kar raha hai, Top pe ho → 0 Neeche jaoge → number badhta jayega
        setVisible(false); // Navbar hide

        // agar koi timer chal raha ho to clear
        if (timerId.current) clearTimeout(timerId.current);
      }

      // SCROLL UP → navbar show for 3 seconds
      else if (currentScrollY < lastScrollY.current) {
        // User upar scroll kar raha hai
        setVisible(true); // Navbar turant dikhao

        if (timerId.current) clearTimeout(timerId.current); // Purana timer ho to clear

        timerId.current = setTimeout(() => {
          // Naya timer lagao
          setVisible(false); // 3 sec baad hide
        }, 3000);
      }
      lastScrollY.current = currentScrollY; // last scroll position ko Current scroll position me save karta hai
    };
    window.addEventListener("scroll", handleScroll, { passive: true }); //{ passive: true } ka matlab: browser ko batate hai ki handleScroll scroll ko block nahi karega, performance ke liye recommended.
    return () => {
      window.removeEventListener("scroll", handleScroll); // Jo kaam start karte ho (event listener, timer, interval), Usko band karna zaruri hota hai Isi ko cleanup kehte hain, Jo humne pehle lagaya tha:[line 65] Usko remove kar rahe hain
      if (timerId.current) clearTimeout(timerId.current);
    };
  }, [forceVisible]); // forceVisible state track kar raha hai ki home section visible hai ya nahi.

  return (
    <>
      <nav
        className={`fixed top-0 left-0 w-full flex items-center justify-between px-6 py-4 z-50 transition-transform duration-300 ${
          visible ? "translate-y-0" : "-translate-y-full" // ? home screen visible hogi to rahega : warna upar chala jayega
        }`}
      >
        {/* kartik */}
        <div className="flex items-center space-x-2">
          <img src={Logo} alt="logo" className="w-8 h-8" />
          <div className="text-2xl font-bold text-white hidden sm:block">
            Kartik
          </div>
        </div>

        {/* Mid Button */}
        <div className="block lg:absolute lg:left-1/2 lg:transform lg:-translate-x-1/2">
          {/* logo lg screen me 1/2-center or mobile pe (-translate-x-1/2) right corner pe  */}
          <button
            onClick={() => setMenuOpen(true)}
            className="text-white text-3xl focus:outline-none"
            aria-label="Open Menu"
          >
            <FiMenu />
          </button>
        </div>

        {/* Reach Out */}
        <div className="hidden lg:block">
          <a
            href="#contact"
            className="bg-linear-to-r from-pink-500 to-blue-500 text-white px-5 py-2 rounded-full font-medium shadow-lg hover:opacity-90 transition-opacity duration-300"
          >
            Reach Out
          </a>
        </div>
      </nav>
      <OverlayMenu nu isOpen={menuOpen} onClose={() => setMenuOpen(false)} />
      {/* User clicks the hamburger menu → setMenuOpen(true) → menuOpen = true.
      OverlayMenu receives isOpen={true} → it shows itself. User clicks close
      inside the overlay → onClose() is called → setMenuOpen(false) → menuOpen =
      false. OverlayMenu receives isOpen={false} → it hides itself. */}
    </>
  );
}
