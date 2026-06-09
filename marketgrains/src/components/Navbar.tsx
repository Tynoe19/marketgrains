import { useCart } from "../context/cartContext";
import { useEffect, useState } from "react";
import { FiMenu, FiX } from "react-icons/fi";
import { scrollToSection } from "../utils/scrollTo";

type NavbarProps = {
  search: string;
  setSearch: (value: string) => void;
};

const navLinks = [
  { label: "Products", sectionId: "products" },
  { label: "Packages", sectionId: "packages" },
  { label: "Distributors", sectionId: "distributors" },
  { label: "Contact", sectionId: "contact" },
];

export default function Navbar({ search, setSearch }: NavbarProps) {
  const { cartCount, openCart } = useCart();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  // Listen for scroll to change navbar background (transparent → solid white)
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleNavClick = (sectionId: string) => {
    scrollToSection(sectionId);
    setMenuOpen(false);
  };

  const linkClass = scrolled
    ? "text-gray-700 hover:text-green-700"
    : "text-white/90 hover:text-white";

  return (
    <nav
      className={`fixed top-0 left-0 z-50 w-full transition-all duration-300 ${
        scrolled ? "bg-white/95 backdrop-blur-md shadow-md text-gray-900" : "bg-transparent text-white"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex items-center justify-between gap-4">
          {/* Logo — clicking it scrolls back to top */}
          <button
            type="button"
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="text-xl md:text-2xl font-bold tracking-tight shrink-0"
          >
            Market<span className="text-green-600">Grains</span>
          </button>

          {/* Desktop navigation */}
          <div className="hidden lg:flex items-center gap-8 font-medium">
            {navLinks.map((link) => (
              <button
                key={link.sectionId}
                type="button"
                onClick={() => handleNavClick(link.sectionId)}
                className={`transition-colors ${linkClass}`}
              >
                {link.label}
              </button>
            ))}
          </div>

          {/* Search, cart, and mobile toggle */}
          <div className="flex items-center gap-3">
            <input
              type="text"
              placeholder="Search grains..."
              className={`hidden sm:block border px-3 py-2 rounded-lg text-sm w-36 md:w-52 transition-all focus:outline-none focus:ring-2 ${
                scrolled
                  ? "border-gray-200 text-gray-900 bg-gray-50 focus:ring-green-500"
                  : "border-white/30 bg-white/15 text-white placeholder:text-white/60 focus:ring-white"
              }`}
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />

            <button
              type="button"
              onClick={openCart}
              className="relative px-4 py-2 rounded-lg bg-green-600 text-white text-sm font-semibold hover:bg-green-700 transition-colors"
            >
              Cart
              {cartCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-amber-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs font-bold">
                  {cartCount}
                </span>
              )}
            </button>

            <button
              type="button"
              onClick={() => handleNavClick("distributors")}
              className="hidden md:block px-4 py-2 rounded-lg border border-green-600 text-green-600 text-sm font-semibold hover:bg-green-600 hover:text-white transition-colors"
            >
              Join as Distributor
            </button>

            <button
              type="button"
              className="lg:hidden text-2xl p-1"
              onClick={() => setMenuOpen(!menuOpen)}
              aria-label="Toggle menu"
            >
              {menuOpen ? <FiX /> : <FiMenu />}
            </button>
          </div>
        </div>

        {/* Mobile dropdown menu */}
        {menuOpen && (
          <div className="lg:hidden mt-4 pb-2 flex flex-col gap-3 border-t border-white/20 pt-4">
            {navLinks.map((link) => (
              <button
                key={link.sectionId}
                type="button"
                onClick={() => handleNavClick(link.sectionId)}
                className={`text-left font-medium py-1 ${linkClass}`}
              >
                {link.label}
              </button>
            ))}
            <button
              type="button"
              onClick={() => handleNavClick("distributors")}
              className="text-left font-semibold text-green-400 py-1"
            >
              Join as Distributor
            </button>
          </div>
        )}
      </div>
    </nav>
  );
}
