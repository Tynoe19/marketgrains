import { packages } from "../data/packages";
import { FiCheck } from "react-icons/fi";

export default function Packages() {
  return (
    <section id="packages" className="py-20 bg-white scroll-mt-20">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-14">
          <p className="text-sm font-semibold text-amber-600 uppercase tracking-wider mb-3">
            For Distributors
          </p>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Wholesale Packages
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Buy in bulk at discounted rates, resell at retail price, and keep the
            profit. Choose a package that fits your business size.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {packages.map((pkg) => (
            <article
              key={pkg.id}
              className={`relative flex flex-col rounded-2xl border p-6 transition-all hover:shadow-xl ${
                pkg.featured
                  ? "border-green-500 shadow-lg shadow-green-100 scale-[1.02] bg-green-50/30"
                  : "border-gray-200 bg-white hover:border-green-200"
              }`}
            >
              {pkg.featured && (
                <span className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 bg-green-600 text-white text-xs font-bold rounded-full uppercase tracking-wide">
                  Most Popular
                </span>
              )}

              <h3 className="text-xl font-bold text-gray-900 mb-2">{pkg.name}</h3>
              <p className="text-gray-500 text-sm mb-6 flex-grow">{pkg.description}</p>

              {/* Pricing breakdown — key info for distributor decision-making */}
              <div className="space-y-3 mb-6 bg-gray-50 rounded-xl p-4">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">You pay (wholesale)</span>
                  <span className="font-semibold text-gray-900">${pkg.orderValue}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">Retail value</span>
                  <span className="font-semibold text-gray-900">${pkg.salesValue}</span>
                </div>
                <div className="flex justify-between text-sm border-t border-gray-200 pt-3">
                  <span className="text-gray-500">Your profit</span>
                  <span className="font-bold text-green-600 text-lg">${pkg.profit}</span>
                </div>
              </div>

              <ul className="space-y-2 mb-6">
                {pkg.products.map((product) => (
                  <li key={product} className="flex items-center gap-2 text-sm text-gray-600">
                    <FiCheck className="text-green-600 shrink-0" />
                    {product}
                  </li>
                ))}
              </ul>

              <button
                type="button"
                className={`w-full py-3 rounded-xl font-semibold transition-colors ${
                  pkg.featured
                    ? "bg-green-600 hover:bg-green-700 text-white"
                    : "bg-gray-900 hover:bg-gray-800 text-white"
                }`}
              >
                View Package
              </button>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
