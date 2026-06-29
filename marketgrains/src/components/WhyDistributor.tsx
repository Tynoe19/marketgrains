import { FiShoppingBag, FiUsers, FiTrendingUp, FiGift } from "react-icons/fi";
import { scrollToSection } from "../utils/scrollTo";

const buyerFeatures = [
  "Buy individual grains at retail price",
  "Fast delivery to your doorstep",
  "No registration required to shop",
];

const distributorFeatures = [
  "Wholesale pricing on combo packages",
  "Earn profit on every resale",
  "Recruitment bonuses for new partners",
  "Dedicated distributor dashboard (coming soon)",
];

const benefits = [
  {
    icon: FiShoppingBag,
    title: "Two ways to buy",
    description:
      "Retail customers shop individual products. Distributors unlock bulk packages at lower cost.",
  },
  {
    icon: FiTrendingUp,
    title: "Built-in margins",
    description:
      "Each package shows exactly what you pay, what you sell for, and your profit.",
  },
  {
    icon: FiUsers,
    title: "Grow your network",
    description:
      "Recruit other distributors and earn bonuses when they join and sell.",
  },
  {
    icon: FiGift,
    title: "Quality products",
    description:
      "Organic traditional grains sourced from trusted farms — a product people already want.",
  },
];

export default function WhyDistributor() {
  return (
    <section id="distributors" className="py-20 bg-gray-900 text-white scroll-mt-20">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-14">
          <p className="text-sm font-semibold text-green-400 uppercase tracking-wider mb-3">
            Why join Elita07?
          </p>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            A marketplace built for buyers &amp; distributors
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Whether you&apos;re stocking your pantry or building a grain business,
            Elita07 has a path for you.
          </p>
        </div>

        {/* Side-by-side comparison of the two user types */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-16">
          <div className="rounded-2xl border border-gray-700 bg-gray-800/50 p-6">
            <span className="inline-block px-3 py-1 rounded-full bg-blue-500/20 text-blue-300 text-xs font-semibold mb-4">
              Buyer
            </span>
            <h3 className="text-xl font-bold mb-4">Shop for your home</h3>
            <ul className="space-y-3">
              {buyerFeatures.map((feature) => (
                <li key={feature} className="flex items-start gap-2 text-gray-300 text-sm">
                  <span className="text-green-400 mt-0.5">✓</span>
                  {feature}
                </li>
              ))}
            </ul>
          </div>

          <div className="rounded-2xl border border-green-600/50 bg-green-900/20 p-6">
            <span className="inline-block px-3 py-1 rounded-full bg-green-500/20 text-green-300 text-xs font-semibold mb-4">
              Distributor
            </span>
            <h3 className="text-xl font-bold mb-4">Build your business</h3>
            <ul className="space-y-3">
              {distributorFeatures.map((feature) => (
                <li key={feature} className="flex items-start gap-2 text-gray-300 text-sm">
                  <span className="text-green-400 mt-0.5">✓</span>
                  {feature}
                </li>
              ))}
            </ul>
            <button
              type="button"
              onClick={() => scrollToSection("packages")}
              className="mt-6 w-full py-3 rounded-xl bg-green-600 hover:bg-green-700 font-semibold transition-colors"
            >
              See Packages
            </button>
          </div>
        </div>

        {/* Feature grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {benefits.map(({ icon: Icon, title, description }) => (
            <div
              key={title}
              className="rounded-xl border border-gray-700 bg-gray-800/30 p-5 hover:border-green-600/40 transition-colors"
            >
              <div className="w-10 h-10 rounded-lg bg-green-600/20 flex items-center justify-center mb-4">
                <Icon className="text-green-400 text-lg" />
              </div>
              <h4 className="font-bold mb-2">{title}</h4>
              <p className="text-gray-400 text-sm leading-relaxed">{description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
