import mapfunde from "../assets/images/mapfunde.jpg";
import { scrollToSection } from "../utils/scrollTo";

export default function Hero() {
  return (
    <section id="home" className="relative min-h-screen flex items-center bg-neutral-900">
      <HeroBackground />

      <div className="relative z-10 w-full pt-24 pb-16">
        <div className="max-w-6xl mx-auto px-6 md:px-8">
          <HeroBadge />
          <HeroTitle />
          <HeroText />
          <HeroButtons />
          <HeroStats />
        </div>
      </div>
    </section>
  );
}

function HeroBackground() {
  return (
    <div className="absolute inset-0">
      <img
        src={mapfunde}
        alt="Traditional organic grains"
        className="w-full h-full object-cover"
      />
      {/* Dark overlay so white text stays readable on any photo */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/60 to-black/40" />
    </div>
  );
}

function HeroBadge() {
  return (
    <span className="inline-block mb-6 px-4 py-1.5 rounded-full bg-green-600/20 border border-green-500/40 text-green-300 text-sm font-medium">
      100% Organic · Farm to Table
    </span>
  );
}

function HeroTitle() {
  return (
    <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold leading-tight text-white mb-6 max-w-4xl">
      Traditional Grains for{" "}
      <span className="text-green-400">Homes</span> &{" "}
      <span className="text-amber-400">Distributors</span>
    </h1>
  );
}

function HeroText() {
  return (
    <p className="text-lg md:text-xl text-gray-300 leading-relaxed mb-8 max-w-2xl">
      Buy individual grains for your kitchen, or register as a distributor to
      unlock wholesale packages, earn profit margins, and get bonuses for
      recruiting new partners.
    </p>
  );
}

function HeroButtons() {
  return (
    <div className="flex flex-col sm:flex-row gap-4 mb-14">
      <button
        type="button"
        onClick={() => scrollToSection("products")}
        className="bg-green-600 hover:bg-green-700 text-white font-semibold py-3.5 px-8 rounded-full transition-colors shadow-lg shadow-green-900/30"
      >
        Shop Grains
      </button>
      <button
        type="button"
        onClick={() => scrollToSection("packages")}
        className="border-2 border-white/30 hover:bg-white/10 text-white font-semibold py-3.5 px-8 rounded-full transition-colors"
      >
        View Distributor Packages
      </button>
    </div>
  );
}

function HeroStats() {
  const stats = [
    { value: "5+", label: "Grain varieties" },
    { value: "3", label: "Wholesale packages" },
    { value: "30%", label: "Avg. distributor margin" },
  ];

  return (
    <div className="grid grid-cols-3 gap-4 max-w-xl">
      {stats.map((stat) => (
        <div
          key={stat.label}
          className="text-center sm:text-left bg-white/10 backdrop-blur-sm rounded-xl px-4 py-4 border border-white/10"
        >
          <p className="text-2xl md:text-3xl font-bold text-white">{stat.value}</p>
          <p className="text-xs sm:text-sm text-gray-400 mt-1">{stat.label}</p>
        </div>
      ))}
    </div>
  );
}
