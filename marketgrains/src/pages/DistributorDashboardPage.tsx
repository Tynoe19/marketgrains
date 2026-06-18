import { Link } from "react-router-dom";
import {
  FiPackage,
  FiTrendingUp,
  FiUsers,
  FiDollarSign,
  FiShoppingBag,
} from "react-icons/fi";
import Navbar from "../components/Navbar";
import { packages } from "../data/packages";
import { useAuth } from "../context/authContext";

const stats = [
  { label: "Total orders", value: "12", icon: FiShoppingBag, color: "text-blue-600 bg-blue-50" },
  { label: "Total profit", value: "$486", icon: FiDollarSign, color: "text-green-600 bg-green-50" },
  { label: "Recruits", value: "3", icon: FiUsers, color: "text-amber-600 bg-amber-50" },
  { label: "Recruit bonus", value: "$45", icon: FiTrendingUp, color: "text-purple-600 bg-purple-50" },
];

export default function DistributorDashboardPage() {
  const { user } = useAuth();

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar variant="solid" />

      <main className="pt-24 pb-16 px-6 max-w-6xl mx-auto">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-10">
          <div>
            <p className="text-sm font-semibold text-amber-600 uppercase tracking-wider mb-1">
              Distributor Portal
            </p>
            <h1 className="text-3xl font-bold text-gray-900">
              Welcome, {user?.username}
            </h1>
            <p className="text-gray-500 mt-1">
              Track orders, profits, and your recruitment network.
            </p>
          </div>
          <Link
            to="/"
            className="inline-flex items-center justify-center px-5 py-2.5 rounded-xl border border-gray-200 bg-white text-gray-700 font-medium hover:border-green-300 transition-colors"
          >
            Back to shop
          </Link>
        </div>

        {/* Stats grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
          {stats.map(({ label, value, icon: Icon, color }) => (
            <div
              key={label}
              className="bg-white rounded-2xl border border-gray-100 p-5 shadow-sm"
            >
              <div className={`w-10 h-10 rounded-lg flex items-center justify-center mb-3 ${color}`}>
                <Icon />
              </div>
              <p className="text-2xl font-bold text-gray-900">{value}</p>
              <p className="text-sm text-gray-500">{label}</p>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Available packages */}
          <section className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
            <div className="flex items-center gap-2 mb-5">
              <FiPackage className="text-green-600" />
              <h2 className="text-lg font-bold text-gray-900">Wholesale Packages</h2>
            </div>
            <ul className="space-y-4">
              {packages.map((pkg) => (
                <li
                  key={pkg.id}
                  className="flex items-center justify-between p-4 rounded-xl bg-gray-50 border border-gray-100"
                >
                  <div>
                    <p className="font-semibold text-gray-900">{pkg.name}</p>
                    <p className="text-sm text-gray-500">
                      Pay ${pkg.orderValue} → Sell ${pkg.salesValue}
                    </p>
                  </div>
                  <span className="font-bold text-green-600">+${pkg.profit}</span>
                </li>
              ))}
            </ul>
          </section>

          {/* Recruitment section */}
          <section className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
            <div className="flex items-center gap-2 mb-5">
              <FiUsers className="text-amber-600" />
              <h2 className="text-lg font-bold text-gray-900">Recruitment Network</h2>
            </div>
            <p className="text-gray-600 text-sm mb-6 leading-relaxed">
              Invite new distributors and earn a bonus when they make their first sale.
            </p>
            <div className="p-4 rounded-xl bg-gray-50 border border-dashed border-gray-200 text-center">
              <p className="text-sm text-gray-600 font-mono">
                marketgrains.com/ref/{user?.id ?? "your-code"}
              </p>
              <button
                type="button"
                className="mt-3 px-4 py-2 rounded-lg bg-amber-600 hover:bg-amber-700 text-white text-sm font-semibold transition-colors"
              >
                Copy referral link
              </button>
            </div>

            <h3 className="font-semibold text-gray-900 mt-6 mb-3">Recent recruits</h3>
            <ul className="space-y-2 text-sm">
              {["Rudo K.", "Farai N.", "Chipo T."].map((name) => (
                <li
                  key={name}
                  className="flex items-center justify-between py-2 border-b border-gray-50 last:border-0"
                >
                  <span className="text-gray-700">{name}</span>
                  <span className="text-green-600 font-medium">Active</span>
                </li>
              ))}
            </ul>
          </section>
        </div>
      </main>
    </div>
  );
}
