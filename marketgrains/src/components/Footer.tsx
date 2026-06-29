import { scrollToSection } from "../utils/scrollTo";

const footerLinks = [
  { label: "Products", sectionId: "products" },
  { label: "Packages", sectionId: "packages" },
  { label: "Distributors", sectionId: "distributors" },
  { label: "Contact", sectionId: "contact" },
];

export default function Footer() {
  return (
    <footer className="bg-gray-950 text-gray-400 py-14">
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mb-10">
          <div>
            <p className="text-2xl font-bold text-white mb-3">
              Elita<span className="text-green-500">07</span>
            </p>
            <p className="text-sm leading-relaxed">
              Organic traditional grains marketplace connecting home buyers with
              quality produce and empowering distributors to build income.
            </p>
          </div>

          <div>
            <h4 className="text-white font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2 text-sm">
              {footerLinks.map((link) => (
                <li key={link.sectionId}>
                  <button
                    type="button"
                    onClick={() => scrollToSection(link.sectionId)}
                    className="hover:text-green-400 transition-colors"
                  >
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-white font-semibold mb-4">Contact</h4>
            <ul className="space-y-2 text-sm">
              <li>Elita07@zw.com</li>
              <li>+263 777826240</li>
              <li>Buhera, Zimbabwe</li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 pt-8 text-sm text-center">
          <p>&copy; {new Date().getFullYear()} Elita07. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
