import { Link, useNavigate } from "react-router-dom";
import { useCart } from "../context/cartContext";
import { useAuth } from "../context/authContext";
import { useEffect, useState } from "react";
import { FiMenu, FiX } from "react-icons/fi";
import {
  useNavigateToHomeSection,
  type HomeSectionId,
} from "../utils/homeNavigation";

type NavbarProps = {
  variant?: "hero" | "solid";
  search?: string;
  setSearch?: (value: string) => void;
};

const navLinks: { label: string; sectionId: HomeSectionId }[] = [
  { label: "Products", sectionId: "products" },
  { label: "Packages", sectionId: "packages" },
  { label: "Distributors", sectionId: "distributors" },
  { label: "Contact", sectionId: "contact" },
];

export default function Navbar({
  variant = "solid",
  search = "",
  setSearch,
}: NavbarProps) {
  const { cartCount, openCart } = useCart();
  const { user, isAuthenticated, logout, hasRole } = useAuth();
  const navigate = useNavigate();
  const goToSection = useNavigateToHomeSection();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  const isHero = variant === "hero";
  const showSolidNav = !isHero || scrolled;

  useEffect(() => {
    if (!isHero) return;

    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isHero]);

  const handleNavClick = (sectionId: HomeSectionId) => {
    goToSection(sectionId);
    setMenuOpen(false);
  };

  const handleLogout = () => {
    logout();
    setMenuOpen(false);
    navigate("/");
  };

  const linkClass = showSolidNav
    ? "text-gray-700 hover:text-green-700"
    : "text-white/90 hover:text-white";

  return (
    <nav
      className={`fixed top-0 left-0 z-50 w-full transition-all duration-300 ${
        showSolidNav
          ? "bg-white/95 backdrop-blur-md shadow-md text-gray-900"
          : "bg-transparent text-white"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex items-center justify-between gap-4">
          <Link
            to="/"
            className="text-xl md:text-2xl font-bold tracking-tight shrink-0"
          >
            Elita<span className="text-green-600">07</span>
          </Link>

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

          <div className="flex items-center gap-3">
            {setSearch && (
              <input
                type="text"
                placeholder="Search grains..."
                className={`hidden sm:block border px-3 py-2 rounded-lg text-sm w-36 md:w-52 transition-all focus:outline-none focus:ring-2 ${
                  showSolidNav
                    ? "border-gray-200 text-gray-900 bg-gray-50 focus:ring-green-500"
                    : "border-white/30 bg-white/15 text-white placeholder:text-white/60 focus:ring-white"
                }`}
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            )}

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

            {isAuthenticated ? (
              <>
                {hasRole("distributor") && (
                  <Link
                    to="/distributor"
                    className={`hidden md:block text-sm font-semibold transition-colors ${linkClass}`}
                  >
                    Dashboard
                  </Link>
                )}
                <span
                  className={`hidden md:block text-sm font-medium truncate max-w-[120px] ${linkClass}`}
                >
                  {user?.username}
                </span>
                <button
                  type="button"
                  onClick={handleLogout}
                  className={`hidden md:block text-sm font-semibold transition-colors ${linkClass}`}
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  className={`hidden md:block text-sm font-semibold transition-colors ${linkClass}`}
                >
                  Login
                </Link>
                <button
                  type="button"
                  onClick={() => navigate("/login")}
                  className={`hidden md:block px-4 py-2 rounded-lg border text-sm font-semibold transition-colors ${
                    showSolidNav
                      ? "border-green-600 text-green-600 hover:bg-green-600 hover:text-white"
                      : "border-white/40 text-white hover:bg-white/10"
                  }`}
                >
                  Join as Distributor
                </button>
              </>
            )}

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

        {menuOpen && (
          <div
            className={`lg:hidden mt-4 pb-2 flex flex-col gap-3 border-t pt-4 ${
              showSolidNav ? "border-gray-200" : "border-white/20"
            }`}
          >
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

            {isAuthenticated ? (
              <>
                {hasRole("distributor") && (
                  <Link
                    to="/distributor"
                    onClick={() => setMenuOpen(false)}
                    className={`text-left font-medium py-1 ${linkClass}`}
                  >
                    Dashboard
                  </Link>
                )}
                <span className={`text-left font-medium py-1 ${linkClass}`}>
                  {user?.username}
                </span>
                <button
                  type="button"
                  onClick={handleLogout}
                  className={`text-left font-semibold py-1 ${linkClass}`}
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  onClick={() => setMenuOpen(false)}
                  className={`text-left font-medium py-1 ${linkClass}`}
                >
                  Login
                </Link>
                <button
                  type="button"
                  onClick={() => {
                    navigate("/login");
                    setMenuOpen(false);
                  }}
                  className={`text-left font-semibold py-1 ${
                    showSolidNav ? "text-green-600" : "text-green-400"
                  }`}
                >
                  Join as Distributor
                </button>
              </>
            )}
          </div>
        )}
      </div>
    </nav>
  );
}
