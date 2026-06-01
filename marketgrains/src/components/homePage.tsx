import { useState } from "react";
import Navbar from "./Navbar";
import Hero from "./hero";
import Categories from "./categories";
import Products from "./products";
import Packages from "./packages";
import WhyDistributor from "./WhyDistributor";
import Testimonials from "./Testimonials";
import Newsletter from "./Newsletter";
import Footer from "./Footer";

export default function HomePage() {
  const [search, setSearch] = useState<string>("");

  return (
    <>
      <Navbar search={search} setSearch={setSearch} />
      <Hero />
      <Categories selected={null} setSelected={() => {}} />
      <Products selected={null} search={search} />
      <Packages />
      <WhyDistributor />
      <Testimonials />
      <Newsletter />
      <Footer />
    </>
  );
}   