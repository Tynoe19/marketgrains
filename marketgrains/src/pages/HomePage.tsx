import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Hero from "../components/hero";
import Categories from "../components/categories";
import Products from "../components/products";
import Packages from "../components/packages";
import WhyDistributor from "../components/WhyDistributor";
import Testimonials from "../components/Testimonials";
import Newsletter from "../components/Newsletter";
import Footer from "../components/Footer";
import { scrollToSection } from "../utils/scrollTo";

export default function HomePage() {
  const [search, setSearch] = useState("");
  const [selected, setSelected] = useState<string | null>(null);
  const location = useLocation();
  const navigate = useNavigate();

  // If another page sent us here with { scrollTo: "products" }, scroll after render
  useEffect(() => {
    const scrollTo = (location.state as { scrollTo?: string } | null)?.scrollTo;
    if (!scrollTo) return;

    requestAnimationFrame(() => scrollToSection(scrollTo));
    navigate(location.pathname, { replace: true, state: null });
  }, [location, navigate]);

  return (
    <>
      <Navbar variant="hero" search={search} setSearch={setSearch} />
      <Hero />
      <Categories selected={selected} setSelected={setSelected} />
      <Products selected={selected} search={search} />
      <Packages />
      <WhyDistributor />
      <Testimonials />
      <Newsletter />
      <Footer />
    </>
  );
}
